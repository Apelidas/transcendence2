// nur endpoint communication or communication to the outside

const loginEndpoint = 'http://127.0.0.1:8000/login/'

async function loginAdapter(email, password) {
	try {
		const response = await fetch(loginEndpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password })
		});
		if (response.status === 200){
			// Parse the response body to get the data
			const data = await response.json();

			// Store the tokens in localStorage
			localStorage.setItem('access_token', data.access);
			localStorage.setItem('refresh_token', data.refresh);
			
			return true;
		} else {
			return false;
		}
	} catch (error) {
		return false;
	}
}