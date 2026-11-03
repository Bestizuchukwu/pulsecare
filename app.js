const dateTag = document.getElementById('todayDate');
if (dateTag) {
  const today = new Date();
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  dateTag.textContent = today.toLocaleDateString('en-US', options);
}

const current = location.pathname.split('/').pop();
if (current && current.includes('-history')) {
  const historyLinks = document.querySelectorAll('.tab');
  historyLinks.forEach((link) => link.classList.toggle('active', link.dataset.view === 'history'));
}

const metricData = {
  'blood-pressure': {
    title: 'Blood Pressure',
    value: '118/76',
    unit: 'mmHg',
    status: 'Normal',
    stats: [['Pulse', '74 bpm'], ['Average', '116/74'], ['Goal', '120/80']],
    description: 'Recent sample readings are within a typical adult range. Follow guidance from your healthcare professional for your personal targets.',
    history: [['118/76 mmHg', 'Today', 'Stable'], ['121/79 mmHg', 'Yesterday', '+1%'], ['119/75 mmHg', '2 days ago', '+2%'], ['123/81 mmHg', '3 days ago', '-1%']]
  },
  'heart-rate': {
    title: 'Heart Rate',
    value: '74',
    unit: 'bpm',
    status: 'Stable',
    stats: [['Resting', '68 bpm'], ['Peak', '94 bpm'], ['Average', '72 bpm']],
    description: 'Heart-rate values vary with activity, stress, medication, and health. These sample readings are for demonstration only.',
    history: [['74 bpm', 'Today', 'Stable'], ['72 bpm', 'Yesterday', '+2%'], ['71 bpm', '2 days ago', '+1%'], ['76 bpm', '3 days ago', '-3%']]
  },
  temperature: {
    title: 'Temperature',
    value: '36.9',
    unit: '°C',
    status: 'Healthy',
    stats: [['Previous', '36.8°C'], ['Average', '36.7°C'], ['Range', '36.1–37.2°C']],
    description: 'Body temperature can vary by person, time of day, and measurement method. Seek medical advice if you are concerned about symptoms.',
    history: [['36.9°C', 'Today', 'Stable'], ['36.8°C', 'Yesterday', '+0.1°'], ['36.7°C', '2 days ago', '+0.2°'], ['37.0°C', '3 days ago', '-0.1°']]
  },
  weight: {
    title: 'Weight',
    value: '69.4',
    unit: 'kg',
    status: 'Balanced',
    stats: [['Goal', '68.5 kg'], ['Change', '-0.4 kg'], ['Average', '69.8 kg']],
    description: 'Weight naturally fluctuates. Consider longer-term patterns and discuss personal health goals with a qualified professional.',
    history: [['69.4 kg', 'Today', 'Stable'], ['69.6 kg', 'Yesterday', '-0.2'], ['69.8 kg', '2 days ago', '-0.4'], ['69.5 kg', '3 days ago', '-0.1']]
  },
  oxygen: {
    title: 'Blood Oxygen',
    value: '98',
    unit: '%',
    status: 'Optimal',
    stats: [['Previous', '97%'], ['Average', '98%'], ['Device', 'Sample']],
    description: 'This is a sample reading, not a medical measurement. Consumer pulse oximeters can be inaccurate; contact a healthcare professional with concerns.',
    history: [['98%', 'Today', 'Stable'], ['97%', 'Yesterday', '+1%'], ['98%', '2 days ago', 'Stable'], ['97%', '3 days ago', '+1%']]
  },
  fever: {
    title: 'Fever',
    value: '36.8',
    unit: '°C',
    status: 'No fever',
    stats: [['Previous', '36.7°C'], ['Average', '36.8°C'], ['Check', 'Sample']],
    description: 'Temperature thresholds depend on age, measurement method, and symptoms. This demo cannot diagnose or rule out illness.',
    history: [['36.8°C', 'Today', 'Normal'], ['36.7°C', 'Yesterday', 'Normal'], ['36.9°C', '2 days ago', 'Normal'], ['36.8°C', '3 days ago', 'Normal']]
  },
  pregnancy: {
    title: 'Pregnancy',
    value: '12',
    unit: 'weeks',
    status: 'Sample',
    stats: [['Trimester', 'First'], ['Next visit', 'Ask your clinic'], ['Tracking', 'Demo']],
    description: 'Pregnancy timelines and care needs are individual. Use this demo for tracking only, and follow advice from your maternity-care team.',
    history: [['Week 12', 'Current sample', 'Tracking'], ['Week 11', 'Previous sample', 'Tracking'], ['Week 10', '2 weeks ago', 'Tracking'], ['Week 9', '3 weeks ago', 'Tracking']]
  },
  hydration: {
    title: 'Hydration',
    value: '2.1',
    unit: 'L',
    status: 'Goal met',
    stats: [['Goal', '2.0 L'], ['Remaining', '0 L'], ['Entries', 'Sample']],
    description: 'Hydration needs vary with health, activity, climate, and clinician advice. This demo does not track real intake.',
    history: [['2.1 L', 'Today', 'Goal met'], ['1.8 L', 'Yesterday', '90%'], ['2.0 L', '2 days ago', 'Goal met'], ['1.6 L', '3 days ago', '80%']]
  },
  stress: {
    title: 'Stress',
    value: '22',
    unit: '%',
    status: 'Calm',
    stats: [['Check-ins', '2 today'], ['Trend', 'Steady'], ['Tracking', 'Sample']],
    description: 'A stress score is only a self-tracking prompt, not a clinical assessment. Consider taking a break or reaching out for support when needed.',
    history: [['22%', 'Today', 'Calm'], ['28%', 'Yesterday', 'Lower'], ['25%', '2 days ago', 'Steady'], ['31%', '3 days ago', 'Lower']]
  },
  coach: {
    title: 'AI Coach',
    value: 'Daily',
    unit: 'plan',
    status: 'Demo',
    stats: [['Movement', 'Take a walk'], ['Rest', 'Keep a routine'], ['Hydration', 'Check in']],
    description: 'This sample plan is general wellness content, not personalized medical guidance. PulseCare does not connect to an AI service in this demo.',
    history: [['Daily plan viewed', 'Today', 'Sample'], ['Rest reminder', 'Yesterday', 'Sample'], ['Movement prompt', '2 days ago', 'Sample'], ['Hydration prompt', '3 days ago', 'Sample']]
  },
  dictation: {
    title: 'Voice Dictation',
    value: '2',
    unit: 'sample notes',
    status: 'Demo',
    stats: [['Saved notes', '2'], ['Last note', 'Yesterday'], ['Microphone', 'Not connected']],
    description: 'Voice recording and note saving are not connected in this demo. Avoid entering sensitive health information.',
    history: [['Wellness note', 'Yesterday', 'Sample'], ['Check-in note', '2 days ago', 'Sample']]
  },
  cycle: {
    title: 'Cycle',
    value: '28',
    unit: 'days',
    status: 'Sample',
    stats: [['Last cycle', 'Sample'], ['Next estimate', 'Not set'], ['Tracking', 'Demo']],
    description: 'Cycle patterns vary and estimates are not contraception or a diagnosis. This demo does not store personal cycle data.',
    history: [['28-day cycle', 'Current sample', 'Estimate'], ['29-day cycle', 'Previous sample', 'Recorded'], ['27-day cycle', '2 cycles ago', 'Recorded'], ['28-day cycle', '3 cycles ago', 'Recorded']]
  },
  'walk-time': {
    title: 'Walk Time',
    value: '42',
    unit: 'min',
    status: 'Active',
    stats: [['Goal', '30 min'], ['Steps', '8,420'], ['Average', '38 min']],
    description: 'Daily movement can support wellbeing. Adjust activity to your abilities and follow any guidance from your healthcare professional.',
    history: [['42 min', 'Today', 'Active'], ['38 min', 'Yesterday', '+4 min'], ['35 min', '2 days ago', '+7 min'], ['40 min', '3 days ago', '+2 min']]
  },
  'sleeping-time': {
    title: 'Sleeping Time',
    value: '7.8',
    unit: 'h',
    status: 'Rested',
    stats: [['Goal', '8.0 h'], ['Average', '7.4 h'], ['Sleep days', '6 this week']],
    description: 'Sleep needs differ between people and across life stages. These values are sample data for the interface.',
    history: [['7.8 h', 'Today', 'Good'], ['7.5 h', 'Yesterday', '+0.3 h'], ['7.2 h', '2 days ago', '+0.6 h'], ['6.9 h', '3 days ago', '+0.9 h']]
  },
  'running-time': {
    title: 'Running Time',
    value: '24',
    unit: 'min',
    status: 'Strong',
    stats: [['Goal', '20 min'], ['Distance', '3.2 km'], ['This week', '4 runs']],
    description: 'Running totals are sample values. Choose an activity level that is appropriate for you and stop if you feel unwell.',
    history: [['24 min', 'Today', 'Completed'], ['20 min', 'Yesterday', 'Completed'], ['18 min', '2 days ago', 'Completed'], ['22 min', '3 days ago', 'Completed']]
  }
};

