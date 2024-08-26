// profile.js

document.addEventListener('DOMContentLoaded', function () {
    // Example data fetching or setting for profile
    const profileName = document.getElementById('profileName');
    const profilePicture = document.getElementById('profilePicture');
    
    // Example: Set profile name from localStorage or a session
    const name = localStorage.getItem('username') || 'User';
    profileName.textContent = name;

    // Example: Set profile picture (you can update this with actual logic)
    const profilePicUrl = localStorage.getItem('profilePicUrl') || '../assets/default-profile.png';
    profilePicture.src = profilePicUrl;

    // Fetch and display stats (these would typically be fetched from a backend service)
    document.getElementById('pvpWins').textContent = localStorage.getItem('pvpWins') || 0;
    document.getElementById('pvpLoses').textContent = localStorage.getItem('pvpLoses') || 0;
    document.getElementById('pvpStreak').textContent = localStorage.getItem('pvpStreak') || 0;
    document.getElementById('aiWins').textContent = localStorage.getItem('aiWins') || 0;
    document.getElementById('aiLoses').textContent = localStorage.getItem('aiLoses') || 0;
    document.getElementById('aiStreak').textContent = localStorage.getItem('aiStreak') || 0;
    document.getElementById('tournamentWins').textContent = localStorage.getItem('tournamentWins') || 0;
    document.getElementById('tournamentLoses').textContent = localStorage.getItem('tournamentLoses') || 0;
    document.getElementById('tournamentStreak').textContent = localStorage.getItem('tournamentStreak') || 0;
    document.getElementById('rpsWins').textContent = localStorage.getItem('rpsWins') || 0;
    document.getElementById('rpsLoses').textContent = localStorage.getItem('rpsLoses') || 0;
    document.getElementById('rpsStreak').textContent = localStorage.getItem('rpsStreak') || 0;

    // Handle button clicks for profile actions
    document.getElementById('changeEmailButton').addEventListener('click', function () {
        alert('Change Email functionality here');
    });

    document.getElementById('changePasswordButton').addEventListener('click', function () {
        alert('Change Password functionality here');
    });

    document.getElementById('changeAliasButton').addEventListener('click', function () {
        alert('Change Alias functionality here');
    });

    // Update the navbar after login
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
    const userGreeting = document.getElementById('userGreeting');
    const tournamentButton = document.getElementById('tournamentButton');
    const profileButton = document.getElementById('viewProfileButton');  // Updated to use `viewProfileButton`

    loginButton.style.display = 'none';
    signupButton.style.display = 'none';
    userGreeting.style.display = 'block';
    tournamentButton.classList.remove('d-none');
    profileButton.classList.remove('d-none');

    // Log out button functionality
    const logoutButton = document.createElement('button');
    logoutButton.className = 'btn btn-danger nav-link';
    logoutButton.textContent = 'Log Out';
    logoutButton.addEventListener('click', function () {
        // Clear session or localStorage as needed
        localStorage.clear();
        window.location.reload();
    });

    const navLinks = document.getElementById('navLinks');
    navLinks.appendChild(logoutButton);
});
