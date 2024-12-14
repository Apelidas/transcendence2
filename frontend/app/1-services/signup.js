// nur endpoint communication or communication to the outside


async function signupAdapter(email, username, password) {
    try {
        const response = await fetch(signupEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username, password }),
        });
        return response;
    } catch (error) {
		return false;
	}
}