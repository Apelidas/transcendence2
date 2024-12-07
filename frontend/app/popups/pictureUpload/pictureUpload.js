

async function sendImagetoBackend(image){
    const formdata = new FormData();
    formdata.append(image);
    const accessToken = getCookie('access_token');
    const options = {
        method: 'PUT',
        headers: {
            'AUTHORIZATION': `Bearer ${accessToken}`
        },
        body: formdata,
        credentials: 'include'
    };
    const response = await fetch('', options);
}