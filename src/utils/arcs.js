import * as d3 from 'd3';
import { getISO } from '../data/isoNames';

// Rank-weight thicknesses in pixels for rank positions 1-5
const RANK_WIDTHS = [3.5, 2.5, 1.8, 1.3, 0.9];

/**
 * Build a map of ISO code → [cx, cy] pixel centroid for all features.
 * Call once after topology is loaded.
 */
export function buildCentroidMap(features, path, idToName) {
  const map = {};
  for (const f of features) {
    const name = idToName[+f.id] || '';
    const iso  = getISO(name);
    if (!iso) continue;
    try {
      const c = path.centroid(f);
      if (c && !isNaN(c[0]) && !isNaN(c[1])) map[iso] = c;
    } catch (_) { /* skip */ }
  }
  return map;
}

/**
 * Draw great-circle arcs from selectedISO to its top trading partners.
 * Exports arcs are green, imports arcs are blue.
 * Removes any previous arcs before drawing.
 */
export function drawArcs(g, centroidMap, selectedISO, yearData, nameToISO) {
  g.selectAll('.trade-arc').remove();
  if (!selectedISO || !centroidMap[selectedISO] || !yearData?.[selectedISO]) return;

  const d    = yearData[selectedISO];
  const src  = centroidMap[selectedISO];

  function renderList(partnerNames, color, dashPattern) {
    partnerNames.slice(0, 5).forEach((name, i) => {
      const iso = nameToISO[name] || null;
      if (!iso || !centroidMap[iso]) return;
      const dst = centroidMap[iso];

      // Use a simple quadratic bezier in screen space (avoids projection issues)
      const mx = (src[0] + dst[0]) / 2;
      const my = (src[1] + dst[1]) / 2 - Math.hypot(dst[0] - src[0], dst[1] - src[1]) * 0.25;

      g.append('path')
        .attr('class', 'trade-arc')
        .attr('d', `M${src[0]},${src[1]} Q${mx},${my} ${dst[0]},${dst[1]}`)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', RANK_WIDTHS[i])
        .attr('stroke-opacity', 0.75)
        .attr('stroke-dasharray', dashPattern)
        .attr('pointer-events', 'none');
    });
  }

  // Import arcs: dashed blue (things coming in)
  renderList(d.partners.imports, '#58a6ff', '4,3');
  // Export arcs: solid green (things going out)
  renderList(d.partners.exports, '#3fb950', null);
}
