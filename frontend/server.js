const express = require('express');
const app = express();
const port = 4242;

app.use(express.static('app'));


app.get('/signup', (request, response) => {
    response.send('This is the signup page');
});

app.get('/login', (request, response) => {
    response.send('This is the login page');
});
app.listen(port, () => {
    console.log(`Server now listens at http://localhost:${port}`);
})

module.exports = {
    testing
};

function testing(){
    return true;
}