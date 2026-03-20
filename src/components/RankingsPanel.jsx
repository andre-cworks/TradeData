import { useState, useMemo } from 'react';
import { isoNames } from '../data/isoNames';
import { tradeData } from '../data/tradeData';
import { fmt, metricValue, yoyChange, dependencyScore } from '../utils/colorScale';

const SORT_KEYS = {
  total:      d => d.exports + d.imports,
  exports:    d => d.exports,
  imports:    d => d.imports,
  balance:    d => d.exports - d.imports,
  dependency: (d, iso, year) => dependencyScore(iso, year) ?? -Infinity,
};

const COL_LABEL = {
  total: 'Total Trade', exports: 'Exports', imports: 'Imports',
  balance: 'Balance', dependency: 'Dep. Risk',
};

// Simple country flag emoji via regional indicator letters (ISO 2-letter codes)
const ISO3_TO_2 = {
  USA:'US',CHN:'CN',DEU:'DE',JPN:'JP',GBR:'GB',FRA:'FR',NLD:'NL',KOR:'KR',ITA:'IT',
  CAN:'CA',BEL:'BE',MEX:'MX',RUS:'RU',SAU:'SA',SGP:'SG',IND:'IN',AUS:'AU',ESP:'ES',
  BRA:'BR',THA:'TH',TWN:'TW',CHE:'CH',POL:'PL',SWE:'SE',ZAF:'ZA',NGA:'NG',EGY:'EG',
  ARG:'AR',IDN:'ID',NOR:'NO',TUR:'TR',IRN:'IR',ARE:'AE',MYS:'MY',VNM:'VN',PHL:'PH',
  CHL:'CL',COL:'CO',PER:'PE',PAK:'PK',BGD:'BD',
};

function flag(iso3) {
  const code = ISO3_TO_2[iso3];
  if (!code) return '';
  return [...code].map(c => String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65)).join('');
}

export default function RankingsPanel({ year, metric, selectedISO, onSelectCountry }) {
  const [sortKey, setSortKey] = useState(metric);
  const [sortAsc, setSortAsc] = useState(false);

  function handleColClick(key) {
    if (sortKey === key) setSortAsc(a => !a);
    else { setSortKey(key); setSortAsc(false); }
  }

  const rows = useMemo(() => {
    const data = tradeData[year] || {};
    return Object.entries(data).map(([iso, d]) => ({
      iso,
      name: isoNames[iso] || iso,
      exports: d.exports,
      imports: d.imports,
      balance: d.exports - d.imports,
      total: d.exports + d.imports,
      dependency: dependencyScore(iso, year),
      yoy: yoyChange(iso, year, metric === 'dependency' ? 'total' : metric),
    }));
  }, [year, metric]);

  const sorted = useMemo(() => {
    return [...rows].sort((a, b) => {
      const va = a[sortKey] ?? -Infinity;
      const vb = b[sortKey] ?? -Infinity;
      return sortAsc ? va - vb : vb - va;
    });
  }, [rows, sortKey, sortAsc]);

  function colHeader(key) {
    const active = sortKey === key;
    return (
      <th
        key={key}
        className={`rank-th ${active ? 'rank-th-active' : ''}`}
        onClick={() => handleColClick(key)}
        title={`Sort by ${COL_LABEL[key]}`}
      >
        {COL_LABEL[key]} {active ? (sortAsc ? '▲' : '▼') : ''}
      </th>
    );
  }

  function fmtCell(key, row) {
    if (key === 'dependency') {
      if (row.dependency === null) return '—';
      const risk = row.dependency > 0.12 ? 'High' : row.dependency > 0.07 ? 'Med' : 'Low';
      const cls  = row.dependency > 0.12 ? 'risk-high' : row.dependency > 0.07 ? 'risk-med' : 'risk-low';
      return <span className={`risk-tag ${cls}`}>{risk}</span>;
    }
    const v = row[key];
    const sign = (key === 'balance' && v >= 0) ? '+' : '';
    const cls  = key === 'balance' ? (v >= 0 ? 'positive' : 'negative') : '';
    return <span className={cls}>{sign}${fmt(v)}</span>;
  }

  const COLS = ['exports', 'imports', 'balance', 'dependency'];

  return (
    <div className="rankings-panel">
      <div className="rankings-header">
        <span>Global Rankings — {year}</span>
      </div>
      <div className="rankings-scroll">
        <table className="rankings-table">
          <thead>
            <tr>
              <th className="rank-th rank-th-num">#</th>
              <th className="rank-th rank-th-country" onClick={() => handleColClick('total')}>
                Country {sortKey === 'total' ? (sortAsc ? '▲' : '▼') : ''}
              </th>
              {COLS.map(k => colHeader(k))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => (
              <tr
                key={row.iso}
                className={`rank-row ${row.iso === selectedISO ? 'rank-selected' : ''}`}
                onClick={() => onSelectCountry(row.iso)}
              >
                <td className="rank-num">{i + 1}</td>
                <td className="rank-country">
                  <span className="rank-flag">{flag(row.iso)}</span>
                  <span className="rank-name">{row.name}</span>
                  {row.yoy !== null && (
                    <span className={`yoy-badge ${row.yoy >= 0 ? 'yoy-up' : 'yoy-down'}`}>
                      {row.yoy >= 0 ? '▲' : '▼'}{Math.abs(row.yoy).toFixed(0)}%
                    </span>
                  )}
                </td>
                {COLS.map(k => (
                  <td key={k} className="rank-val">{fmtCell(k, row)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
