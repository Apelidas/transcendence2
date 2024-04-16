const express = require('express');
const app = express();
const port = 4242;

app.use(express.static('app'));

app.listen(port, () => {
    console.log(`Server now listens at http://localhost:${port}`);
})

module.exports = {
    testing
};

function testing(){
    return true;
}