//only interaction with the signup pop up

const email = document.getElementById('EmailFieldSignup');
const username = document.getElementById('UsernameFieldSignup');
const passwordSignup = document.getElementById('PasswordFieldSignup');
const repeatPassword = document.getElementById('RepeatPasswordFieldSignup');
const lengthCriteria = document.getElementById('lengthCriteria');
const uppercaseCriteria = document.getElementById('uppercaseCriteria');
const lowercaseCriteria = document.getElementById('lowercaseCriteria');
const numberCriteria = document.getElementById('numberCriteria');
const specialCharCriteria = document.getElementById('specialCharCriteria');

const passwordCriteria = {
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
};

document.getElementById('loginLink').addEventListener('click', function(event) {
	event.preventDefault(); // Prevent default anchor behavior

	// Use the globally available function to close the signup popup and open the login popup
	closeAllPopups(false);
	openPopup('login', true);
});

document.getElementById('signupForm').addEventListener('submit', async function(event) {
	event.preventDefault();
	await signup();
});

    passwordSignup.addEventListener('input', () => {
        const password = passwordSignup.value;

        passwordCriteria.length = password.length >= 8;
        passwordCriteria.uppercase = /[A-Z]/.test(password);
        passwordCriteria.lowercase = /[a-z]/.test(password);
        passwordCriteria.number = /\d/.test(password);
        passwordCriteria.specialChar = /[!@#$%^&*]/.test(password);

        updateCriteriaUI(lengthCriteria, passwordCriteria.length);
        updateCriteriaUI(uppercaseCriteria, passwordCriteria.uppercase);
        updateCriteriaUI(lowercaseCriteria, passwordCriteria.lowercase);
        updateCriteriaUI(numberCriteria, passwordCriteria.number);
        updateCriteriaUI(specialCharCriteria, passwordCriteria.specialChar);
    });

    function updateCriteriaUI(element, isValid) {
        element.classList.remove('valid', 'error');
        element.classList.add(isValid ? 'valid' : 'error');
    }

async function signup() {

    if (Object.values(passwordCriteria).includes(false)) {
        alert('Password does not meet the criteria!');
        return;
    }
    else if (passwordSignup.value !== repeatPassword.value) {
        alert('Passwords do not match. Please try again.');
        return;
    }

    const submitButton = document.querySelector('#signupForm button[type="submit"]');
    submitButton.disabled = true;
    
    const response = await signupAdapter(email.value, username.value, passwordSignup.value);

    if (response.status === 200) {
        closeAllPopups(true); // Close all popups and remove blur effect
        alert('Sign-up successful!');
        email.value = '';
        username.value = '';
        passwordSignup.value = '';
    } else if(response.status === 409){
        response.json().then( error => {
            alert(error.error);
        })
    } else {
        alert('Sign-up failed. Please try again.');
    }

    submitButton.disabled = false;
}
