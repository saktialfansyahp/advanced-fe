const CronJob = require('cron').CronJob;
const axios = require('axios');

const job = new CronJob('* * * * *', function () {
    // Logika cron job Anda di sini
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
});

// Memulai cron job
job.start();
