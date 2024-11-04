// nur endpoint communication or communication to the outside

const signupEndpoint = 'http://127.0.0.1:8000/signup/'

async function signupAdapter(email, username, password) {
    try {
        const response = await fetch(signupEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username, password }),
        });
        return response.status === 200;
    } catch (error) {
		return false;
	}
}