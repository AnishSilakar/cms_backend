const mailQueue = require('../queues/mailQueue');


class MailJobService {
    addMailJob = async (to, subject, body, template, emailSignature) => {
        try {
            await mailQueue.add({ to, subject, body, template, emailSignature }, { attempts: 3, backoff: 5000 });
        } catch (error) {
            console.error('Failed to add mail job:', error.message);
        }
    }
}

module.exports = new MailJobService();