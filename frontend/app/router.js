///loging with intra

function userIsAuthenticated() {
	return false;
}


if (userIsAuthenticated()) {
    window.location.href = 'index.html';
} else {
    window.location.href = 'login.html';
}