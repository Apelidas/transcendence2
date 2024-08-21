const loginEndpoint = 'http://127.0.0.1:8000/login/';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    // Handle form submission
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        await login();
    });

    // Handle opening and closing popups using hrefs
    document.querySelectorAll('a[href="#loginPopup"]').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            openPopup('loginPopup');
        });
    });

    document.querySelectorAll('a.close').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            closePopup('loginPopup');
        });
    });

    document.querySelectorAll('a[href="#signupPopup"]').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            closePopup('loginPopup');
            openPopup('signupPopup');
        });
    });
});

async function login() {
    const email = document.getElementById('EmailField').value;
    const password = document.getElementById('PasswordField').value;
    const submitButton = document.querySelector('#loginForm button[type="submit"]');
    
    submitButton.disabled = true;

    try {
        const response = await fetch(loginEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            closePopup('loginPopup');
            showAlert('Login successful!', 'success');
        } else {
            const errorData = await response.json();
            showAlert(`Login failed: ${errorData.message || 'Invalid email or password.'}`, 'danger');
        }
    } catch (error) {
        showAlert(`Login failed: ${error.message || 'An error occurred during the login process.'}`, 'danger');
    } finally {
        submitButton.disabled = false;
    }
}

function openPopup(popupId) {
    document.getElementById(popupId).style.display = 'block';
    toggleBlur(true);
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
    toggleBlur(false);
}

function toggleBlur(shouldBlur) {
    const mainContent = document.getElementById('mainContent');
    if (shouldBlur) {
        mainContent.classList.add('blurred');
    } else {
        mainContent.classList.remove('blurred');
    }
}

function showAlert(message, type = 'info') {
    alert(`${type.toUpperCase()}: ${message}`);
}

// Export functions if needed in other scripts
window.login = login;
window.openPopup = openPopup;
window.closePopup = closePopup;
window.toggleBlur = toggleBlur;
