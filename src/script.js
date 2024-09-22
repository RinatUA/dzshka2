const express = require('express');
const moment = require('moment');
const path = require('path');

const app = express();
const port = 8000;

app.use('/static/', express.static(path.join(__dirname, 'static'))) 

function getDate() {
    return moment().format('YYYY/MM/DD HH:mm:ss');
}

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "./templates/index.html"))
});

app.get('/date', (req, res) => {
    const currentDate = getDate();
    console.log(`дата та час: ${currentDate}`);
    res.send(`дата та час: ${currentDate}`);
});

app.listen(port, () => {
    console.log(`cервер: http://localhost:${port}`);
});