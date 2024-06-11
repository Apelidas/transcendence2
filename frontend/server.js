const express = require('express');
const app = express();
const path = require('path');
const port = 4242;

app.use(express.static('app'));


//app.get('/signup', (request, response) => {
//    response.send('This is the signup page');
//});

//app.get('/login', (request, response) => {
//    response.sendFile(path.join(__dirname, 'app/pages/login/login.html'));
//});
app.listen(port, () => {
    console.log(`Server now listens at http://localhost:${port}`);
})

module.exports = {
    testing
};

function testing(){
    return true;
}