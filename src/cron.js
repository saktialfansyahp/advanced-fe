const axios = require('axios');

export default function handler(req, res) {
    res.status(200).end('Hello Cron!');
    axios.get(`https://alfajri.arw.my.id/api/auth/status/reminder`)
    .then(response => {
        if (response.data.active == 1) {
            axios.get(`https://alfajri.arw.my.id/api/auth/artisan`)
                .then(response => {
                console.log(response.data)
            })
        } else {
            console.log("Reminder is nonactive\n")
        }
    })
    .catch(error => {
        console.log(error)
    });
}