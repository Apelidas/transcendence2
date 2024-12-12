


function setupFriendsPopup(){
    setupUserlist();
    document.getElementById('addFriendButton').addEventListener('click', ()=> {
        if (!document.getElementById('usernames').value){
            alert('you need to select a user');
            return;
        }
        getAFriend();
    })
}

async function getAFriend(){
    const username = document.getElementById('usernames').value;
    const response = await makeFriend(username);
    if (response.status === 200){
        closeAllPopups(true);
        const friendsChangeEvent = new CustomEvent('friendsChange');
        emit(friendsChangeEvent);
        return ;
    }
    alert('somethingwent wrong: ' + response.body.message);
}

async function setupUserlist(){
    const usernames = await getAllUsers();
    const friendContainer = document.getElementById('usernames');

    usernames.forEach(username => {
        const option = document.createElement('option');
        option.value = username;
        option.textContent = username;
        friendContainer.appendChild(option);
    });
}