function renderMetricPage() {
  const shell = document.querySelector('.phone-shell');
  if (!shell || !document.body.classList.contains('detail-page')) return;

  const params = new URLSearchParams(location.search);
  const legacyPage = location.pathname.split('/').pop().replace(/\.html$/, '');
  const legacyHistory = legacyPage.endsWith('-history');
  const legacyMetric = legacyHistory ? legacyPage.slice(0, -'-history'.length) : legacyPage;
  const metricId = params.get('metric') || legacyMetric;
  const metric = metricData[metricId];
  const view = params.get('view') === 'history' || (params.get('view') !== 'overview' && legacyHistory)
    ? 'history'
    : 'overview';

  if (!metric) {
    document.title = 'Metric not found | PulseCare';
    shell.innerHTML = `
      <div class="notch"></div>
      <header class="detail-header">
        <a class="back-btn" href="../index.html" aria-label="Back to dashboard">←</a>
        <div><p class="eyebrow">PulseCare</p><h1>Metric not found</h1></div>
        <span class="status-tag">Unavailable</span>
      </header>
      <main class="detail-body"><section class="detail-card"><div class="detail-copy">
        <p>This metric could not be opened. Return to the dashboard and choose a listed metric.</p>
      </div></section></main>`;
    return;
  }

  const detailUrl = (targetView) => `detail.html?metric=${encodeURIComponent(metricId)}&view=${targetView}`;
  document.title = `${metric.title}${view === 'history' ? ' History' : ''} | PulseCare`;

  const stats = metric.stats.map(([label, value]) => `
    <div class="mini-reading"><label>${label}</label><strong>${value}</strong></div>`).join('');
  const content = view === 'history'
    ? `<section class="history-card">
        <h3>Recent history <small class="sample-note">Sample data</small></h3>
        <ul class="history-list">${metric.history.map(([value, date, trend]) => `
          <li class="history-item">
            <div class="meta"><strong>${value}</strong><time>${date}</time></div>
            <span class="trend up">${trend}</span>
          </li>`).join('')}
        </ul>
      </section>`
    : `<section class="metric-summary">
        <h3>Overview <small class="sample-note">Sample data</small></h3>
        <div class="summary-grid">${metric.stats.map(([label, value]) => `
          <div class="kpi-box"><span class="kpi-label">${label}</span><strong>${value}</strong></div>`).join('')}
        </div>
      </section>
      <section class="detail-card"><div class="detail-copy"><p>${metric.description}</p></div></section>`;

  shell.innerHTML = `
    <div class="notch"></div>
    <header class="detail-header">
      <a class="back-btn" href="../index.html" aria-label="Back to dashboard">←</a>
      <div><p class="eyebrow">Health check</p><h1>${metric.title}</h1></div>
      <span class="status-tag">${metric.status}</span>
    </header>
    <main class="detail-body">
      <section class="metric-highlight">
        <div class="highlight-ring"><div><strong>${metric.value}</strong><small>${view === 'history' ? 'sample history' : metric.unit}</small></div></div>
        <div class="mini-readings">${stats}</div>
      </section>
      <nav class="action-tabs" aria-label="Metric navigation">
        <a class="tab ${view === 'overview' ? 'active' : ''}" href="${detailUrl('overview')}">Overview</a>
        <a class="tab ${view === 'history' ? 'active' : ''}" href="${detailUrl('history')}">History</a>
      </nav>
      ${content}
    </main>`;
}

