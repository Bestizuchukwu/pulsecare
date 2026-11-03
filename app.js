(function () {
  const STORE_KEY = 'pulsecare.readings.v1';
  const NOTIF_KEY = 'pulsecare.notifications.v1';
  const OK_STATUS = /^(Normal|Stable|Healthy|Balanced|Rested|Strong|Active|Goal met|Building)$/;
  const DAY = 86400000;

  // kind: 'single' stores one number, 'bp' stores [systolic, diastolic].
  const METRICS = {
    'blood-pressure': { name: 'Blood Pressure', icon: '🩺', cls: 'blood', kind: 'bp', unit: 'mmHg', goal: '120/80',
      seed: [[118, 76], [121, 79], [119, 75], [123, 81], [117, 74], [120, 78], [118, 77]],
      status: (v) => (v[0] < 120 && v[1] < 80 ? 'Normal' : v[0] < 130 && v[1] < 80 ? 'Elevated' : 'High'),
      tip: 'Keep sodium low, stay hydrated and measure at the same time each day for consistent readings.' },
    'heart-rate': { name: 'Heart Rate', icon: '💓', cls: 'heart', kind: 'single', unit: 'bpm', goal: '<80', min: 20, max: 250, step: 1,
      seed: [74, 72, 76, 71, 94, 70, 73],
      status: (v) => (v < 60 ? 'Low' : v <= 100 ? 'Stable' : 'High'),
      tip: 'Your resting heart rate reflects cardiovascular fitness. Consistent sleep and hydration help keep it steady.' },
    temperature: { name: 'Temperature', icon: '🌡️', cls: 'temp', kind: 'single', unit: '°C', goal: '36.1–37.2', min: 30, max: 45, step: 0.1,
      seed: [36.9, 36.8, 37.0, 36.7, 36.9, 36.8, 36.6],
      status: (v) => (v < 36.1 ? 'Low' : v <= 37.2 ? 'Healthy' : v < 38 ? 'Elevated' : 'Fever'),
      tip: 'A reading above 38°C may indicate a fever. Rest, drink fluids and consult a doctor if it persists.' },
    weight: { name: 'Weight', icon: '⚖️', cls: 'weight', kind: 'single', unit: 'kg', goal: '70', min: 10, max: 400, step: 0.1,
      seed: [69.4, 69.5, 69.3, 69.6, 69.8, 69.5, 69.7],
      status: (v) => (v <= 70 ? 'Balanced' : 'Above goal'),
      tip: 'Weigh yourself at the same time each morning and focus on the weekly trend rather than daily changes.' },
    'walk-time': { name: 'Walk Time', icon: '🚶', cls: 'walk', kind: 'single', unit: 'min', goal: '45', min: 0, max: 1440, step: 1,
      seed: [42, 55, 38, 47, 60, 30, 44],
      status: (v) => (v >= 45 ? 'Goal met' : 'Active'),
      tip: 'Short walks after meals improve digestion and help regulate blood sugar.' },
    'sleeping-time': { name: 'Sleeping Time', icon: '😴', cls: 'sleep', kind: 'single', unit: 'h', goal: '8', min: 0, max: 24, step: 0.1,
      seed: [7.8, 7.2, 6.9, 8.1, 7.5, 6.5, 7.7],
      status: (v) => (v >= 7 ? 'Rested' : 'Low sleep'),
      tip: 'Adults need 7–9 hours. A fixed bedtime and a screen-free hour before bed improve sleep quality.' },
    'running-time': { name: 'Running Time', icon: '🏃', cls: 'run', kind: 'single', unit: 'min', goal: '30', min: 0, max: 1440, step: 1,
      seed: [24, 30, 20, 28, 35, 20, 26],
      status: (v) => (v >= 30 ? 'Strong' : 'Building'),
      tip: 'Mix easy and tempo runs and allow rest days to reduce injury risk.' },
  };

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY));
      if (saved && typeof saved === 'object') return saved;
    } catch (e) { /* fall back to seed data */ }
    return {};
  }

  function persist(data) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch (e) { /* storage unavailable */ }
  }

  // Readings newest-first as {t, v}.
  function readings(id) {
    const saved = load()[id];
    if (Array.isArray(saved) && saved.length) return saved;
    const now = Date.now();
    return METRICS[id].seed.map((v, i) => ({ t: now - i * DAY, v }));
  }

  function addReading(id, v) {
    const data = load();
    data[id] = [{ t: Date.now(), v }].concat(readings(id)).slice(0, 200);
    persist(data);
  }

  function removeReading(id, t) {
    const data = load();
    data[id] = readings(id).filter((r) => r.t !== t);
    persist(data);
  }

  const primary = (m, v) => (m.kind === 'bp' ? v[0] : v);
  const fmt = (m, v) => (m.kind === 'bp' ? v[0] + '/' + v[1] : String(Math.round(v * 10) / 10));
  const fmtUnit = (m, v) => (m.kind === 'bp' ? fmt(m, v) : fmt(m, v) + ' ' + m.unit);
  const avg = (arr) => arr.reduce((a, b) => a + b, 0) / (arr.length || 1);
  const round1 = (n) => Math.round(n * 10) / 10;

  function startOfDay(t) {
    const d = new Date(t);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  }

  function relDate(t) {
    const days = Math.round((startOfDay(Date.now()) - startOfDay(t)) / DAY);
    if (days <= 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return days + ' days ago';
    return new Date(t).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  function pctChange(m, list) {
    if (list.length < 2) return { text: 'Stable', cls: 'up' };
    const a = primary(m, list[0].v);
    const b = primary(m, list[1].v);
    if (!b) return { text: 'Stable', cls: 'up' };
    const p = Math.round(((a - b) / b) * 100);
    if (p === 0) return { text: 'Stable', cls: 'up' };
    return { text: (p > 0 ? '+' : '') + p + '%', cls: p > 0 ? 'up' : 'down' };
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function chart(m, list) {
    const pts = list.slice(0, 14).reverse();
    if (pts.length < 2) return '<p class="empty">Add more readings to see a trend.</p>';
    const vals = pts.map((r) => primary(m, r.v));
    const lo = Math.min.apply(null, vals);
    const hi = Math.max.apply(null, vals);
    const span = hi - lo || 1;
    const W = 300, H = 110, P = 10;
    const xy = vals.map((v, i) => [P + (i * (W - 2 * P)) / (vals.length - 1), H - P - ((v - lo) / span) * (H - 2 * P)]);
    const line = xy.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
    const area = P + ',' + (H - P) + ' ' + line + ' ' + (W - P) + ',' + (H - P);
    const dots = xy.map((p) => '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="3"/>').join('');
    return '<svg class="trend-chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(m.name) + ' trend">' +
      '<polygon class="area" points="' + area + '"/><polyline class="line" points="' + line + '"/>' + dots + '</svg>' +
      '<p class="chart-range">Last ' + pts.length + ' readings · ' + lo + ' – ' + hi + '</p>';
  }

  function form(m) {
    const inputs = m.kind === 'bp'
      ? '<input name="sys" type="number" inputmode="numeric" min="50" max="260" placeholder="Systolic" required aria-label="Systolic" />' +
        '<input name="dia" type="number" inputmode="numeric" min="30" max="180" placeholder="Diastolic" required aria-label="Diastolic" />'
      : '<input name="val" type="number" inputmode="decimal" min="' + m.min + '" max="' + m.max + '" step="' + m.step + '" placeholder="Value (' + esc(m.unit) + ')" required aria-label="Value" />';
    return '<section class="history-card"><h3>Log a reading</h3><form class="log-form" id="logForm">' + inputs +
      '<button type="submit" class="primary-btn">Add</button></form><p class="form-msg" id="formMsg" role="status"></p></section>';
  }

  function notifications() {
    try { return JSON.parse(localStorage.getItem(NOTIF_KEY)) || []; } catch (e) { return []; }
  }

  function pushNotification(text) {
    const list = [{ t: Date.now(), text }].concat(notifications()).slice(0, 20);
    try { localStorage.setItem(NOTIF_KEY, JSON.stringify(list)); } catch (e) { /* ignore */ }
  }

  function renderMetricPage() {
    const id = document.body.dataset.metric;
    const view = document.body.dataset.view;
    const m = METRICS[id];
    const root = document.getElementById('metricRoot');
    if (!m || !root) return;

    const list = readings(id);
    const latest = list[0].v;
    const week = list.slice(0, 7);
    const vals = week.map((r) => primary(m, r.v));
    const avgText = m.kind === 'bp'
      ? Math.round(avg(week.map((r) => r.v[0]))) + '/' + Math.round(avg(week.map((r) => r.v[1])))
      : round1(avg(vals));
    const change = pctChange(m, list);

    document.title = m.name + (view === 'history' ? ' History' : '') + ' | PulseCare';
    const hdr = document.getElementById('metricTitle');
    if (hdr) hdr.textContent = m.name;
    const tag = document.getElementById('metricStatus');
    if (tag) tag.textContent = m.status(latest);

    let html = '<section class="metric-highlight"><div class="highlight-ring"><div><strong>' + fmt(m, latest) +
      '</strong><small>' + esc(m.unit) + '</small></div></div><div class="mini-readings">' +
      '<div class="mini-reading"><label>7-day avg</label><strong>' + avgText + '</strong></div>' +
      '<div class="mini-reading"><label>Change</label><strong>' + change.text + '</strong></div>' +
      '<div class="mini-reading"><label>Goal</label><strong>' + esc(m.goal) + '</strong></div></div></section>' +
      '<nav class="action-tabs" aria-label="Metric navigation">' +
      '<a class="tab' + (view === 'overview' ? ' active' : '') + '" href="' + id + '.html">Overview</a>' +
      '<a class="tab' + (view === 'history' ? ' active' : '') + '" href="' + id + '-history.html">History</a></nav>';

    if (view === 'history') {
      html += form(m) + '<section class="history-card"><h3>Recent history</h3><ul class="history-list">' +
        list.slice(0, 30).map((r, i) => {
          const c = pctChange(m, list.slice(i));
          return '<li class="history-item"><div class="meta"><strong>' + fmtUnit(m, r.v) + '</strong><time>' + relDate(r.t) +
            '</time></div><span class="trend ' + c.cls + '">' + c.text + '</span>' +
            '<button class="del-btn" data-t="' + r.t + '" aria-label="Delete reading">✕</button></li>';
        }).join('') +
        '</ul><button class="ghost-btn" id="exportBtn">Export CSV</button></section>';
    } else {
      html += '<section class="metric-summary"><h3>Overview</h3><div class="summary-grid">' +
        '<div class="kpi-box"><span class="kpi-label">Last read</span><strong>' +
        new Date(list[0].t).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) + '</strong></div>' +
        '<div class="kpi-box"><span class="kpi-label">Status</span><strong>' + m.status(latest) + '</strong></div>' +
        '<div class="kpi-box"><span class="kpi-label">Low (7d)</span><strong>' + Math.min.apply(null, vals) + '</strong></div>' +
        '<div class="kpi-box"><span class="kpi-label">High (7d)</span><strong>' + Math.max.apply(null, vals) + '</strong></div></div></section>' +
        '<section class="history-card"><h3>Trend</h3>' + chart(m, list) + '</section>' +
        '<section class="detail-card"><div class="detail-copy"><p>' + esc(m.tip) + '</p></div></section>';
    }
    root.innerHTML = html;

    const f = document.getElementById('logForm');
    if (f) {
      f.addEventListener('submit', (e) => {
        e.preventDefault();
        const num = (n) => parseFloat(f.elements[n].value);
        const v = m.kind === 'bp' ? [num('sys'), num('dia')] : num('val');
        const bad = m.kind === 'bp' ? !(v[0] > v[1] && v[1] > 0) : !(isFinite(v) && v >= m.min && v <= m.max);
        if (bad) { document.getElementById('formMsg').textContent = 'Please enter a valid reading.'; return; }
        addReading(id, v);
        const status = m.status(v);
        if (!OK_STATUS.test(status)) pushNotification(m.name + ' ' + fmtUnit(m, v) + ' flagged: ' + status);
        renderMetricPage();
      });
    }
    root.querySelectorAll('.del-btn').forEach((b) => b.addEventListener('click', () => {
      if (list.length <= 1) return;
      removeReading(id, Number(b.dataset.t));
      renderMetricPage();
    }));
    const exp = document.getElementById('exportBtn');
    if (exp) {
      exp.addEventListener('click', () => {
        const rows = ['date,value'].concat(list.map((r) => new Date(r.t).toISOString() + ',' + fmt(m, r.v)));
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([rows.join('\n')], { type: 'text/csv' }));
        a.download = id + '.csv';
        a.click();
        URL.revokeObjectURL(a.href);
      });
    }
  }

  function renderDashboard() {
    const grid = document.getElementById('metricGrid');
    if (!grid) return;
    const ids = Object.keys(METRICS);
    grid.innerHTML = ids.map((id) => {
      const m = METRICS[id];
      const latest = readings(id)[0].v;
      return '<a class="metric-card ' + m.cls + '" href="metrics/' + id + '.html"><div class="card-icon">' + m.icon +
        '</div><div class="card-copy"><p>' + m.name + '</p><strong>' + fmtUnit(m, latest) + '</strong><small>' + m.status(latest) + '</small></div></a>';
    }).join('');

    const set = (k, v) => { const el = document.getElementById(k); if (el) el.textContent = v; };
    set('statWalk', fmtUnit(METRICS['walk-time'], readings('walk-time')[0].v));
    set('statSleep', fmtUnit(METRICS['sleeping-time'], readings('sleeping-time')[0].v));
    set('statRun', fmtUnit(METRICS['running-time'], readings('running-time')[0].v));

    const flagged = ids.filter((id) => !OK_STATUS.test(METRICS[id].status(readings(id)[0].v)));
    set('heroTitle', flagged.length ? flagged.length + ' metric' + (flagged.length > 1 ? 's' : '') + ' need attention' : 'Good health trend');

    const search = document.getElementById('metricSearch');
    if (search) {
      search.addEventListener('input', () => {
        const q = search.value.trim().toLowerCase();
        grid.querySelectorAll('.metric-card').forEach((c) => { c.hidden = !!q && !c.textContent.toLowerCase().includes(q); });
      });
    }

    const btn = document.getElementById('notifBtn');
    const panel = document.getElementById('notifPanel');
    if (btn && panel) {
      const draw = () => {
        const alerts = flagged.map((id) => METRICS[id].name + ' is ' + METRICS[id].status(readings(id)[0].v).toLowerCase());
        const items = alerts.concat(notifications().map((x) => x.text));
        panel.innerHTML = items.length
          ? '<ul>' + items.map((t) => '<li>' + esc(t) + '</li>').join('') + '</ul><button class="ghost-btn" id="clearNotif">Clear history</button>'
          : '<p class="empty">You are all caught up.</p>';
        btn.dataset.count = items.length;
        const clear = document.getElementById('clearNotif');
        if (clear) clear.addEventListener('click', () => { localStorage.removeItem(NOTIF_KEY); draw(); });
      };
      draw();
      btn.addEventListener('click', () => {
        panel.hidden = !panel.hidden;
        btn.setAttribute('aria-expanded', String(!panel.hidden));
      });
    }
  }

  const dateTag = document.getElementById('todayDate');
  if (dateTag) dateTag.textContent = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  renderDashboard();
  renderMetricPage();
})();
