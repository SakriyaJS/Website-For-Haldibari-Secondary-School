const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if (username === 'admin' && password === 'H.S.S') {
    window.location.href = 'admin-dashboard.html';
  } else {
    document.getElementById('error-msg').textContent = 'Invalid username or password';
  }
});