// nur endpoint communication or communication to the outside


async function loginAdapter(username, password, mfaCode) {
	try {
		const response = await fetch(loginEndpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password, mfaCode})
		});
		const data = await response.json();
		if (response.status === 200) {
			setCookie('username', data.username, 86400000);
			setCookie('access_token', data.access, 1800000);
			setCookie('refresh_token', data.refresh, 86400000);
			return true;
		} else if(response.status === 401){
			if (data.message === '2FA AUTH required'){
				return null;
			}
		} else {
			return data.error();
		}
	} catch (error) {
		return false;
	}
}