renderMetricPage();

function initThemePicker() {
  const shell = document.querySelector('.phone-shell');
  if (!shell) return;

  const themes = [
    { id: 'classic', label: 'Classic', description: 'Warm orange and cream' },
    { id: 'midnight', label: 'Midnight', description: 'Black and dark gray' },
    { id: 'vibrant', label: 'Vibrant', description: 'Colorful violet and pink' },
    { id: 'ocean', label: 'Ocean', description: 'Cool blue and teal' }
  ];
  const storageKey = 'pulsecare.theme';
  const picker = document.createElement('details');
  picker.className = 'theme-picker';
  const summary = document.createElement('summary');
  summary.setAttribute('aria-label', 'Choose appearance theme');
  summary.innerHTML = '<span aria-hidden="true">◐</span><span>Theme</span>';
  const options = document.createElement('div');
  options.className = 'theme-options';
  options.setAttribute('role', 'group');
  options.setAttribute('aria-label', 'Appearance themes');
  const status = document.createElement('span');
  status.className = 'theme-status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  picker.append(summary, options, status);
  const notch = shell.querySelector('.notch');
  if (notch) notch.after(picker);
  else shell.prepend(picker);

  let selectedTheme = 'classic';
  try {
    const savedTheme = localStorage.getItem(storageKey);
    if (themes.some((theme) => theme.id === savedTheme)) selectedTheme = savedTheme;
  } catch (error) {
    status.textContent = `Theme preference could not be loaded: ${error.message}`;
  }

  function applyTheme(themeId) {
    document.documentElement.dataset.theme = themeId;
    selectedTheme = themeId;
    options.querySelectorAll('button').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.theme === themeId));
    });
    try {
      localStorage.setItem(storageKey, themeId);
      status.textContent = `${themes.find((theme) => theme.id === themeId).label} theme selected.`;
    } catch (error) {
      status.textContent = `Theme changed, but could not be saved: ${error.message}`;
    }
  }

  themes.forEach((theme) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'theme-option';
    button.dataset.theme = theme.id;
    button.setAttribute('aria-label', `${theme.label}: ${theme.description}`);
    button.title = theme.description;
    const swatch = document.createElement('span');
    swatch.className = 'theme-swatch';
    swatch.setAttribute('aria-hidden', 'true');
    const label = document.createElement('span');
    label.textContent = theme.label;
    button.append(swatch, label);
    button.addEventListener('click', () => applyTheme(theme.id));
    options.append(button);
  });

  applyTheme(selectedTheme);
}

initThemePicker();

