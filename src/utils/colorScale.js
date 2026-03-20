import * as d3 from 'd3';
import { tradeData } from '../data/tradeData';

// Rank-weighted shares: positions 1–5 get ~40/25/15/12/8 %
const RANK_WEIGHTS = [0.40, 0.25, 0.15, 0.12, 0.08];

export function metricValue(d, metric) {
  if (!d) return null;
  if (metric === 'total')   return d.exports + d.imports;
  if (metric === 'exports') return d.exports;
  if (metric === 'imports') return d.imports;
  if (metric === 'balance') return d.exports - d.imports;
  return null;
}

export function buildColorScale(metric, data) {
  if (metric === 'dependency') {
    // dependency scores are already in [0, 0.16] range; use fixed domain
    return d3.scaleSequential([0.025, 0.16], d3.interpolateOrRd);
  }
  const vals = Object.values(data)
    .map(d => metricValue(d, metric))
    .filter(v => v !== null);
  if (metric === 'balance') {
    const ext = d3.max(vals.map(Math.abs));
    return d3.scaleDiverging([-ext, 0, ext], d3.interpolateRdYlGn);
  }
  const [lo, hi] = d3.extent(vals);
  return d3.scaleSequential([lo, hi], d3.interpolateYlOrRd);
}

export function fmt(v) {
  if (Math.abs(v) >= 1000) return (v / 1000).toFixed(1) + 'T';
  if (Math.abs(v) >= 1)    return v.toFixed(0) + 'B';
  return v.toFixed(1) + 'B';
}

// ── Dependency score ────────────────────────────────────────────────────────
// HHI-style: Σ(weight²) for top-5 import or export partners.
// Higher score = more concentrated trade = higher dependency risk.
export function dependencyScore(iso, year) {
  const d = tradeData[year]?.[iso];
  if (!d) return null;
  const hhi = list => list.slice(0, 5).reduce((sum, _, i) => sum + RANK_WEIGHTS[i] ** 2, 0);
  return Math.max(hhi(d.partners.exports), hhi(d.partners.imports));
}

// ── Year-over-year change ────────────────────────────────────────────────────
export function yoyChange(iso, year, metric) {
  const years = Object.keys(tradeData).map(Number).sort();
  const yi = years.indexOf(Number(year));
  if (yi <= 0) return null;
  const prev = String(years[yi - 1]);
  const curr = tradeData[year]?.[iso];
  const prv  = tradeData[prev]?.[iso];
  if (!curr || !prv) return null;
  const valCurr = metricValue(curr, metric);
  const valPrev = metricValue(prv, metric);
  if (!valPrev) return null;
  return ((valCurr - valPrev) / Math.abs(valPrev)) * 100;
}

// ── Sector concentration ─────────────────────────────────────────────────────
export function sectorConcentration(iso, goodsData) {
  const gd = goodsData[iso];
  if (!gd || !gd.exports.length) return null;
  const total = gd.exports.reduce((s, g) => s + g.v, 0);
  if (!total) return null;
  const top = gd.exports.reduce((a, b) => (b.v > a.v ? b : a));
  const pct = (top.v / total) * 100;
  const level = pct > 50 ? 'concentrated' : pct > 35 ? 'moderate' : 'diversified';
  return { topCategory: top.n, pct, level };
}

// ── Mutual leverage ──────────────────────────────────────────────────────────
// Returns whether isoA appears in isoB's partner lists and vice versa.
export function mutualLeverage(isoA, isoB, year, isoNames) {
  const dA = tradeData[year]?.[isoA];
  const dB = tradeData[year]?.[isoB];
  if (!dA || !dB) return null;

  const nameB = isoNames[isoB] || isoB;
  const nameA = isoNames[isoA] || isoA;

  const aExportsToB = dA.partners.exports.includes(nameB);
  const aImportsFromB = dA.partners.imports.includes(nameB);
  const bExportsToA = dB.partners.exports.includes(nameA);
  const bImportsFromA = dB.partners.imports.includes(nameA);

  const aReliesOnB = aImportsFromB || aExportsToB;
  const bReliesOnA = bImportsFromA || bExportsToA;

  return { aReliesOnB, bReliesOnA, aExportsToB, aImportsFromB, bExportsToA, bImportsFromA };
}
