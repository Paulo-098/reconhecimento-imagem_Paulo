// ═══════════════════════════════════════════════
//  TaskFlow — app.js
//  Vanilla JS | localStorage as DB
// ═══════════════════════════════════════════════

// ── DB helpers ──────────────────────────────────

const DB_KEY = 'taskflow_db';

function getDB() {
  const raw = localStorage.getItem(DB_KEY);
  if (raw) return JSON.parse(raw);
  const initial = { users: [], todos: [] };
  saveDB(initial);
  return initial;
}

function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

// ── Auth helpers ─────────────────────────────────

const SESSION_KEY = 'currentUser';

function getCurrentUser() {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

function setCurrentUser(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function clearCurrentUser() {
  localStorage.removeItem(SESSION_KEY);
}

// ── Screen router ────────────────────────────────

const screens = {
  login:     document.getElementById('screen-login'),
  register:  document.getElementById('screen-register'),
  dashboard: document.getElementById('screen-dashboard'),
};

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ── Utility ──────────────────────────────────────

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function showFeedback(elementId, textId, message) {
  const el = document.getElementById(elementId);
  if (textId) {
    const tx = document.getElementById(textId);
    tx.textContent = message;
  }
  el.classList.remove('hidden');
  el.classList.add('flex');
}

function hideFeedback(elementId) {
  const el = document.getElementById(elementId);
  el.classList.add('hidden');
  el.classList.remove('flex');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ── Login ─────────────────────────────────────────

document.getElementById('form-login').addEventListener('submit', function (e) {
  e.preventDefault();
  hideFeedback('login-error');

  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  if (!email || !password) {
    showFeedback('login-error', 'login-error-text', 'Preencha o e-mail e a senha para continuar.');
    return;
  }
  if (!isValidEmail(email)) {
    showFeedback('login-error', 'login-error-text', 'Formato de e-mail inválido.');
    return;
  }

  const db   = getDB();
  const user = db.users.find(u => u.email === email);

  if (!user) {
    showFeedback('login-error', 'login-error-text', 'E-mail não encontrado. Cadastre-se primeiro.');
    return;
  }
  if (user.password !== password) {
    showFeedback('login-error', 'login-error-text', 'Senha incorreta. Tente novamente.');
    return;
  }

  setCurrentUser({ id: user.id, name: user.name, email: user.email });
  document.getElementById('login-email').value    = '';
  document.getElementById('login-password').value = '';
  loadDashboard();
});

// ── Register ──────────────────────────────────────

document.getElementById('form-register').addEventListener('submit', function (e) {
  e.preventDefault();
  hideFeedback('reg-error');

  const name     = document.getElementById('reg-name').value.trim();
  const email    = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;

  if (!name || !email || !password) {
    showFeedback('reg-error', 'reg-error-text', 'Todos os campos são obrigatórios.');
    return;
  }
  if (!isValidEmail(email)) {
    showFeedback('reg-error', 'reg-error-text', 'Formato de e-mail inválido.');
    return;
  }
  if (password.length < 6) {
    showFeedback('reg-error', 'reg-error-text', 'A senha deve ter no mínimo 6 caracteres.');
    return;
  }

  const db = getDB();
  if (db.users.find(u => u.email === email)) {
    showFeedback('reg-error', 'reg-error-text', 'Este e-mail já está cadastrado. Faça login.');
    return;
  }

  const newUser = { id: generateId(), name, email, password };
  db.users.push(newUser);
  saveDB(db);

  showFeedback('reg-success', null, null);
  setTimeout(() => {
    hideFeedback('reg-success');
    document.getElementById('reg-name').value     = '';
    document.getElementById('reg-email').value    = '';
    document.getElementById('reg-password').value = '';
    setCurrentUser({ id: newUser.id, name: newUser.name, email: newUser.email });
    loadDashboard();
  }, 1400);
});

// ── Logout ────────────────────────────────────────

document.getElementById('btn-logout').addEventListener('click', function () {
  clearCurrentUser();
  currentFilter = 'all';
  showScreen('login');
});

// ── Navigation ────────────────────────────────────

document.getElementById('go-register').addEventListener('click', () => {
  hideFeedback('login-error');
  showScreen('register');
});

document.getElementById('go-login').addEventListener('click', () => {
  hideFeedback('reg-error');
  showScreen('login');
});

// ── Dashboard ─────────────────────────────────────

let currentFilter = 'all';

function loadDashboard() {
  const user = getCurrentUser();
  if (!user) { showScreen('login'); return; }

  // Greeting
  document.getElementById('greeting-name').textContent   = user.name.split(' ')[0];
  document.getElementById('user-name-display').textContent = user.name;
  document.getElementById('user-email-display').textContent = user.email;
  document.getElementById('user-avatar').textContent      = user.name.charAt(0).toUpperCase();

  showScreen('dashboard');
  renderTodos();
}

// ── Todos CRUD ────────────────────────────────────

/**
 * Returns all todos belonging to the current user.
 * Filtered by email (userId field stores the user's email).
 */
function getUserTodos() {
  const user = getCurrentUser();
  const db   = getDB();
  return db.todos.filter(t => t.userId === user.email);
}

/**
 * Adds a new todo to the DB for the current user.
 */
function addTodo(title, type, description) {
  const user = getCurrentUser();
  const db   = getDB();

  const todo = {
    id:          generateId(),
    userId:      user.email,          // filter key = e-mail
    title,
    type,
    description: description || '',
    done:        false,
    createdAt:   Date.now(),
  };

  db.todos.push(todo);
  saveDB(db);
  renderTodos();
}

/**
 * Marks a todo as done (irreversible in this version, per spec).
 */
function completeTodo(id) {
  const db   = getDB();
  const todo = db.todos.find(t => t.id === id);
  if (todo && !todo.done) {
    todo.done = true;
    saveDB(db);
    renderTodos();
  }
}

/**
 * Removes a todo from the DB.
 */
function deleteTodo(id) {
  const db = getDB();
  db.todos  = db.todos.filter(t => t.id !== id);
  saveDB(db);
  renderTodos();
}

// ── Add todo button ───────────────────────────────

document.getElementById('btn-add-todo').addEventListener('click', function () {
  const titleInput = document.getElementById('todo-title');
  const type       = document.getElementById('todo-type').value;
  const desc       = document.getElementById('todo-desc').value.trim();
  const title      = titleInput.value.trim();

  if (!title) {
    titleInput.style.borderColor = 'rgba(248,113,113,0.6)';
    titleInput.style.boxShadow   = '0 0 0 3px rgba(248,113,113,0.15)';
    titleInput.focus();
    setTimeout(() => {
      titleInput.style.borderColor = '';
      titleInput.style.boxShadow   = '';
    }, 1600);
    return;
  }

  addTodo(title, type, desc);
  titleInput.value = '';
  document.getElementById('todo-desc').value = '';
  titleInput.focus();
});

// Enter on title field also triggers add
document.getElementById('todo-title').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') document.getElementById('btn-add-todo').click();
});

// ── Filter tabs ───────────────────────────────────

document.querySelectorAll('.filter-tab').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    currentFilter = this.dataset.filter;
    renderTodos();
  });
});

