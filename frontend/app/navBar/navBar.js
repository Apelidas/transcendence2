document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('overlay');

    // Function to show the appropriate game section or popup based on href
    function showSectionOrPopup(event) {
        event.preventDefault();  // Prevent the default anchor behavior

        const targetId = event.target.getAttribute('href').substring(1);  // Get ID from href, removing the leading #
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            if (targetElement.classList.contains('game-section')) {
                showGameSection(targetElement);
            } else if (targetElement.classList.contains('popup')) {
                openPopup(targetElement.id);
            }
        }
    }

    // Function to show the specific game section
    function showGameSection(sectionElement) {
        const sections = document.querySelectorAll('.game-section');
        sections.forEach(section => section.style.display = 'none');  // Hide all sections
        sectionElement.style.display = 'block';  // Show the targeted section
        toggleBlur(false);
    }

    // Function to open a specific popup
    function openPopup(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.style.display = 'block';
            overlay.style.display = 'block';
            toggleBlur(true);
        }
    }

    // Function to close all popups
    function closeAllPopups() {
        const popups = document.querySelectorAll('.popup');
        popups.forEach(popup => popup.style.display = 'none');  // Hide all popups
        overlay.style.display = 'none';
        toggleBlur(false);
    }

    // Attach event listeners to navbar links
    document.querySelectorAll('.navbar-nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', showSectionOrPopup);
    });

    // Attach event listener to overlay for closing popups when clicked
    overlay.addEventListener('click', closeAllPopups);

    // Function to toggle the blur effect on the main content
    function toggleBlur(shouldBlur) {
        const mainContent = document.getElementById('mainContent');
        if (shouldBlur) {
            mainContent.classList.add('blurred');
        } else {
            mainContent.classList.remove('blurred');
        }
    }

    // Export functions to be used in other scripts if needed
    window.openPopup = openPopup;
    window.closePopup = closeAllPopups;
    window.toggleBlur = toggleBlur;
});
