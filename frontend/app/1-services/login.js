// nur endpoint communication or communication to the outside

const loginEndpoint = 'http://127.0.0.1:8000/login/'

async function loginAdapter(email, password, mfaCode) {
	try {
		const response = await fetch(loginEndpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password, mfaCode})
		});
		if (response.status === 200) {
			// Parse the response body to get the data
			const data = await response.json();

			// Store the tokens in localStorage
			setCookie('access_token', data.access, 1800000);
			setCookie('refresh_token', data.refresh, 86400000);
			return true;
		} else if(response.status === 401){
			const content = await response.json();
			if (content.message === '2FA AUTH required')
				return undefined;

		} else {
			return false;
		}
	} catch (error) {
		return false;
	}
}