import { useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { swissCantonData, swissRegionOptions } from './data/swissDemographics'

const currencyFormat = new Intl.NumberFormat('en-CH', {
  maximumFractionDigits: 0,
})

const percentFormat = new Intl.NumberFormat('en-CH', {
  maximumFractionDigits: 1,
})

const palette = ['#2563eb', '#14b8a6', '#f59e0b', '#ef4444', '#8b5cf6', '#10b981']

const formatPopulation = (value) => `${currencyFormat.format(value)} people`

const formatPercent = (value) => `${percentFormat.format(value)}%`

function App() {
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [selectedCanton, setSelectedCanton] = useState('Zürich')

  const visibleCantons = useMemo(() => {
    return selectedRegion === 'All'
      ? swissCantonData
      : swissCantonData.filter((entry) => entry.region === selectedRegion)
  }, [selectedRegion])

  const selectedCantonData = useMemo(() => {
    return (
      swissCantonData.find((entry) => entry.canton === selectedCanton) || swissCantonData[0]
    )
  }, [selectedCanton])

  const summary = useMemo(() => {
    const totalPopulation = visibleCantons.reduce((sum, entry) => sum + entry.population, 0)
    const totalForeigners = visibleCantons.reduce(
      (sum, entry) => sum + entry.population * (entry.foreignersShare / 100),
      0,
    )
    const averageMedianAge =
      visibleCantons.reduce((sum, entry) => sum + entry.medianAge, 0) / visibleCantons.length
    const averageFemaleShare =
      visibleCantons.reduce((sum, entry) => sum + entry.femaleShare, 0) / visibleCantons.length

    return {
      totalPopulation,
      totalForeigners,
      averageMedianAge,
      averageFemaleShare,
      totalGrowth: visibleCantons.reduce((sum, entry) => sum + entry.annualGrowth, 0),
    }
  }, [visibleCantons])

  const ageBreakdown = Object.entries(selectedCantonData.ageGroups).map(([label, value]) => ({
    label,
    value,
  }))

  const cantonComparisonData = visibleCantons.map((entry) => ({
    canton: entry.canton,
    population: entry.population,
  }))

  const annualTrend = selectedCantonData.populationTrend.map((value, index) => ({
    year: 2020 + index,
    population: value,
  }))

  const regionOptions = swissRegionOptions

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Demographic intelligence</p>
          <h1>Swiss Demographics Explorer</h1>
        </div>
        <div className="filter-stack">
          <label>
            Region
            <select value={selectedRegion} onChange={(event) => setSelectedRegion(event.target.value)}>
              {regionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label>
            Canton
            <select value={selectedCanton} onChange={(event) => setSelectedCanton(event.target.value)}>
              {swissCantonData.map((entry) => (
                <option key={entry.canton} value={entry.canton}>
                  {entry.canton}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>

      <main className="dashboard">
        <section className="stat-grid">
          <article className="stat-card accent-blue">
            <span>Total population</span>
            <strong>{formatPopulation(summary.totalPopulation)}</strong>
            <small>{selectedRegion === 'All' ? 'Across visible cantons' : `In ${selectedRegion}`}</small>
          </article>
          <article className="stat-card accent-green">
            <span>Median age</span>
            <strong>{formatPercent(summary.averageMedianAge)}</strong>
            <small>Average across selected region</small>
          </article>
          <article className="stat-card accent-amber">
            <span>Female share</span>
            <strong>{formatPercent(summary.averageFemaleShare)}</strong>
            <small>Average female population share</small>
          </article>
          <article className="stat-card accent-red">
            <span>Foreign residents</span>
            <strong>{formatPopulation(Math.round(summary.totalForeigners))}</strong>
            <small>{formatPercent((summary.totalForeigners / summary.totalPopulation) * 100)} of total</small>
          </article>
        </section>

        <section className="panel-grid">
          <article className="panel panel-wide">
            <div className="panel-header">
              <div>
                <p className="label">Population by canton</p>
                <h2>Regional comparison</h2>
              </div>
            </div>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={cantonComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#dfe7f0" />
                  <XAxis dataKey="canton" tick={{ fontSize: 11 }} interval={0} angle={-25} textAnchor="end" height={80} />
                  <YAxis tickFormatter={(value) => `${Math.round(value / 100000) / 10}M`} />
                  <Tooltip formatter={(value) => formatPopulation(value)} />
                  <Bar dataKey="population" radius={[8, 8, 0, 0]}>
                    {cantonComparisonData.map((entry, index) => (
                      <Cell key={entry.canton} fill={palette[index % palette.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="panel">
            <div className="panel-header">
              <div>
                <p className="label">Selected canton</p>
                <h2>{selectedCantonData.canton}</h2>
              </div>
            </div>
            <ul className="detail-list">
              <li>
                <span>Population</span>
                <strong>{formatPopulation(selectedCantonData.population)}</strong>
              </li>
              <li>
                <span>Median age</span>
                <strong>{selectedCantonData.medianAge} years</strong>
              </li>
              <li>
                <span>Female share</span>
                <strong>{formatPercent(selectedCantonData.femaleShare)}</strong>
              </li>
              <li>
                <span>Foreign resident share</span>
                <strong>{formatPercent(selectedCantonData.foreignersShare)}</strong>
              </li>
              <li>
                <span>Annual growth</span>
                <strong>{formatPercent(selectedCantonData.annualGrowth)}</strong>
              </li>
            </ul>
          </article>
        </section>

        <section className="panel-grid bottom-grid">
          <article className="panel">
            <div className="panel-header">
              <div>
                <p className="label">Age structure</p>
                <h2>{selectedCantonData.canton}</h2>
              </div>
            </div>
            <div className="chart-wrap small">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={ageBreakdown} dataKey="value" nameKey="label" innerRadius={45} outerRadius={80} paddingAngle={2}>
                    {ageBreakdown.map((entry, index) => (
                      <Cell key={entry.label} fill={palette[index % palette.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="panel panel-wide">
            <div className="panel-header">
              <div>
                <p className="label">Population trend</p>
                <h2>{selectedCantonData.canton} 2020-2025</h2>
              </div>
            </div>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={annualTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#dfe7f0" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `${Math.round(value / 100000) / 10}M`} />
                  <Tooltip formatter={(value) => formatPopulation(value)} />
                  <Legend />
                  <Line type="monotone" dataKey="population" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </article>
        </section>
      </main>
    </div>
  )
}

export default App
