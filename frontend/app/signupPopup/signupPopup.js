const signupEndpoint = 'http://127.0.0.1:8000/signup/';

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginLink').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior

        // Hide signup popup
        document.getElementById('signupPopup').style.display = 'none';

        // Show login popup
        document.getElementById('loginPopUp').style.display = 'block';

        // Apply blur to the background if necessary
        toggleBlur(true);
    });

    document.getElementById('signupForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        await signup();
    });
});

async function signup() {
    const email = document.getElementById('EmailFieldSignup').value;
    const password = document.getElementById('PasswordFieldSignup').value;
    const repeatPassword = document.getElementById('RepeatPasswordFieldSignup').value;
    
    // Check if passwords match
    if (password !== repeatPassword) {
        alert('Passwords do not match. Please try again.');
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

        if (response.status === 200) {
            document.getElementById('signupPopup').style.display = 'none';
            toggleBlur();
            alert('Sign-up successful!');
        } else {
            const errorData = await response.json();
            alert(`Sign-up failed: ${errorData.message || 'An unknown error occurred.'}`);
        }
    } catch (error) {
        alert(`Sign-up failed: ${error.message || 'An error occurred during the sign-up process.'}`);
    } finally {
        submitButton.disabled = false;
    }
}
