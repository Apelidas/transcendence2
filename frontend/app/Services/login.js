const Endpoint = 'http://127.0.0.1:8000/login/'

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    console.log('Form submitted');
    event.preventDefault();
    await login();
});

async function login(){
    const email = document.getElementById('EmailField').value;
    const password = document.getElementById('PasswordField').value;
    console.log('email: ', email);
    console.log('password: ', password);
    const response = await fetch(Endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password})
    });

    console.log('status: ', response.status);
    if (response.status === 200){
        alert('SUCCESS');
    }
    else{
        alert('FAILURE')
    }

}