const cron = require("node-cron");
cron.schedule("*/01 * * * *", async () => {
    console.log('running cron...');
});
