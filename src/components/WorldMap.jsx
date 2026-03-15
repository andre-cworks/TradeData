import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { tradeData } from '../data/tradeData';
import { getISO, getIdToName } from '../data/isoNames';
import { buildColorScale, metricValue, fmt } from '../utils/colorScale';

const METRIC_LABELS = { total: 'Total Trade', exports: 'Exports', imports: 'Imports', balance: 'Trade Balance' };
const TOPO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

export default function WorldMap({ year, metric, selectedISO, onSelectCountry }) {
  const containerRef = useRef(null);
  const svgRef       = useRef(null);
  const gRef         = useRef(null);
  const zoomRef      = useRef(null);
  const projRef      = useRef(null);
  const pathRef      = useRef(null);
  const topoRef      = useRef(null);   // { countries, borders, idToName }
  const colorScaleRef = useRef(null);
  const canvasRef    = useRef(null);

  // Keep prop refs fresh for D3 event handlers
  const yearRef   = useRef(year);
  const metricRef = useRef(metric);
  const onSelectRef = useRef(onSelectCountry);
  useEffect(() => { yearRef.current = year; },           [year]);
  useEffect(() => { metricRef.current = metric; },       [metric]);
  useEffect(() => { onSelectRef.current = onSelectCountry; }, [onSelectCountry]);

  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, html: '' });
  const [legendInfo, setLegendInfo] = useState(null); // { lo, hi, metric }

  // ── Paint legend canvas whenever legendInfo changes ──────────────────────────
  useEffect(() => {
    if (!legendInfo || !canvasRef.current || !colorScaleRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const w = canvas.width = 160;
    const h = canvas.height = 10;
    const scale = colorScaleRef.current;
    const [dlo, dhi] = [scale.domain()[0], scale.domain()[scale.domain().length - 1]];
    for (let i = 0; i < w; i++) {
      ctx.fillStyle = scale(dlo + (dhi - dlo) * i / w);
      ctx.fillRect(i, 0, 1, h);
    }
  }, [legendInfo]);

  // ── Sync selectedISO class to SVG ───────────────────────────────────────────
  useEffect(() => {
    if (!gRef.current) return;
    gRef.current.selectAll('.country').classed('selected', function () {
      return d3.select(this).attr('data-iso') === selectedISO;
    });
  }, [selectedISO]);

  // ── Update map colors when year or metric changes ────────────────────────────
  useEffect(() => {
    if (!gRef.current || !topoRef.current) return;
    updateColors(year, metric);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, metric]);

  // ── Mount: set up D3, fetch topology ────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    const svg = d3.select(svgRef.current);

    const g = svg.append('g');
    gRef.current = g;

    const zoom = d3.zoom()
      .scaleExtent([0.8, 12])
      .on('zoom', ({ transform }) => g.attr('transform', transform));
    zoomRef.current = zoom;
    svg.call(zoom);

    function resize() {
      const { clientWidth: w, clientHeight: h } = container;
      svg.attr('viewBox', `0 0 ${w} ${h}`);
      projRef.current = d3.geoNaturalEarth1().scale(w / 6.28).translate([w / 2, h / 2]);
      pathRef.current = d3.geoPath().projection(projRef.current);
    }

    resize();

    function onResize() {
      resize();
      if (topoRef.current) drawMap();
    }
    window.addEventListener('resize', onResize);

    fetch(TOPO_URL)
      .then(r => r.json())
      .then(world => {
        const countries = topojson.feature(world, world.objects.countries);
        const borders   = topojson.mesh(world, world.objects.countries, (a, b) => a !== b);
        const idToName  = getIdToName();
        topoRef.current = { countries, borders, idToName };
        drawMap();
      });

    return () => {
      window.removeEventListener('resize', onResize);
      svg.selectAll('*').remove();
      gRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Helpers ──────────────────────────────────────────────────────────────────
  function updateColors(yr, met) {
    if (!gRef.current || !topoRef.current) return;
    const data  = tradeData[yr];
    const scale = buildColorScale(met, data);
    colorScaleRef.current = scale;
    const dom = scale.domain();
    setLegendInfo({ lo: dom[0], hi: dom[dom.length - 1], metric: met });

    gRef.current.selectAll('.country').attr('fill', function () {
      const iso = d3.select(this).attr('data-iso');
      const val = metricValue(data[iso], met);
      return val !== null ? scale(val) : '#2d333b';
    });
  }

  function drawMap() {
    if (!gRef.current || !topoRef.current || !projRef.current) return;
    const { countries, borders, idToName } = topoRef.current;
    const g    = gRef.current;
    const path = pathRef.current;

    g.selectAll('*').remove();

    g.append('path').datum({ type: 'Sphere' })
      .attr('class', 'sphere').attr('d', path);

    g.append('path').datum(d3.geoGraticule()())
      .attr('class', 'graticule').attr('d', path);

    const yr  = yearRef.current;
    const met = metricRef.current;
    const data  = tradeData[yr];
    const scale = buildColorScale(met, data);
    colorScaleRef.current = scale;
    const dom = scale.domain();
    setLegendInfo({ lo: dom[0], hi: dom[dom.length - 1], metric: met });

    g.selectAll('.country')
      .data(countries.features)
      .join('path')
      .attr('class', 'country')
      .attr('d', path)
      .attr('data-iso', d => getISO(idToName[+d.id] || '') || '')
      .attr('fill', d => {
        const iso = getISO(idToName[+d.id] || '');
        const val = iso ? metricValue(data[iso], met) : null;
        return val !== null ? scale(val) : '#2d333b';
      })
      .classed('selected', d => getISO(idToName[+d.id] || '') === selectedISO)
      .on('mousemove', function (event, d) {
        const name  = idToName[+d.id] || 'Unknown';
        const iso   = getISO(name);
        const cdata = iso ? tradeData[yearRef.current]?.[iso] : null;
        const met2  = metricRef.current;
        const val   = cdata ? metricValue(cdata, met2) : null;

        let html = `<strong>${name}</strong>`;
        if (cdata) {
          html += `<div class="tip-row"><span class="tip-label">${METRIC_LABELS[met2]}</span><span class="tip-val">$${fmt(val)}</span></div>`;
          html += `<div class="tip-row"><span class="tip-label">Exports</span><span class="tip-val">$${fmt(cdata.exports)}</span></div>`;
          html += `<div class="tip-row"><span class="tip-label">Imports</span><span class="tip-val">$${fmt(cdata.imports)}</span></div>`;
        } else {
          html += `<div style="color:#8b949e;margin-top:4px">No data available</div>`;
        }

        const rect = containerRef.current.getBoundingClientRect();
        let tx = event.clientX - rect.left + 14;
        let ty = event.clientY - rect.top  - 10;
        if (tx + 230 > rect.width)  tx = event.clientX - rect.left - 230;
        if (ty + 120 > rect.height) ty = event.clientY - rect.top  - 120;

        setTooltip({ visible: true, x: tx, y: ty, html });
      })
      .on('mouseleave', () => setTooltip(t => ({ ...t, visible: false })))
      .on('click', function (event, d) {
        const name = idToName[+d.id] || '';
        const iso  = getISO(name);
        if (!iso) return;
        onSelectRef.current(iso);
      });

    g.append('path')
      .datum(borders)
      .attr('fill', 'none')
      .attr('stroke', '#1c2128')
      .attr('stroke-width', '0.5px')
      .attr('d', path);
  }

  // ── Zoom button handlers ─────────────────────────────────────────────────────
  function zoomIn()    { d3.select(svgRef.current).transition().call(zoomRef.current.scaleBy, 1.5); }
  function zoomOut()   { d3.select(svgRef.current).transition().call(zoomRef.current.scaleBy, 0.67); }
  function zoomReset() { d3.select(svgRef.current).transition().call(zoomRef.current.transform, d3.zoomIdentity); }

  return (
    <div ref={containerRef} className="map-container">
      <svg ref={svgRef} />

      <div className="zoom-controls">
        <button className="zoom-btn" onClick={zoomIn}  title="Zoom in">+</button>
        <button className="zoom-btn" onClick={zoomOut} title="Zoom out">−</button>
        <button className="zoom-btn" onClick={zoomReset} title="Reset" style={{ fontSize: '0.65rem' }}>⌂</button>
      </div>

      {legendInfo && (
        <div className="legend">
          <h4>{METRIC_LABELS[legendInfo.metric]} (USD)</h4>
          <canvas ref={canvasRef} className="legend-gradient" />
          <div className="legend-ticks">
            <span>{fmt(legendInfo.lo)}</span>
            <span>{fmt((legendInfo.lo + legendInfo.hi) / 2)}</span>
            <span>{fmt(legendInfo.hi)}</span>
          </div>
        </div>
      )}

      {tooltip.visible && (
        <div
          className="tooltip"
          style={{ left: tooltip.x, top: tooltip.y, opacity: 1 }}
          dangerouslySetInnerHTML={{ __html: tooltip.html }}
        />
      )}
    </div>
  );
}
