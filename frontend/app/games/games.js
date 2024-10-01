// Function to navigate to the selected game
function changeRoute(path) {
    window.history.pushState({}, '', path); // Change the URL without reloading the page
    handleRouting(); // Call the routing function to update the content
}

