window.onload = function() {
    loadContent("header.html", "header");
    // loadContent('pages/login/login.html', 'body');
};
function loadContent(url, containerId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
                document.getElementById(containerId).innerHTML = data;
        });
}

