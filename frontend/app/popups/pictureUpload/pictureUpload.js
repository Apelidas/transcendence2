
const PictureEndpoint = 'http://127.0.0.1:8000/profile/upload-picture'
document.getElementById('file-upload-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    await readImage();
});

async function readImage(){
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (!file){
        alert('Cannot read file. Please change it and try again');
        return;
    }
    if(!isValidProfilePicture(file.type)){
        alert('Wrong file type. Please change it and try again');
        return;
    }
    try{

     await sendImagetoBackend(file);
    }
    catch (e) {
        alert(e);
        return;
    }
    closeAllPopups(true);
    alert('image changed succsefully');
}
async function sendImagetoBackend(image){
    const formdata = new FormData();
    formdata.append('file', image);
    const accessToken = getCookie('access_token');
    const options = {
        method: 'PUT',
        headers: {
            'AUTHORIZATION': `Bearer ${accessToken}`
        },
        body: formdata,
        credentials: 'include'
    };
    const response = await fetch(PictureEndpoint, options);

    if (!response.ok) {
        throw new Error(`Failed to upload image: ${response.statusText}`);
    }
    alert('Image succesfully changed');
    closeAllPopups(true);
}

function isValidProfilePicture(file) {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/bmp", "image/svg+xml"];
    return allowedTypes.includes(file.type);
}