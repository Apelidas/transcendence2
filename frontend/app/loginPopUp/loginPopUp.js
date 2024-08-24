document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signupLink').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior

        // Hide login popup
        document.getElementById('loginPopUp').style.display = 'none';

        // Show signup popup
        document.getElementById('signupPopup').style.display = 'block';

        // Apply blur to the background if necessary
        toggleBlur(true);
    });

    document.getElementById('loginForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        await login();
    });
});

async function login() {
    const email = document.getElementById('EmailField').value;
    const password = document.getElementById('PasswordField').value;
    const response = await fetch(loginEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    });
    if (response.status === 200) {
        document.getElementById('loginPopUp').style.display = 'none';
        toggleBlur(false);
    } else {
        alert('Login failed. Please check your credentials.');
    }
}
