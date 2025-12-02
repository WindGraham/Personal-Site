// Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const siteNav = document.getElementById('site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
    const isExpanded = siteNav.classList.contains('open');
    navToggle.setAttribute('aria-expanded', isExpanded);
    
    // Animate hamburger icon
    const spans = navToggle.querySelectorAll('span');
    if (isExpanded) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
}

// Simple Search
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');

if (searchInput && resultsContainer) {
  let searchIndex = [];

  fetch('/search.json')
    .then(response => response.json())
    .then(data => {
      searchIndex = data;
    });

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    resultsContainer.innerHTML = '';

    if (query.length > 0) {
      const results = searchIndex.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.tags.toLowerCase().includes(query)
      );

      results.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${item.url}">${item.title}</a> <small>(${item.date})</small>`;
        resultsContainer.appendChild(li);
      });
    }
  });
}

// Theme toggle: light / dark
const themeToggle = document.getElementById('theme-toggle');

const THEME_KEY = 'wind-theme';

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
  } else {
    document.body.setAttribute('data-theme', 'light');
  }
}

function detectInitialTheme() {
  const saved = window.localStorage.getItem(THEME_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  // Fallback to system preference
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

if (themeToggle) {
  let currentTheme = detectInitialTheme();
  applyTheme(currentTheme);

  themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(currentTheme);
    window.localStorage.setItem(THEME_KEY, currentTheme);
  });
}

// Comments board: load and submit comments via /api/comments
function renderComment(item) {
  const div = document.createElement('div');
  div.className = 'comment-item';

  const name = item.name || '匿名';
  const createdAt = item.created_at ? new Date(item.created_at) : null;
  const dateText = createdAt ? createdAt.toLocaleString() : '';

  div.innerHTML = `
    <div class="comment-header">
      <span class="comment-name">${name}</span>
      ${dateText ? `<span class="comment-date">${dateText}</span>` : ''}
    </div>
    <div class="comment-message">${(item.message || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
  `;

  return div;
}

function setupCommentsBoard() {
  const list = document.getElementById('comments-list');
  const form = document.querySelector('.comments-form');
  if (!list || !form) return;

  const nameInput = form.querySelector('#c-name');
  const emailInput = form.querySelector('#c-email');
  const messageInput = form.querySelector('#c-message');

  // Load existing comments
  fetch('/api/comments')
    .then((res) => res.json())
    .then((items) => {
      list.innerHTML = '';
      items.forEach((item) => {
        list.appendChild(renderComment(item));
      });
    })
    .catch(() => {
      // ignore errors silently
    });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = (messageInput.value || '').trim();
    if (!message) return;

    const payload = {
      name: (nameInput && nameInput.value) || '',
      email: (emailInput && emailInput.value) || '',
      message,
    };

    form.querySelector('button[type="submit"]').disabled = true;

    fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((item) => {
        // prepend new comment
        const node = renderComment(item);
        list.insertBefore(node, list.firstChild);
        messageInput.value = '';
      })
      .finally(() => {
        form.querySelector('button[type="submit"]').disabled = false;
      });
  });
}

document.addEventListener('DOMContentLoaded', setupCommentsBoard);
