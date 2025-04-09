const Queue = require('bull');
const MailService = require('../service/mail.service'); // Your mail service
const redisConfig = require('../config/redisClient'); // Redis configuration
const models = require('../models');

// Create a Bull queue for mail jobs
const mailQueue = new Queue('mailQueue', {
    redis: {
        host: redisConfig.host,
        port: redisConfig.port,
    },
});

// Process mail jobs
mailQueue.process(async (job) => {
    const { to, subject, body, template, emailSignature } = job.data;
    try {
        await MailService.sendMail({
            to,
            subject,
            body,
            template,
            emailSignature
        });
        console.log(`Mail sent to ${to}`);
    } catch (error) {
        console.error(`Failed to send mail to ${to}:`, error.message);
        throw error;
    }
});

mailQueue.on('failed', async (job, err) => {
    console.error(`Job failed for ${job.data.to}:`, err.message);
    // Log the failed job in the database
    await models.Failedjob.create({
        jobName: 'MailJob',
        data: job.data,
        error: err.message,
    });
});

module.exports = mailQueue;