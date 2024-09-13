const moment = require('moment');


function getDate() {
    const superaccuratedate = moment().format('YYYY/MM/DD HH:mm:ss');

    console.log(superaccuratedate);
}


getDate();