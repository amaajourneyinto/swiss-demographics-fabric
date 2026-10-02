:root {
  font-family: Inter, 'Segoe UI', sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color: #0f172a;
  background: #f3f7fb;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

html, body, #root {
  margin: 0;
  min-height: 100%;
  min-width: 320px;
}

body {
  background: linear-gradient(180deg, #eef6ff 0%, #f7fafc 100%);
}

button,
select {
  font: inherit;
}

.app-shell {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px 48px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 18px 0 28px;
}

.eyebrow {
  margin: 0 0 6px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 11px;
  color: #3b82f6;
  font-weight: 700;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 3vw, 3rem);
  letter-spacing: -0.04em;
}

.filter-stack {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-stack label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;
  color: #334155;
}

.filter-stack select {
  min-width: 150px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #dfe7f0;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.04);
}

.dashboard {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 22px 18px;
  border-radius: 18px;
  border: 1px solid rgba(148, 163, 184, 0.15);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.06);
}

.stat-card span,
.label {
  font-size: 12px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #64748b;
  font-weight: 700;
}

.stat-card strong {
  font-size: clamp(1.2rem, 2vw, 2rem);
  letter-spacing: -0.05em;
}

.stat-card small {
  color: #475569;
}

.accent-blue {
  border-top: 4px solid #2563eb;
}

.accent-green {
  border-top: 4px solid #14b8a6;
}

.accent-amber {
  border-top: 4px solid #f59e0b;
}

.accent-red {
  border-top: 4px solid #ef4444;
}

.panel-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 22px;
}

.bottom-grid {
  grid-template-columns: 0.75fr 1.25fr;
}

.panel {
  background: rgba(255, 255, 255, 0.92);
  border-radius: 20px;
  border: 1px solid rgba(148, 163, 184, 0.14);
  box-shadow: 0 12px 26px rgba(15, 23, 42, 0.05);
  padding: 20px 18px 12px;
}

.panel-wide {
  min-width: 0;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.panel-header h2 {
  margin: 4px 0 0;
  font-size: 1.3rem;
  letter-spacing: -0.04em;
}

.chart-wrap {
  width: 100%;
  height: 300px;
}

.chart-wrap.small {
  height: 240px;
}

.detail-list {
  list-style: none;
  padding: 0;
  margin: 14px 0 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.detail-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 12px 10px;
  border-radius: 10px;
  background: #f8fafc;
  border: 1px solid #edf2f7;
}

.detail-list span {
  color: #475569;
}

.detail-list strong {
  font-size: 0.98rem;
}

@media (max-width: 920px) {
  .topbar,
  .panel-grid,
  .bottom-grid,
  .stat-grid {
    grid-template-columns: 1fr;
    display: grid;
  }

  .topbar {
    display: grid;
  }

  .filter-stack {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .app-shell {
    padding-left: 14px;
    padding-right: 14px;
  }

  .filter-stack {
    grid-template-columns: 1fr;
  }
}
