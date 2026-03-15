import * as d3 from 'd3';

export function metricValue(d, metric) {
  if (!d) return null;
  if (metric === 'total')   return d.exports + d.imports;
  if (metric === 'exports') return d.exports;
  if (metric === 'imports') return d.imports;
  if (metric === 'balance') return d.exports - d.imports;
  return null;
}

export function buildColorScale(metric, data) {
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
