// Toggle password visibility
function togglePassword(fieldId) {
    const input = document.getElementById(fieldId);
    const type = input.type === 'password' ? 'text' : 'password';
    input.type = type;
}

const form = document.getElementById('form');
const message = document.getElementById('message');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    message.textContent = '';
    message.style.color = '#ffcccc';

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPassword').value;
    const remember = document.getElementById('remember').checked;

    // Basic validation
    if (!username || !email || !password || !confirm) {
        message.textContent = 'Please fill all fields';
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        message.textContent = 'Enter a valid email';
        return;
    }

    if (password.length < 8) {
        message.textContent = 'Password must be 8+ characters';
        return;
    }

    if (password !== confirm) {
        message.textContent = 'Passwords do not match';
        return;
    }

    // Save if remember checked
    if (remember) {
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
    }

    message.textContent = 'Account created successfully!';
    message.style.color = '#6bcb77';

    setTimeout(() => {
        form.reset();
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        message.textContent = '';
    }, 2000);
});