function initFindCarePage() {
  const form = document.getElementById('carePlanForm');
  if (!form) return;

  const specialties = [
    { id: 'family-medicine', title: 'Family medicine', icon: '👩‍⚕️', description: 'Primary care for routine check-ups, prevention, and common health concerns across ages.' },
    { id: 'internal-medicine', title: 'Internal medicine', icon: '🩺', description: 'Adult health, preventive care, and ongoing management of complex conditions.' },
    { id: 'pediatrics', title: 'Pediatrics', icon: '🧸', description: 'Health, growth, development, and preventive care for infants, children, and teens.' },
    { id: 'cardiology', title: 'Cardiology', icon: '🫀', description: 'Heart and blood-vessel health, including evaluation and ongoing cardiac care.' },
    { id: 'dermatology', title: 'Dermatology', icon: '🧴', description: 'Skin, hair, and nail conditions, including skin checks and treatment options.' },
    { id: 'endocrinology', title: 'Endocrinology', icon: '⚖️', description: 'Hormone and gland conditions, including thyroid and diabetes care.' },
    { id: 'ob-gyn', title: 'Obstetrics & gynecology', icon: '🌷', description: 'Reproductive health, pregnancy care, and gynecologic check-ups.' },
    { id: 'orthopedics', title: 'Orthopedics', icon: '🦴', description: 'Bone, joint, muscle, and movement concerns, including injuries.' },
    { id: 'neurology', title: 'Neurology', icon: '🧠', description: 'Conditions involving the brain, spinal cord, and nerves.' },
    { id: 'ophthalmology', title: 'Ophthalmology', icon: '👁️', description: 'Medical and surgical care for eyes and vision.' },
    { id: 'psychiatry', title: 'Psychiatry', icon: '💬', description: 'Medical assessment and treatment of mental-health conditions.' },
    { id: 'dentistry', title: 'Dentistry', icon: '🦷', description: 'Oral health, preventive dental visits, and treatment of teeth and gums.' }
  ];
  const specialtySelect = document.getElementById('careSpecialty');
  const specialtyHint = document.getElementById('specialtyHint');
  const careDate = document.getElementById('careDate');
  const message = document.getElementById('carePlanMessage');
  const grid = document.getElementById('specialtyGrid');

  specialties.forEach((specialty) => {
    const option = document.createElement('option');
    option.value = specialty.id;
    option.textContent = specialty.title;
    specialtySelect.append(option);

    const card = document.createElement('article');
    card.className = 'specialty-card';
    const icon = document.createElement('span');
    icon.className = 'specialty-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = specialty.icon;
    const title = document.createElement('h3');
    title.textContent = specialty.title;
    const description = document.createElement('p');
    description.textContent = specialty.description;
    const choose = document.createElement('button');
    choose.type = 'button';
    choose.className = 'specialty-choose';
    choose.textContent = 'Plan a visit';
    choose.setAttribute('aria-label', `Plan a visit with ${specialty.title}`);
    choose.addEventListener('click', () => {
      specialtySelect.value = specialty.id;
      specialtySelect.dispatchEvent(new Event('change'));
      document.getElementById('plannerHeading').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    card.append(icon, title, description, choose);
    grid.append(card);
  });

  function updateSpecialtyHint() {
    const selected = specialties.find((specialty) => specialty.id === specialtySelect.value);
    specialtyHint.textContent = selected ? selected.description : '';
  }

  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  careDate.min = todayKey;
  const suggestedDate = new Date(today);
  suggestedDate.setDate(today.getDate() + 1);
  careDate.value = `${suggestedDate.getFullYear()}-${String(suggestedDate.getMonth() + 1).padStart(2, '0')}-${String(suggestedDate.getDate()).padStart(2, '0')}`;
  form.elements.time.value = '09:00';
  updateSpecialtyHint();
  specialtySelect.addEventListener('change', updateSpecialtyHint);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const selected = specialties.find((specialty) => specialty.id === data.get('specialty'));
    const date = String(data.get('date') || '');
    const time = String(data.get('time') || '');
    if (!selected || !date || !time) {
      message.textContent = 'Choose a specialty, date, and time to continue.';
      message.classList.add('error');
      return;
    }

    const [year, month, day] = date.split('-').map(Number);
    const [hour, minute] = time.split(':').map(Number);
    const plannedAt = new Date(year, month - 1, day, hour, minute);
    if (!Number.isFinite(plannedAt.getTime()) || plannedAt.getTime() <= Date.now()) {
      message.textContent = 'Choose a future date and time.';
      message.classList.add('error');
      return;
    }

    const params = new URLSearchParams({
      type: 'meeting',
      title: `${String(data.get('purpose'))} — ${selected.title}`,
      date,
      time,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
      location: String(data.get('location') || '').trim(),
      reminderMinutes: '60'
    });
    window.location.assign(`schedule.html?${params.toString()}`);
  });
}

initFindCarePage();

const pills = document.querySelectorAll('.tool-pill');
pills.forEach((pill) => {
  pill.addEventListener('click', () => {
    pills.forEach((item) => item.classList.remove('active'));
    pill.classList.add('active');
  });
});

