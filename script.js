// script.js
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('admin-username');
const passwordInput = document.getElementById('admin-password');
const togglePassword = document.getElementById('toggle-password');
const rememberCheckbox = document.getElementById('remember-me');
const actionButton = document.getElementById('login-button');
const messageBar = document.getElementById('message-bar');

// ✅ UPDATED LOGIN CREDENTIALS
const MOCK_ADMIN_USERNAME = 'pavan';
const MOCK_ADMIN_PASSWORD = 'pavan123';

// Sanitize input
const sanitizeInput = value => {
  const sanitized = value.replace(/[<>&"'`]/g, char => {
    const map = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;',
      "'": '&#39;',
      '`': '&#96;'
    };
    return map[char] || '';
  });
  return sanitized.trim();
};

function setMessage(text, type = 'error') {
  messageBar.textContent = text;
  messageBar.className = `message-bar visible ${type}`;
}

function resetMessage() {
  messageBar.className = 'message-bar';
  messageBar.textContent = '';
}

function setLoading(isLoading) {
  actionButton.disabled = isLoading;
  actionButton.classList.toggle('loading', isLoading);
}

function showErrorShake() {
  loginForm.classList.add('shake');
  window.setTimeout(() => loginForm.classList.remove('shake'), 300);
}

function saveRememberedUser(username) {
  if (rememberCheckbox.checked) {
    localStorage.setItem('rememberedAdmin', username);
  } else {
    localStorage.removeItem('rememberedAdmin');
  }
}

function restoreRememberedUser() {
  const saved = localStorage.getItem('rememberedAdmin');
  if (saved) {
    usernameInput.value = saved;
    rememberCheckbox.checked = true;
  }
}

// Disable paste in password (optional)
passwordInput.addEventListener('paste', event => {
  event.preventDefault();
});

// Toggle password visibility
togglePassword.addEventListener('click', () => {
  const currentType = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = currentType;
  togglePassword.textContent = currentType === 'password' ? 'Show' : 'Hide';
  togglePassword.setAttribute('aria-label', `${togglePassword.textContent} password`);
});

// 🔐 LOGIN LOGIC (UPDATED)
loginForm.addEventListener('submit', async event => {
  event.preventDefault();
  resetMessage();

  const username = sanitizeInput(usernameInput.value);
  const password = sanitizeInput(passwordInput.value);

  if (!username || !password) {
    setMessage('All fields are required. Please complete the form.');
    showErrorShake();
    return;
  }

  if (password.length < 8) {
    setMessage('Password must be at least 8 characters long.');
    showErrorShake();
    return;
  }

  setLoading(true);

  // Simulate delay
  setTimeout(() => {
    if (username === MOCK_ADMIN_USERNAME && password === MOCK_ADMIN_PASSWORD) {
      saveRememberedUser(username);
      setMessage('Access granted. Redirecting...', 'success');

      setTimeout(() => {
        window.location.href = 'admin-dashboard.html';
      }, 900);
    } else {
      setLoading(false);
      setMessage('Authentication failed. Check your credentials and try again.');
      showErrorShake();
    }
  }, 700);
});

restoreRememberedUser();