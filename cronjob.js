const CronJob = require('cron').CronJob;

const job = new CronJob('* * * * *', function() {
  // Logika cron job Anda di sini
  console.log('Cron job berjalan!');
});

// Memulai cron job
job.start();
