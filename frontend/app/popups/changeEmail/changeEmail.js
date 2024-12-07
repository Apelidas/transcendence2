document.getElementById('changeEmailForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    await changeEmail();
});

async function changeEmail(){
    const newEmail = document.getElementById('EmailFieldChangeEmail').value;
    const newEmailRepeat = document.getElementById('RepeatEmailFieldChangeEmail').value;
    const submitButton = document.querySelector('#changeEmailForm button[type="submit"]');
    submitButton.disabled = true;
    if (newEmail !== newEmailRepeat){
        alert('Emails do not match. Please try again.');
        return;
    }
    const isSuccess = await requestEmailChange(newEmail);
    if (isSuccess){
        alert('Email Succesfully Changed')
        closeAllPopups(true);
    }
    submitButton.disabled = false;
}