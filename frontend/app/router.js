///loging with intra

function userIsAuthenticated() {
	return true;
}


if (userIsAuthenticated()) {
    window.location.href = 'index.html';
} else {
    window.location.href = 'login.html';
}