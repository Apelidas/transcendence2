document.getElementById('changePasswordForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    await changePassword();
});

async function changePassword(){
    const newPassword = document.getElementById('PasswordFieldChangePassword').value;
    const newPasswordRepeat = document.getElementById('RepeatPasswordFieldChangePassword').value;
    const submitButton = document.querySelector('#changePasswordForm button[type="submit"]');
    submitButton.disabled = true;
    if (newPassword !== newPasswordRepeat){
        alert('Passwords do not match. Please try again.');
        return;
    }
    const isSuccess = await requestPasswordChange(newPassword);
    if (isSuccess){
        alert('Password Succesfully Changed');
        closeAllPopups(true);
    }
    submitButton.disabled = false;
}