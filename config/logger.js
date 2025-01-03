const morgan = require('morgan');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            handleExceptions: true,
        }),
        new winston.transports.File({
            filename: 'error.log',
            handleExceptions: true,
        }),
    ],
});

module.exports = logger;