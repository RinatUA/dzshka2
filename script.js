const express = require('express');
const moment = require('moment');

const app = express();
const port = 8000;

function getDate() {
    return moment().format('YYYY/MM/DD HH:mm:ss');
}

app.get('/date', (request, response) => {
    const currentDate = getDate();
    console.log(`дата та час: ${currentDate}`);
    response.send(`дата та час: ${currentDate}`);
});

app.listen(port, () => {
    console.log(`cервер:  http://localhost:8000`);
});