function initSchedulePage() {
  const form = document.getElementById('scheduleForm');
  if (!form) return;

  const worldObservances = [
    { date: '01-01', title: "New Year's Day", scope: 'Observed in many countries; local traditions vary.' },
    { date: '02-14', title: "Valentine's Day", scope: 'A cultural observance celebrated in many parts of the world.' },
    { date: '03-08', title: 'International Women’s Day', scope: 'A global day recognizing women’s achievements and equality.' },
    { date: '03-20', title: 'International Day of Happiness', scope: 'A United Nations international observance.' },
    { date: '03-21', title: 'World Down Syndrome Day', scope: 'A global awareness day recognized by the United Nations.' },
    { date: '04-07', title: 'World Health Day', scope: 'A World Health Organization global health awareness day.' },
    { date: '04-22', title: 'Earth Day', scope: 'A worldwide environmental awareness day.' },
    { date: '05-01', title: 'International Workers’ Day', scope: 'Observed in many countries; local names and status vary.' },
    { date: '05-12', title: 'International Nurses Day', scope: 'An international recognition of nurses and nursing.' },
    { date: '05-20', title: 'World Bee Day', scope: 'A United Nations observance supporting pollinator awareness.' },
    { date: '06-05', title: 'World Environment Day', scope: 'A United Nations-led global environmental observance.' },
    { date: '06-08', title: 'World Oceans Day', scope: 'A worldwide day for ocean awareness and action.' },
    { date: '07-11', title: 'World Population Day', scope: 'A United Nations observance focused on population issues.' },
    { date: '08-12', title: 'International Youth Day', scope: 'A United Nations day recognizing youth issues and contributions.' },
    { date: '09-21', title: 'International Day of Peace', scope: 'A United Nations day dedicated to peace.' },
    { date: '10-10', title: 'World Mental Health Day', scope: 'A global mental-health awareness day.' },
    { date: '10-24', title: 'United Nations Day', scope: 'Commemorates the entry into force of the UN Charter.' },
    { date: '11-14', title: 'World Diabetes Day', scope: 'A global diabetes awareness day.' },
    { date: '11-20', title: 'World Children’s Day', scope: 'A United Nations day promoting children’s rights and wellbeing.' },
    { date: '12-01', title: 'World AIDS Day', scope: 'A worldwide day for HIV awareness and remembrance.' },
    { date: '12-03', title: 'International Day of Persons with Disabilities', scope: 'A United Nations day promoting inclusion and accessibility.' },
    { date: '12-10', title: 'Human Rights Day', scope: 'Marks the adoption of the Universal Declaration of Human Rights.' },
    { date: '12-25', title: 'Christmas Day', scope: 'A religious and cultural observance; traditions and public-holiday status vary.' }
  ];

  const eventDateInput = document.getElementById('eventDate');
  const timeZoneSelect = document.getElementById('timeZone');
  const notice = document.getElementById('scheduleNotice');
  const formMessage = document.getElementById('formMessage');
  const calendarDays = document.getElementById('calendarDays');
  const agendaList = document.getElementById('agendaList');
  const worldEventsList = document.getElementById('worldEventsList');
  const storageKey = 'pulsecare.schedule.events.v1';
  const deviceTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  const today = new Date();
  const todayKey = getDateKey(today);
  let selectedDate = todayKey;
  let visibleMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  let visibleWorldYear = today.getFullYear();
  let events = [];
  let storageAvailable = true;

  function getDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function parseDateKey(value) {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  function getWorldObservances(dateKey) {
    const monthDay = dateKey.slice(5);
    return worldObservances.filter((observance) => observance.date === monthDay);
  }

  function getDateTimeParts(date, timeZone) {
    return Object.fromEntries(new Intl.DateTimeFormat('en-CA', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    }).formatToParts(date).filter((part) => part.type !== 'literal').map((part) => [part.type, Number(part.value)]));
  }

  function localTimeInZone(dateValue, timeValue, timeZone) {
    const [year, month, day] = dateValue.split('-').map(Number);
    const [hour, minute] = timeValue.split(':').map(Number);
    const target = Date.UTC(year, month - 1, day, hour, minute);
    let timestamp = target;

    for (let attempt = 0; attempt < 4; attempt += 1) {
      const parts = getDateTimeParts(new Date(timestamp), timeZone);
      const represented = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute);
      const difference = target - represented;
      if (difference === 0) break;
      timestamp += difference;
    }

    const resolved = getDateTimeParts(new Date(timestamp), timeZone);
    if (resolved.year !== year || resolved.month !== month || resolved.day !== day
      || resolved.hour !== hour || resolved.minute !== minute) {
      throw new Error('That local time does not exist in this time zone because of a daylight-saving change. Choose another time.');
    }
    return new Date(timestamp);
  }

  function setNotice(message, isError = false) {
    notice.textContent = message;
    notice.classList.toggle('error', isError);
  }

  function saveEvents() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(events));
      storageAvailable = true;
      return true;
    } catch (error) {
      storageAvailable = false;
      setNotice(`Could not save your schedule in this browser: ${error.message}`, true);
      return false;
    }
  }

  function formatDate(date, timeZone, options) {
    return new Intl.DateTimeFormat(undefined, { ...options, timeZone }).format(date);
  }

  function formatEventTime(event) {
    const date = new Date(event.startAt);
    const meetingTime = formatDate(date, event.timeZone, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
    if (event.timeZone === deviceTimeZone) return `${meetingTime} · ${event.timeZone}`;
    const localTime = formatDate(date, deviceTimeZone, {
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short'
    });
    return `${meetingTime} · ${event.timeZone} (${localTime} your time)`;
  }

  function renderCalendar() {
    const monthLabel = new Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' }).format(visibleMonth);
    document.getElementById('calendarMonth').textContent = monthLabel;
    calendarDays.replaceChildren();

    const firstOfMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1);
    const firstCell = new Date(firstOfMonth);
    firstCell.setDate(firstCell.getDate() - ((firstCell.getDay() + 6) % 7));
    const eventDates = new Set(events.map((event) => getDateKey(new Date(event.startAt))));

    for (let index = 0; index < 42; index += 1) {
      const date = new Date(firstCell);
      date.setDate(firstCell.getDate() + index);
      const key = getDateKey(date);
      const observances = getWorldObservances(key);
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'calendar-day';
      button.textContent = String(date.getDate());
      button.setAttribute('role', 'gridcell');
      const eventLabel = observances.length ? `, ${observances.map((item) => item.title).join(', ')}` : '';
      button.setAttribute('aria-label', `${formatDate(date, deviceTimeZone, { dateStyle: 'full' })}${eventLabel}`);
      if (date.getMonth() !== visibleMonth.getMonth()) button.classList.add('muted');
      if (key === todayKey) button.classList.add('today');
      if (key === selectedDate) {
        button.classList.add('selected');
        button.setAttribute('aria-selected', 'true');
      }
      if (eventDates.has(key)) button.classList.add('has-events');
      if (observances.length) button.classList.add('has-world-events');
      button.addEventListener('click', () => {
        selectedDate = key;
        visibleMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        visibleWorldYear = date.getFullYear();
        renderCalendar();
        renderAgenda();
        renderWorldEvents();
        eventDateInput.value = key;
        updateTimezoneHelp();
      });
      calendarDays.append(button);
    }
  }

  function renderAgenda() {
    const date = parseDateKey(selectedDate);
    document.getElementById('agendaDate').textContent = new Intl.DateTimeFormat(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    }).format(date);
    const dayEvents = events.filter((event) => getDateKey(new Date(event.startAt)) === selectedDate)
      .sort((first, second) => first.startAt.localeCompare(second.startAt));
    const observances = getWorldObservances(selectedDate);
    const totalItems = dayEvents.length + observances.length;
    document.getElementById('agendaCount').textContent = `${totalItems} ${totalItems === 1 ? 'event' : 'events'}`;
    agendaList.replaceChildren();

    if (!totalItems) {
      const empty = document.createElement('p');
      empty.className = 'agenda-empty';
      empty.textContent = 'Nothing planned for this day yet.';
      agendaList.append(empty);
      return;
    }

    dayEvents.forEach((event) => {
      const card = document.createElement('article');
      card.className = `agenda-event ${event.type === 'reminder' ? 'reminder' : 'meeting'}`;
      const marker = document.createElement('span');
      marker.className = 'event-marker';
      marker.setAttribute('aria-hidden', 'true');
      const content = document.createElement('div');
      const type = document.createElement('span');
      type.className = 'event-type';
      type.textContent = event.type;
      const title = document.createElement('h3');
      title.textContent = event.title;
      const details = document.createElement('p');
      details.textContent = `${formatEventTime(event)}${event.location ? ` · ${event.location}` : ''}`;
      const reminder = document.createElement('p');
      reminder.textContent = event.reminderMinutes === 0
        ? 'Reminder at event time'
        : `Reminder ${event.reminderMinutes >= 60 ? `${event.reminderMinutes / 60} hour${event.reminderMinutes === 60 ? '' : 's'}` : `${event.reminderMinutes} min`} before`;
      content.append(type, title, details, reminder);
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'delete-event';
      remove.textContent = '×';
      remove.setAttribute('aria-label', `Delete ${event.title}`);
      remove.addEventListener('click', () => {
        events = events.filter((item) => item.id !== event.id);
        if (saveEvents()) {
          renderCalendar();
          renderAgenda();
          setNotice('Event removed from this browser.');
        }
      });
      card.append(marker, content, remove);
      agendaList.append(card);
    });

    observances.forEach((observance) => {
      const card = document.createElement('article');
      card.className = 'agenda-event world-observance';
      const marker = document.createElement('span');
      marker.className = 'event-marker';
      marker.setAttribute('aria-hidden', 'true');
      const content = document.createElement('div');
      const type = document.createElement('span');
      type.className = 'event-type';
      type.textContent = 'World observance';
      const title = document.createElement('h3');
      title.textContent = observance.title;
      const details = document.createElement('p');
      details.textContent = observance.scope;
      content.append(type, title, details);
      card.append(marker, content);
      agendaList.append(card);
    });
  }

  function renderWorldEvents() {
    document.getElementById('worldEventsYear').textContent = String(visibleWorldYear);
    worldEventsList.replaceChildren();
    worldObservances.forEach((observance) => {
      const [month, day] = observance.date.split('-').map(Number);
      const date = new Date(visibleWorldYear, month - 1, day);
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'world-observance-link';
      const dateLabel = document.createElement('span');
      dateLabel.className = 'world-event-date';
      dateLabel.textContent = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(date);
      const copy = document.createElement('span');
      copy.className = 'world-event-copy';
      const title = document.createElement('strong');
      title.textContent = observance.title;
      const description = document.createElement('small');
      description.textContent = observance.scope;
      copy.append(title, description);
      button.append(dateLabel, copy);
      button.addEventListener('click', () => {
        selectedDate = getDateKey(date);
        visibleMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        visibleWorldYear = date.getFullYear();
        eventDateInput.value = selectedDate;
        renderCalendar();
        renderAgenda();
        renderWorldEvents();
        updateTimezoneHelp();
        document.querySelector('.calendar-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      worldEventsList.append(button);
    });
  }

  function updateTimezoneHelp() {
    const dateValue = eventDateInput.value;
    const timeValue = form.elements.time.value;
    const timeZone = timeZoneSelect.value;
    const help = document.getElementById('timezoneHelp');
    if (!dateValue || !timeValue || !timeZone) {
      help.textContent = `Event time is interpreted in ${timeZone || deviceTimeZone}.`;
      return;
    }
    try {
      const instant = localTimeInZone(dateValue, timeValue, timeZone);
      const local = formatDate(instant, deviceTimeZone, {
        weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short'
      });
      help.textContent = timeZone === deviceTimeZone
        ? `This time is in your device time zone (${deviceTimeZone}).`
        : `${formatDate(instant, timeZone, { timeZoneName: 'short' })} in ${timeZone} is ${local} for you.`;
    } catch (error) {
      help.textContent = error.message;
    }
  }

  function checkReminders() {
    const now = Date.now();
    let changed = false;
    events.forEach((event) => {
      if (event.remindedAt) return;
      const dueAt = new Date(event.startAt).getTime() - event.reminderMinutes * 60_000;
      const startAt = new Date(event.startAt).getTime();
      if (dueAt > now || startAt < now - 60_000) return;

      const message = `${event.title} · ${formatEventTime(event)}`;
      if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
        try {
          new Notification(event.type === 'meeting' ? 'Meeting reminder' : 'Schedule reminder', { body: message });
        } catch (error) {
          setNotice(`A reminder is due, but the browser could not display a notification: ${error.message}`, true);
        }
      } else {
        setNotice(`Reminder due: ${message}. Enable browser notifications for alerts.`);
      }
      event.remindedAt = new Date(now).toISOString();
      changed = true;
    });
    if (changed) {
      saveEvents();
      renderCalendar();
      renderAgenda();
    }
  }

  function populateTimeZones() {
    const supportedZones = typeof Intl.supportedValuesOf === 'function'
      ? Intl.supportedValuesOf('timeZone')
      : ['Africa/Lagos', 'America/Los_Angeles', 'America/New_York', 'Asia/Dubai', 'Asia/Kolkata', 'Asia/Singapore', 'Asia/Tokyo', 'Australia/Sydney', 'Europe/London', 'Europe/Paris'];
    const zones = [...new Set([deviceTimeZone, 'UTC', ...supportedZones])].sort((first, second) => first.localeCompare(second));
    zones.forEach((zone) => {
      const option = document.createElement('option');
      option.value = zone;
      option.textContent = zone === deviceTimeZone ? `${zone} (your local time)` : zone;
      timeZoneSelect.append(option);
    });
    timeZoneSelect.value = deviceTimeZone;
  }

  function loadEvents() {
    try {
      const stored = localStorage.getItem(storageKey);
      if (!stored) return;
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed) || parsed.some((event) => !event
        || typeof event.id !== 'string'
        || typeof event.title !== 'string'
        || typeof event.date !== 'string'
        || typeof event.startAt !== 'string'
        || typeof event.timeZone !== 'string'
        || !['meeting', 'reminder'].includes(event.type)
        || !Number.isFinite(event.reminderMinutes))) {
        throw new Error('Saved schedule data is invalid.');
      }
      events = parsed;
    } catch (error) {
      storageAvailable = false;
      setNotice(`Could not load your saved schedule: ${error.message}`, true);
      form.querySelector('button[type="submit"]').disabled = true;
    }
  }

  function updateNotificationButton() {
    const button = document.getElementById('enableNotifications');
    if (typeof Notification === 'undefined') {
      button.disabled = true;
      button.textContent = 'Notifications unavailable';
      return;
    }
    if (Notification.permission === 'granted') button.textContent = 'Notifications enabled';
    if (Notification.permission === 'denied') button.textContent = 'Notifications blocked in browser settings';
  }

  populateTimeZones();
  loadEvents();
  const nextHalfHour = new Date();
  nextHalfHour.setMinutes(Math.ceil((nextHalfHour.getMinutes() + 1) / 30) * 30, 0, 0);
  eventDateInput.value = todayKey;
  form.elements.time.value = `${String(nextHalfHour.getHours()).padStart(2, '0')}:${String(nextHalfHour.getMinutes()).padStart(2, '0')}`;
  const appointmentParams = new URLSearchParams(location.search);
  const appointmentTitle = appointmentParams.get('title');
  const appointmentDate = appointmentParams.get('date');
  const appointmentTime = appointmentParams.get('time');
  const appointmentTimeZone = appointmentParams.get('timeZone');
  const appointmentDateMatches = appointmentDate && /^\d{4}-\d{2}-\d{2}$/.test(appointmentDate)
    && getDateKey(parseDateKey(appointmentDate)) === appointmentDate;
  const appointmentTimeMatches = appointmentTime && /^([01]\d|2[0-3]):[0-5]\d$/.test(appointmentTime);
  if (appointmentTitle && appointmentDateMatches && appointmentTimeMatches) {
    form.elements.type.value = appointmentParams.get('type') === 'reminder' ? 'reminder' : 'meeting';
    form.elements.title.value = appointmentTitle.slice(0, 100);
    eventDateInput.value = appointmentDate;
    form.elements.time.value = appointmentTime;
    form.elements.location.value = appointmentParams.get('location') || '';
    form.elements.reminderMinutes.value = ['0', '5', '10', '30', '60', '1440'].includes(appointmentParams.get('reminderMinutes'))
      ? appointmentParams.get('reminderMinutes')
      : '60';
    if ([...timeZoneSelect.options].some((option) => option.value === appointmentTimeZone)) {
      timeZoneSelect.value = appointmentTimeZone;
    }
    const appointmentDay = parseDateKey(appointmentDate);
    selectedDate = appointmentDate;
    visibleMonth = new Date(appointmentDay.getFullYear(), appointmentDay.getMonth(), 1);
    visibleWorldYear = appointmentDay.getFullYear();
    formMessage.textContent = 'Check-up details are ready. Review and save to add a reminder to this browser’s calendar. This does not book an appointment.';
  }
  updateNotificationButton();
  renderCalendar();
  renderAgenda();
  renderWorldEvents();
  updateTimezoneHelp();
  checkReminders();

  document.getElementById('previousMonth').addEventListener('click', () => {
    visibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1);
    visibleWorldYear = visibleMonth.getFullYear();
    renderCalendar();
    renderWorldEvents();
  });
  document.getElementById('nextMonth').addEventListener('click', () => {
    visibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1);
    visibleWorldYear = visibleMonth.getFullYear();
    renderCalendar();
    renderWorldEvents();
  });
  document.getElementById('goToToday').addEventListener('click', () => {
    selectedDate = todayKey;
    visibleMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    visibleWorldYear = today.getFullYear();
    eventDateInput.value = todayKey;
    renderCalendar();
    renderAgenda();
    renderWorldEvents();
    updateTimezoneHelp();
  });
  document.getElementById('previousWorldYear').addEventListener('click', () => {
    visibleWorldYear -= 1;
    renderWorldEvents();
  });
  document.getElementById('nextWorldYear').addEventListener('click', () => {
    visibleWorldYear += 1;
    renderWorldEvents();
  });
  eventDateInput.addEventListener('change', () => {
    if (!eventDateInput.value) return;
    selectedDate = eventDateInput.value;
    const date = parseDateKey(selectedDate);
    visibleMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    visibleWorldYear = date.getFullYear();
    renderCalendar();
    renderAgenda();
    renderWorldEvents();
    updateTimezoneHelp();
  });
  form.elements.time.addEventListener('change', updateTimezoneHelp);
  timeZoneSelect.addEventListener('change', updateTimezoneHelp);

  document.getElementById('enableNotifications').addEventListener('click', async () => {
    if (typeof Notification === 'undefined') {
      setNotice('This browser does not support notifications. Keep the schedule page open to see due reminders.', true);
      return;
    }
    try {
      const permission = await Notification.requestPermission();
      updateNotificationButton();
      setNotice(permission === 'granted'
        ? 'Browser notifications are enabled for reminders while this page is open.'
        : 'Notifications were not enabled. You can still see reminders here while the page is open.', permission !== 'granted');
    } catch (error) {
      setNotice(`Could not enable browser notifications: ${error.message}`, true);
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!storageAvailable) {
      formMessage.textContent = 'Saving is unavailable until browser storage can be used.';
      formMessage.classList.add('error');
      return;
    }
    const data = new FormData(form);
    const title = String(data.get('title') || '').trim();
    const date = String(data.get('date') || '');
    const time = String(data.get('time') || '');
    const timeZone = String(data.get('timeZone') || '');
    let startAt;

    try {
      startAt = localTimeInZone(date, time, timeZone);
    } catch (error) {
      formMessage.textContent = error.message;
      formMessage.classList.add('error');
      return;
    }
    if (startAt.getTime() <= Date.now()) {
      formMessage.textContent = 'Choose a future date and time.';
      formMessage.classList.add('error');
      return;
    }

    const eventToSave = {
      id: typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      type: String(data.get('type')),
      title,
      date: getDateKey(startAt),
      time,
      timeZone,
      startAt: startAt.toISOString(),
      location: String(data.get('location') || '').trim(),
      reminderMinutes: Number(data.get('reminderMinutes')),
      remindedAt: null
    };
    events.push(eventToSave);
    if (!saveEvents()) {
      events = events.filter((item) => item.id !== eventToSave.id);
      formMessage.textContent = 'The event could not be saved. Check browser storage availability.';
      formMessage.classList.add('error');
      return;
    }
    selectedDate = eventToSave.date;
    const selected = parseDateKey(eventToSave.date);
    visibleMonth = new Date(selected.getFullYear(), selected.getMonth(), 1);
    visibleWorldYear = selected.getFullYear();
    form.elements.title.value = '';
    form.elements.location.value = '';
    formMessage.textContent = 'Event saved in this browser.';
    formMessage.classList.remove('error');
    renderCalendar();
    renderAgenda();
    renderWorldEvents();
    if (appointmentTitle) history.replaceState(null, '', location.pathname);
    setNotice('Schedule updated. Reminder alerts require this page to remain open.');
  });

  window.setInterval(checkReminders, 15_000);
}

initSchedulePage();