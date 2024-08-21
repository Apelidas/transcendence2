const signupEndpoint = 'http://127.0.0.1:8000/signup/';

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');

    // Handle form submission
    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        await signup();
    });

    // Handle closing the signup popup
    document.querySelector('#signupPopup .close').addEventListener('click', (event) => {
        event.preventDefault();
        closePopup('signupPopup');
    });

    // Handle navigating to the login popup
    document.getElementById('loginLink').addEventListener('click', (event) => {
        event.preventDefault();
        closePopup('signupPopup');
        openPopup('loginPopup');
    });
});

async function signup() {
    const email = document.getElementById('EmailField').value;
    const password = document.getElementById('PasswordField').value;
    const repeatPassword = document.getElementById('RepeatPasswordField').value;

    if (password !== repeatPassword) {
        showAlert('Passwords do not match. Please try again.', 'warning');
        return;
    }

    const submitButton = document.querySelector('#signupForm button[type="submit"]');
    submitButton.disabled = true;

    try {
        const response = await fetch(signupEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            closePopup('signupPopup');
            showAlert('Sign-up successful!', 'success');
        } else {
            const errorData = await response.json();
            showAlert(`Sign-up failed: ${errorData.message || 'An unknown error occurred.'}`, 'danger');
        }
    } catch (error) {
        showAlert(`Sign-up failed: ${error.message || 'An error occurred during the sign-up process.'}`, 'danger');
    } finally {
        submitButton.disabled = false;
    }
}

// Export functions to be used in other scripts
window.signup = signup;