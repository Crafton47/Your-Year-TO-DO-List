// DOM Elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');
const loginError = document.getElementById('login-error');
const registerError = document.getElementById('register-error');

// Toggle between login and register forms
showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    loginError.textContent = '';
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    registerError.textContent = '';
});

// Handle Login
document.getElementById('login-btn').addEventListener('click', async () => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = '';
    
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            window.location.href = '/';
        } else {
            errorMessage.textContent = data.error || 'Login failed';
        }
    } catch (error) {
        errorMessage.textContent = 'An error occurred. Please try again.';
    }
});

// Handle Register
document.getElementById('register-btn').addEventListener('click', async () => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = '';
    
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    if (password.length < 6) {
        errorMessage.textContent = 'Password must be at least 6 characters';
        return;
    }
    
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ username, email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            window.location.href = '/';
        } else {
            errorMessage.textContent = data.error || 'Registration failed';
        }
    } catch (error) {
        errorMessage.textContent = 'An error occurred. Please try again.';
    }
});

// Check if already logged in on page load
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/auth/check', { credentials: 'include' });
        const data = await response.json();
        
        if (data.logged_in) {
            window.location.href = '/';
        }
    } catch (error) {
        console.error('Auth check failed:', error);
    }
});
