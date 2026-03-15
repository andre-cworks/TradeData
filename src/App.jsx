import { useState } from 'react';
import WorldMap from './components/WorldMap';
import Sidebar from './components/Sidebar';
import './App.css';

export default function App() {
  const [year, setYear]           = useState('2024');
  const [metric, setMetric]       = useState('total');
  const [selectedISO, setSelected] = useState(null);

  return (
    <div className="app">
      <header>
        <h1>World Trade Map</h1>
        <div className="controls">
          <label>
            Metric:
            <select value={metric} onChange={e => setMetric(e.target.value)}>
              <option value="total">Total Trade</option>
              <option value="exports">Exports</option>
              <option value="imports">Imports</option>
              <option value="balance">Trade Balance</option>
            </select>
          </label>
          <label>
            Year:
            <select value={year} onChange={e => setYear(e.target.value)}>
              <option value="2025">2025 (prelim)</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
            </select>
          </label>
        </div>
      </header>

      <div className="main">
        <WorldMap
          year={year}
          metric={metric}
          selectedISO={selectedISO}
          onSelectCountry={setSelected}
        />
        <Sidebar year={year} selectedISO={selectedISO} />
      </div>
    </div>
  );
}
