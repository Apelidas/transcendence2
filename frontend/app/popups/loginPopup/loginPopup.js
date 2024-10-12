//only interaction with the login pop up
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('signupLink').addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor behavior

            // Use the globally available function to close the login popup and open the login popup
            closeAllPopups(false);
            openPopup('signup', true);
        });

        document.getElementById('loginForm').addEventListener('submit', async function(event) {
            event.preventDefault();
            alert('Button clicked');
            await login(event);
        });
    });

    async function login(event) {
        const email = document.getElementById('EmailField').value;
        const password = document.getElementById('PasswordField').value;

        const submitButton = document.querySelector('#loginForm button[type="submit"]');
        submitButton.disabled = true;

        const isSuccess = await loginAdapter(email, password);

        if (isSuccess) {
            closeAllPopups(true); // Close all popups and remove blur effect
            alert('Login successful!');
            const loggedInEvent = new CustomEvent('loggedIn');
            document.dispatchEvent(loggedInEvent);
        } else {
            alert('Login failed. Please try again.');
        }
        if (event) {
            event.preventDefault();
        }
        submitButton.disabled = false;
    }
