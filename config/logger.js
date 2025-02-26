const winston = require('winston');
const { combine, timestamp, printf, json } = winston.format;

// Create a Winston logger
const logger = winston.createLogger({
  level: 'info', // Log level (e.g., 'info', 'error', 'debug')
  format: combine(
    timestamp(), // Add a timestamp to each log
    json() // Log in JSON format
  ),
  transports: [
    // Log to the console
    new winston.transports.Console({
      format: printf(({ level, message, timestamp }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${message}`;
      }),
    }),
    // Log to a combined file (all logs)
    new winston.transports.File({ filename: 'logs/combined.log' }),
    // Log errors to a separate file
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});

module.exports = logger;