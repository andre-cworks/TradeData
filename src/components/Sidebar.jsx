import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { isoNames } from '../data/isoNames';
import { goodsData } from '../data/goodsData';
import { tradeData } from '../data/tradeData';
import { fmt, yoyChange, sectorConcentration, mutualLeverage } from '../utils/colorScale';

// All years sorted ascending for sparklines
const ALL_YEARS = Object.keys(tradeData).map(Number).sort().map(String);

// ── Sub-components ────────────────────────────────────────────────────────────

function YoYBadge({ pct }) {
  if (pct === null) return null;
  const up = pct >= 0;
  return (
    <span className={`yoy-badge ${up ? 'yoy-up' : 'yoy-down'}`}>
      {up ? '▲' : '▼'} {Math.abs(pct).toFixed(1)}%
    </span>
  );
}

function Sparkline({ iso, metric, upToYear }) {
  const svgRef = useRef(null);
  useEffect(() => {
    if (!svgRef.current) return;
    const years = ALL_YEARS.filter(y => Number(y) <= Number(upToYear));
    const vals  = years.map(y => {
      const d = tradeData[y]?.[iso];
      if (!d) return null;
      if (metric === 'exports') return d.exports;
      if (metric === 'imports') return d.imports;
      return d.exports - d.imports;
    }).filter(v => v !== null);

    if (vals.length < 2) return;
    const W = 70, H = 24;
    const x = d3.scaleLinear([0, vals.length - 1], [2, W - 2]);
    const y = d3.scaleLinear(d3.extent(vals), [H - 2, 2]);
    const line = d3.line((_, i) => x(i), v => y(v));
    const color = metric === 'exports' ? '#3fb950' : metric === 'imports' ? '#58a6ff' : (vals[vals.length-1] >= 0 ? '#3fb950' : '#f85149');

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    svg.attr('width', W).attr('height', H);
    svg.append('path')
      .datum(vals)
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round');
  }, [iso, metric, upToYear]);

  return <svg ref={svgRef} className="sparkline" />;
}

function PartnerBars({ list, color }) {
  return list.map((name, i) => {
    const pct = Math.round(100 - i * 15);
    return (
      <div key={name} className="partner-item">
        <span className="partner-name">{name}</span>
        <div className="partner-bar-wrap">
          <div className="partner-bar" style={{ width: `${pct}%`, background: color }} />
        </div>
        <span className="partner-value">~{pct}%</span>
      </div>
    );
  });
}

function GoodsBars({ list, color, maxVal }) {
  return list.map(g => {
    const pct = Math.round((g.v / maxVal) * 100);
    return (
      <div key={g.n} className="partner-item">
        <span className="partner-name wide">{g.n}</span>
        <div className="partner-bar-wrap">
          <div className="partner-bar" style={{ width: `${pct}%`, background: color }} />
        </div>
        <span className="partner-value">${fmt(g.v)}</span>
      </div>
    );
  });
}

function LeverageRow({ partnerName, iso, selectedISO, year }) {
  if (!iso) return null;
  const leverage = mutualLeverage(selectedISO, iso, year, isoNames);
  if (!leverage) return null;
  const mutual = leverage.aReliesOnB && leverage.bReliesOnA;
  const onlyWe = leverage.aReliesOnB && !leverage.bReliesOnA;
  const onlyThey = !leverage.aReliesOnB && leverage.bReliesOnA;
  const tag = mutual ? { label: 'Mutual', cls: 'lev-mutual' }
    : onlyWe ? { label: 'We depend', cls: 'lev-we' }
    : onlyThey ? { label: 'They depend', cls: 'lev-they' }
    : { label: 'No link', cls: 'lev-none' };
  return (
    <div className="leverage-row">
      <span className="leverage-partner">{partnerName}</span>
      <span className={`leverage-tag ${tag.cls}`}>{tag.label}</span>
    </div>
  );
}

