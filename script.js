// ── Initial Events Data ──
let events = [
  {
    id: 1,
    name: "Tech Summit 2026",
    date: "2026-08-15",
    desc: "A gathering of top tech innovators and developers."
  },
  {
    id: 2,
    name: "Design Workshop",
    date: "2026-05-01",
    desc: "Hands-on UI/UX design workshop for beginners."
  },
  {
    id: 3,
    name: "AI Conference",
    date: "2026-09-20",
    desc: "Exploring the latest trends in artificial intelligence."
  }
];

// ── Grab DOM Elements ──
const form        = document.getElementById('eventForm');
const nameInput   = document.getElementById('eventName');
const dateInput   = document.getElementById('eventDate');
const descInput   = document.getElementById('eventDesc');
const warning     = document.getElementById('formWarning');
const eventList   = document.getElementById('eventList');
const searchInput = document.getElementById('searchInput');

// ── Set Footer Year ──
document.getElementById('year').textContent = new Date().getFullYear();

// ── Render Events ──
function renderEvents(list) {
  eventList.innerHTML = '';
  const today = new Date().toISOString().split('T')[0];

  if (list.length === 0) {
    eventList.innerHTML = '<p style="color:#999">No events found.</p>';
    return;
  }

  list.forEach(event => {
    const isPast = event.date < today;
    const card = document.createElement('div');
    card.className = 'event-card' + (isPast ? ' past' : '');

    card.innerHTML = `
      <h3>${event.name}</h3>
      <div class="date">📅 ${formatDate(event.date)}</div>
      <div class="desc">${event.desc}</div>
      <button class="btn-delete" onclick="deleteEvent(${event.id})">🗑 Delete</button>
    `;

    eventList.appendChild(card);
  });
}

// ── Format Date for Display ──
function formatDate(dateStr) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', options);
}

// ── Sort Events by Date ──
function getSortedEvents() {
  return [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
}

// ── Add Event ──
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const date = dateInput.value;
  const desc = descInput.value.trim();

  // Validation
  if (!name || !date || !desc) {
    warning.classList.remove('hidden');
    return;
  }

  warning.classList.add('hidden');

  // Create new event object
  const newEvent = {
    id: Date.now(),
    name,
    date,
    desc
  };

  events.push(newEvent);

  // Clear form
  nameInput.value = '';
  dateInput.value = '';
  descInput.value = '';

  // Re-render sorted
  renderEvents(getSortedEvents());
});

// ── Delete Event ──
function deleteEvent(id) {
  events = events.filter(e => e.id !== id);
  const query = searchInput.value.toLowerCase();
  const filtered = getSortedEvents().filter(e =>
    e.name.toLowerCase().includes(query) || e.date.includes(query)
  );
  renderEvents(filtered);
}

// ── Search / Filter ──
searchInput.addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const filtered = getSortedEvents().filter(e =>
    e.name.toLowerCase().includes(query) || e.date.includes(query)
  );
  renderEvents(filtered);
});

// ── Initial Render ──
renderEvents(getSortedEvents());