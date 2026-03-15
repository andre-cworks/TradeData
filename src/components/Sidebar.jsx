import { isoNames } from '../data/isoNames';
import { goodsData } from '../data/goodsData';
import { tradeData } from '../data/tradeData';
import { fmt } from '../utils/colorScale';

function PartnerBars({ list, color, wide }) {
  return list.map((name, i) => {
    const pct = Math.round(100 - i * 15);
    return (
      <div key={name} className="partner-item">
        <span className={`partner-name${wide ? ' wide' : ''}`}>{name}</span>
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
        <span className="partner-name wide" style={{ fontSize: '0.75rem' }}>{g.n}</span>
        <div className="partner-bar-wrap">
          <div className="partner-bar" style={{ width: `${pct}%`, background: color }} />
        </div>
        <span className="partner-value">${fmt(g.v)}</span>
      </div>
    );
  });
}

export default function Sidebar({ year, selectedISO }) {
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

  const d = tradeData[year]?.[selectedISO];
  const gd = goodsData[selectedISO];
  const countryName = isoNames[selectedISO] || selectedISO;

  if (!d) {
    return (
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>{countryName}</h2>
          <p>Trade data for {year}</p>
        </div>
        <div className="sidebar-content">
          <div className="section-title">Statistics</div>
          <p className="no-data">No data available for this country.</p>
        </div>
      </aside>
    );
  }

  const balance = d.exports - d.imports;
  const balClass = balance >= 0 ? 'positive' : 'negative';
  const balSign  = balance >= 0 ? '+' : '';
  const maxGoodsVal = gd
    ? Math.max(...gd.exports.map(g => g.v), ...gd.imports.map(g => g.v))
    : 1;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>{countryName}</h2>
        <p>Trade data for {year}</p>
      </div>
      <div className="sidebar-content">
        <div className="section-title">Key Figures</div>
        <div className="stat-row">
          <span className="stat-label">Exports</span>
          <span className="stat-value">${fmt(d.exports)}</span>
        </div>
        <div className="stat-row">
          <span className="stat-label">Imports</span>
          <span className="stat-value">${fmt(d.imports)}</span>
        </div>
        <div className="stat-row">
          <span className="stat-label">Total Trade</span>
          <span className="stat-value">${fmt(d.exports + d.imports)}</span>
        </div>
        <div className="stat-row">
          <span className="stat-label">Trade Balance</span>
          <span className={`stat-value ${balClass}`}>{balSign}${fmt(balance)}</span>
        </div>

        {gd && (
          <>
            <div className="section-title" style={{ marginTop: 18 }}>Top Export Goods</div>
            <GoodsBars list={gd.exports} color="#3fb950" maxVal={maxGoodsVal} />
            <div className="section-title" style={{ marginTop: 18 }}>Top Import Goods</div>
            <GoodsBars list={gd.imports} color="#58a6ff" maxVal={maxGoodsVal} />
          </>
        )}

        <div className="section-title" style={{ marginTop: 18 }}>Top Export Partners</div>
        <PartnerBars list={d.partners.exports.slice(0, 5)} color="#6e7681" />

        <div className="section-title" style={{ marginTop: 18 }}>Top Import Partners</div>
        <PartnerBars list={d.partners.imports.slice(0, 5)} color="#6e7681" />
      </div>
    </aside>
  );
}