// ── Type config ───────────────────────────────────

const TYPE_CONFIG = {
  work:     { label: 'Trabalho', badgeClass: 'badge-work',     icon: '💼' },
  personal: { label: 'Pessoal',  badgeClass: 'badge-personal', icon: '🏠' },
  study:    { label: 'Estudos',  badgeClass: 'badge-study',    icon: '📚' },
};

// ── Render ────────────────────────────────────────

function renderTodos() {
  const allTodos = getUserTodos();
  let   filtered;

  if (currentFilter === 'done')        filtered = allTodos.filter(t => t.done);
  else if (currentFilter === 'pending') filtered = allTodos.filter(t => !t.done);
  else                                  filtered = [...allTodos];

  // Sort: pending first, then by date desc (newest first inside each group)
  filtered.sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    return b.createdAt - a.createdAt;
  });

  // Stats (always from all todos, not filtered)
  const total   = allTodos.length;
  const done    = allTodos.filter(t => t.done).length;
  const pending = total - done;

  document.getElementById('stat-total').textContent   = total;
  document.getElementById('stat-done').textContent    = done;
  document.getElementById('stat-pending').textContent = pending;

  // Count badge
  const label = filtered.length === 1 ? '1 tarefa' : `${filtered.length} tarefas`;
  document.getElementById('tasks-count').textContent = label;

  const list       = document.getElementById('todo-list');
  const emptyState = document.getElementById('empty-state');

  // Empty state
  if (filtered.length === 0) {
    list.innerHTML = '';
    emptyState.classList.remove('hidden');
    const messages = {
      all:     'Nenhuma tarefa cadastrada ainda.',
      pending: 'Sem tarefas pendentes 🎉',
      done:    'Nenhuma tarefa concluída ainda.',
    };
    document.getElementById('empty-state-text').textContent =
      messages[currentFilter] || 'Nenhuma tarefa encontrada.';
    return;
  }

  emptyState.classList.add('hidden');

  list.innerHTML = filtered.map(todo => {
    const tc   = TYPE_CONFIG[todo.type] || TYPE_CONFIG['work'];
    const date = new Date(todo.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit', month: 'short'
    });

    const descHTML = todo.description
      ? `<p class="todo-desc text-xs text-slate-500 mt-1 leading-relaxed">${escapeHTML(todo.description)}</p>`
      : '';

    const completeBtn = todo.done
      ? `<button class="btn-success" disabled aria-label="Tarefa concluída">✓ Concluída</button>`
      : `<button class="btn-success btn-complete" data-id="${todo.id}" aria-label="Concluir tarefa">Concluir</button>`;

    return `
      <div class="todo-item ${todo.done ? 'done' : ''} rounded-xl px-4 py-4" data-id="${todo.id}">
        <div class="flex items-start gap-3">
          <!-- Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap mb-1">
              <span class="todo-title text-sm font-semibold text-slate-100 leading-snug">${escapeHTML(todo.title)}</span>
              <span class="text-xs font-semibold px-2 py-0.5 rounded-full ${tc.badgeClass}" style="font-size:11px;">
                ${tc.icon} ${tc.label}
              </span>
            </div>
            ${descHTML}
            <p class="text-xs text-slate-600 mt-2">${date}</p>
          </div>
          <!-- Actions -->
          <div class="flex items-center gap-2 flex-shrink-0 mt-0.5">
            ${completeBtn}
            <button
              class="btn-delete"
              data-id="${todo.id}"
              aria-label="Excluir tarefa"
              title="Excluir">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                <path d="M10 11v6"/><path d="M14 11v6"/>
                <path d="M9 6V4h6v2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Events — "Concluir"
  list.querySelectorAll('.btn-complete').forEach(btn => {
    btn.addEventListener('click', function () {
      completeTodo(this.dataset.id);
    });
  });

  // Events — Delete with slide-out animation
  list.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', function () {
      const item = this.closest('.todo-item');
      if (item) {
        item.style.transition = 'opacity 0.18s ease, transform 0.18s ease';
        item.style.opacity    = '0';
        item.style.transform  = 'translateX(16px)';
        setTimeout(() => deleteTodo(this.dataset.id), 190);
      }
    });
  });
}

// ── Bootstrap ─────────────────────────────────────

(function init() {
  const user = getCurrentUser();
  if (user) {
    loadDashboard();
  } else {
    showScreen('login');
  }
})();
