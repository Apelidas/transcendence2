document.addEventListener('DOMContentLoaded', () => {
    const sections = {
        homepage: document.querySelector('.homepage'),
        pongGame: document.getElementById('pongGame'),
        rpsGame: document.getElementById('rpsGame'),
        profilePage: document.getElementById('profilePage'),
        signupPage: document.getElementById('signupPage')
    };

    const overlay = document.getElementById('overlay');

    // Function to show the appropriate game section and hide others
    function showGameSection(game) {
        Object.values(sections).forEach(section => section.style.display = 'none');
        if (sections[`${game}Game`]) {
            sections[`${game}Game`].style.display = 'block';
        } else if (sections[`${game}Page`]) {
            sections[`${game}Page`].style.display = 'block';
        }
        toggleBlur(false);
    }

	function closePopup(popupId) {
		const popup = document.getElementById(popupId);
		if (popup) {
			popup.style.display = 'none';
			toggleBlur(false);
		}
	}
	
	function openPopup(popupId) {
		const popup = document.getElementById(popupId);
		if (popup) {
			popup.style.display = 'block';
			toggleBlur(true);
		}
	}

    // Common toggleBlur function to be used across different modules
    function toggleBlur(shouldBlur) {
        const mainContent = document.getElementById('mainContent');
        if (shouldBlur) {
            mainContent.classList.add('blurred');
            overlay.style.display = 'block';  // Show overlay
        } else {
            mainContent.classList.remove('blurred');
            overlay.style.display = 'none';  // Hide overlay
        }
    }
	
	// Common function to show alerts
    function showAlert(message, type = 'info') {
		//console.log(`${type}: ${message}`);
        alert(message);
    }
	
	// Export functions to be used in other scripts
    window.toggleBlur = toggleBlur;
    window.showGameSection = showGameSection;
    window.showAlert = showAlert;
});
