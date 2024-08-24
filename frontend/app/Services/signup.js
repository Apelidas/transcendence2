// nur endpoint communication or communication to the outside

const signupEndpoint = 'http://127.0.0.1:8000/signup/'

export async function signupAdapter(email, password) {

    try {
        const response = await fetch(signupEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.status === 200) {
			return true;
        } else {
			return false;
        }

    } catch (error) {
		return false;
	}
}

//export {signupAdapter};