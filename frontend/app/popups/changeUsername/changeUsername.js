document.getElementById('changeUsernameForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    await changeUsername();
});

async function changeUsername(){
    const newUsername = document.getElementById('UsernameFieldChangeUsername').value;
    const newUsernameRepeat = document.getElementById('RepeatUsernameFieldChangeUsername').value;
    const submitButton = document.querySelector('#changeUsernameForm button[type="submit"]');
    submitButton.disabled = true;
    if (newUsername !== newUsernameRepeat){
        alert('Usernames do not match. Please try again.');
        return;
    }
    const isSuccess = await requestUsernameChange(newUsername);
    if (isSuccess){
        alert('Username Succesfully Changed');
        closeAllPopups(true);
        setCookie('username', newUsername, 86400000);
    }
    submitButton.disabled = false;
}