// ── CountryColumn: the full detail view for one country ───────────────────────
function CountryColumn({ iso, year }) {
  const d = tradeData[year]?.[iso];
  const countryName = isoNames[iso] || iso;

  if (!d) {
    return (
      <div className="sidebar-content">
        <div className="section-title">Statistics</div>
        <p className="no-data">No data available for this country in {year}.</p>
      </div>
    );
  }

  const balance  = d.exports - d.imports;
  const balClass = balance >= 0 ? 'positive' : 'negative';
  const balSign  = balance >= 0 ? '+' : '';

  const expYoY = yoyChange(iso, year, 'exports');
  const impYoY = yoyChange(iso, year, 'imports');
  const balYoY = yoyChange(iso, year, 'balance');

  const gd2 = goodsData[iso];
  const maxGoodsVal = gd2
    ? Math.max(...gd2.exports.map(g => g.v), ...gd2.imports.map(g => g.v))
    : 1;

  const concentration = sectorConcentration(iso, goodsData);

  function nameToISOFn(name) {
    return Object.entries(isoNames).find(([, n]) => n === name)?.[0] || null;
  }

  const topExportPartners = d.partners.exports.slice(0, 5);
  const topImportPartners = d.partners.imports.slice(0, 5);

  return (
    <div className="sidebar-content">

      {/* ── Key Figures ── */}
      <div className="section-title">Key Figures</div>

      <div className="stat-row">
        <span className="stat-label">Exports</span>
        <span className="stat-value">${fmt(d.exports)} <YoYBadge pct={expYoY} /></span>
      </div>
      <div className="stat-row">
        <span className="stat-label">Imports</span>
        <span className="stat-value">${fmt(d.imports)} <YoYBadge pct={impYoY} /></span>
      </div>
      <div className="stat-row">
        <span className="stat-label">Total Trade</span>
        <span className="stat-value">${fmt(d.exports + d.imports)}</span>
      </div>
      <div className="stat-row">
        <span className="stat-label">Trade Balance</span>
        <span className={`stat-value ${balClass}`}>{balSign}${fmt(balance)} <YoYBadge pct={balYoY} /></span>
      </div>

      {/* ── Sparklines ── */}
      <div className="sparkline-row">
        <div className="sparkline-item">
          <span className="sparkline-label">Exports</span>
          <Sparkline iso={iso} metric="exports" upToYear={year} />
        </div>
        <div className="sparkline-item">
          <span className="sparkline-label">Imports</span>
          <Sparkline iso={iso} metric="imports" upToYear={year} />
        </div>
        <div className="sparkline-item">
          <span className="sparkline-label">Balance</span>
          <Sparkline iso={iso} metric="balance" upToYear={year} />
        </div>
      </div>

      {/* ── Sector Concentration ── */}
      {concentration && (
        <>
          <div className="section-title" style={{ marginTop: 16 }}>Export Concentration</div>
          <div className="concentration-row">
            <span className="concentration-name">{concentration.topCategory}</span>
            <span className="concentration-pct">{concentration.pct.toFixed(0)}% of exports</span>
            <span className={`concentration-badge badge-${concentration.level}`}>
              {concentration.level === 'concentrated' ? '⚠ Concentrated'
                : concentration.level === 'moderate' ? '~ Moderate'
                : '✓ Diversified'}
            </span>
          </div>
        </>
      )}

      {/* ── Goods breakdown ── */}
      {gd2 && (
        <>
          <div className="section-title" style={{ marginTop: 16 }}>Top Export Goods</div>
          <GoodsBars list={gd2.exports} color="#3fb950" maxVal={maxGoodsVal} />
          <div className="section-title" style={{ marginTop: 16 }}>Top Import Goods</div>
          <GoodsBars list={gd2.imports} color="#58a6ff" maxVal={maxGoodsVal} />
        </>
      )}

      {/* ── Trade Partners ── */}
      <div className="section-title" style={{ marginTop: 16 }}>Top Export Partners</div>
      <PartnerBars list={topExportPartners} color="#3fb950" />

      <div className="section-title" style={{ marginTop: 16 }}>Top Import Partners</div>
      <PartnerBars list={topImportPartners} color="#58a6ff" />

      {/* ── Mutual Leverage Analysis ── */}
      <div className="section-title" style={{ marginTop: 16 }}>Leverage Analysis</div>
      <p className="no-data" style={{ fontSize: '0.7rem', marginBottom: 6 }}>
        Does the partner also rely on {countryName}?
      </p>
      {[...new Set([...topExportPartners, ...topImportPartners])].slice(0, 6).map(name => (
        <LeverageRow
          key={name}
          partnerName={name}
          iso={nameToISOFn(name)}
          selectedISO={iso}
          year={year}
        />
      ))}

    </div>
  );
}

// ── Main Sidebar ──────────────────────────────────────────────────────────────
export default function Sidebar({ year, selectedISO, compareISO, compareMode, onCompare, onClearCompare }) {
  if (!selectedISO) {
    return (
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Click a country</h2>
          <p>to view trade details</p>
        </div>
        <div className="sidebar-content">
          <p className="no-data">
            Select a country on the map to explore its trade statistics and top trading partners.
          </p>
        </div>
      </aside>
    );
  }

  const primaryName = isoNames[selectedISO] || selectedISO;
  const compareName = compareISO ? (isoNames[compareISO] || compareISO) : null;
  const isCompareActive = !!compareISO;

  return (
    <aside className={`sidebar${isCompareActive ? ' compare-active' : ''}`}>
      <div className="sidebar-header">
        {isCompareActive ? (
          <div className="compare-header-row">
            <div className="compare-col-title">
              <span>{primaryName}</span>
            </div>
            <div className="compare-col-divider" />
            <div className="compare-col-title">
              <span>{compareName}</span>
              <button className="compare-clear-btn" onClick={onClearCompare} title="Clear comparison">×</button>
            </div>
          </div>
        ) : (
          <>
            <div className="sidebar-header-row">
              <div>
                <h2>{primaryName}</h2>
                <p>Trade data for {year}</p>
              </div>
              {!compareMode && (
                <button className="compare-btn" onClick={onCompare} title="Compare with another country">
                  ⇄ Compare
                </button>
              )}
            </div>
            {compareMode && (
              <div className="compare-hint">
                Click a country on the map to compare
                <button className="compare-cancel-btn" onClick={onClearCompare}>×</button>
              </div>
            )}
          </>
        )}
      </div>

      {isCompareActive ? (
        <div className="compare-columns">
          <div className="compare-col">
            <CountryColumn iso={selectedISO} year={year} />
          </div>
          <div className="compare-col">
            <CountryColumn iso={compareISO} year={year} />
          </div>
        </div>
      ) : (
        <CountryColumn iso={selectedISO} year={year} />
      )}
    </aside>
  );
}
