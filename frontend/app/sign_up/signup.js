const SignupEndpoint = 'http://127.0.0.1:8000/signup/'

// TODO !!!!!
// check repeat password

document.getElementById('signupForm').addEventListener('submit', async function(event) {
    console.log("!!!!!");
    event.preventDefault();
    await signup();
});

async function signup(){
    console.log("!!!!!1234");
    const email = document.getElementById('EmailFieldSignup').value;
    const password = document.getElementById('PasswordFieldSignup').value;
    // const repeat = document.getElementById('RepeatPasswordFieldSignup').value;
    const response = await fetch(SignupEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password})
    });
    if (response.status === 200){
        document.getElementById('signupPage').style.display = 'none';
    }
    else{
        alert('FAILURE');
    }
}