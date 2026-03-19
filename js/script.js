/* ── THEME TOGGLE ────────────────────────────────────────────────── */
(function () {
  const saved = localStorage.getItem('dp-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
})();

function initTheme() {
  const btn = document.getElementById('themeBtn');
  if (!btn) return;
  const icon = btn.querySelector('i');
  const apply = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('dp-theme', theme);
    if (icon) {
      icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
    }
  };
  apply(localStorage.getItem('dp-theme') || 'dark');
  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    apply(current === 'dark' ? 'light' : 'dark');
  });
}

/* ── ACTIVE NAV LINK ─────────────────────────────────────────────── */
function initActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ── SCROLL REVEAL ───────────────────────────────────────────────── */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
}

/* ── SKILL BARS ──────────────────────────────────────────────────── */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-fill[data-w]');
  if (!bars.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.w + '%';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => io.observe(b));
}

/* ── BACK TO TOP ─────────────────────────────────────────────────── */
function initBackTop() {
  const btn = document.getElementById('backTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── TOAST ───────────────────────────────────────────────────────── */
function showToast(msg, type = 'success') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  const icon = type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill';
  const col  = type === 'success' ? '#00e676' : '#ff5c8d';
  toast.style.borderColor = col;
  toast.style.color = col;
  toast.innerHTML = `<i class="bi ${icon}"></i> ${msg}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

/* ── FIELD VALIDATION ────────────────────────────────────────────── */
function validateField(inputId, msgId, testFn, errMsg) {
  const input = document.getElementById(inputId);
  const msg   = document.getElementById(msgId);
  if (!input || !msg) return false;
  const val = input.value;
  if (!val.trim()) {
    input.className = 'field-input';
    msg.innerHTML = '';
    msg.className = 'field-msg';
    return false;
  }
  const ok = testFn(val);
  input.className = 'field-input ' + (ok ? 'is-valid' : 'is-invalid');
  msg.className = 'field-msg ' + (ok ? 'valid' : 'invalid');
  msg.innerHTML = ok
    ? '<i class="bi bi-check-circle-fill"></i> Looks good!'
    : `<i class="bi bi-x-circle-fill"></i> ${errMsg}`;
  return ok;
}

/* ── COUNTER ─────────────────────────────────────────────────────── */
let counterVal = 0;
function adjustCounter(delta) {
  counterVal = Math.max(-99, Math.min(99, counterVal + delta));
  const el = document.getElementById('counterDisplay');
  if (el) {
    el.textContent = counterVal;
    el.style.color = counterVal > 0 ? 'var(--emerald)' : counterVal < 0 ? 'var(--rose)' : 'var(--accent)';
  }
  logOutput('counterLog', `counter = ${counterVal}  // DOM updated via JS`);
}
function resetCounter() {
  counterVal = 0;
  const el = document.getElementById('counterDisplay');
  if (el) { el.textContent = 0; el.style.color = 'var(--accent)'; }
  logOutput('counterLog', `counter = 0  // reset()`);
}

/* ── COLOR BOX DEMO ──────────────────────────────────────────────── */
function changeColor(grad) {
  const box = document.getElementById('colorBox');
  if (!box) return;
  box.style.background = grad;
  logOutput('colorLog', `element.style.background = "${grad}"`);
}
function randomColor() {
  const h1 = Math.floor(Math.random() * 360);
  const h2 = (h1 + 60) % 360;
  const grad = `linear-gradient(135deg, hsl(${h1},90%,55%), hsl(${h2},80%,50%))`;
  changeColor(grad);
}

/* ── STRING REVERSER ─────────────────────────────────────────────── */
function reverseString() {
  const input = document.getElementById('reverseInput');
  const out   = document.getElementById('reverseOutput');
  if (!input || !out) return;
  const rev = input.value.split('').reverse().join('');
  out.textContent = rev || '// Result will appear here...';
}

/* ── ARRAY DEMO ──────────────────────────────────────────────────── */
function arrayDemo(method) {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let result, code;
  switch (method) {
    case 'map':
      result = nums.map(n => n * 2);
      code = `[1..10].map(n => n * 2)\n// → [${result.join(', ')}]`;
      break;
    case 'filter':
      result = nums.filter(n => n % 2 === 0);
      code = `[1..10].filter(n => n % 2 === 0)\n// → [${result.join(', ')}] (evens)`;
      break;
    case 'reduce':
      result = nums.reduce((acc, n) => acc + n, 0);
      code = `[1..10].reduce((acc,n) => acc+n, 0)\n// → ${result} (sum)`;
      break;
    case 'find':
      result = nums.find(n => n > 6);
      code = `[1..10].find(n => n > 6)\n// → ${result} (first match)`;
      break;
  }
  logOutput('arrayOutput', code);
}

/* ── HELPER: log output ──────────────────────────────────────────── */
function logOutput(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

/* ── COPY CSS VAR ────────────────────────────────────────────────── */
function copyCSS(text) {
  navigator.clipboard.writeText(text).then(() => showToast(`Copied: ${text}`));
}

/* ── CONTACT FORM SUBMIT ─────────────────────────────────────────── */
function submitContactForm() {
  const fields = [
    ['c-fname',   v => v.trim().length >= 2,       'Name too short'],
    ['c-lname',   v => v.trim().length >= 2,       'Name too short'],
    ['c-email',   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Invalid email'],
    ['c-subject', v => v.trim().length >= 5,       'Subject too short'],
    ['c-msg',     v => v.trim().length >= 20,      'Message too short (min 20 chars)'],
  ];
  const results = fields.map(([id, fn, err]) => validateField(id, id + '-msg', fn, err));
  if (results.every(Boolean)) {
    showToast('Message sent! I\'ll get back to you soon 🚀');
    ['c-fname','c-lname','c-email','c-subject','c-msg'].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.value = ''; el.className = 'field-input'; }
      const msg = document.getElementById(id + '-msg');
      if (msg) { msg.innerHTML = ''; msg.className = 'field-msg'; }
    });
  } else {
    showToast('Please fix the errors above', 'error');
  }
}

/* ── JS VALIDATION FORM ──────────────────────────────────────────── */
function submitValidationForm() {
  const fields = [
    ['v-name',  v => v.trim().length >= 3,      'Min. 3 characters'],
    ['v-email', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Invalid email'],
    ['v-pass',  v => v.length >= 8,             'Min. 8 characters'],
    ['v-phone', v => /^\+?[\d\s\-]{10,}$/.test(v), 'Invalid phone number'],
  ];
  const results = fields.map(([id, fn, err]) => validateField(id, id + '-msg', fn, err));
  if (results.every(Boolean)) showToast('All fields valid! ✅ Great work!');
  else showToast('Fix validation errors first', 'error');
}

/* ── TYPING ANIMATION ────────────────────────────────────────────── */
function initTyping() {
  const el = document.getElementById('typedText');
  if (!el) return;
  const words = ['Frontend Magic', 'Clean Code', 'Great UX', 'Bold Ideas'];
  let wi = 0, ci = 0, deleting = false;
  const tick = () => {
    const word = words[wi];
    el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
    let delay = deleting ? 55 : 100;
    if (!deleting && ci > word.length) { delay = 1800; deleting = true; }
    else if (deleting && ci < 0) { deleting = false; ci = 0; wi = (wi + 1) % words.length; delay = 300; }
    setTimeout(tick, delay);
  };
  tick();
}

/* ── INIT ALL ────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initActiveNav();
  initScrollReveal();
  initSkillBars();
  initBackTop();
  initTyping();
});
