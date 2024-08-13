const Endpoint = 'http://127.0.0.1:8000/login/'

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    await login();
});

async function login(){
    const email = document.getElementById('EmailField').value;
    const password = document.getElementById('PasswordField').value;
    const response = await fetch(Endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password})
    });
    if (response.status === 200){
        const data = await response.json();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        document.getElementById('loginPopup').style.display = 'none';
        toggleBlur();

    }
    else{
        alert('FAILURE');
    }

}