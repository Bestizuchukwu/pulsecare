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
