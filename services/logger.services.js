const winston = require('winston');
const dotEnv = require('dotenv');
const dateFormat = require("../utils/date_format.utils");
dotEnv.config();


// time || level || message || meta



class LoggerService {

    constructor(route) {
        this.route = route;

        const logger = winston.createLogger({
            level: 'info',  // Log all messages
            levels: winston.config.npm.levels,
            format: winston.format.printf(info => {
                let message = `${dateFormat.dateFormat()} || ${info.level} || ${info.message} |`;
                message = info.obj ? `${message} data : ${JSON.stringify(info.obj)}` : message;

                return message;
            }),
            defaultMeta: { service: 'user-service' },
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: `${process.env.FILENAME_LOG} / ${route}.log` }),
            ],
        });

        this.logger = logger;

    }

    async info(message) {
        this.logger.log('info', message);
    }
    async info(message, obj) {
        this.logger.log('info', message, { obj });
    }

    async error(message) {
        this.logger.log('error', message);
    }
    async error(message, obj) {
        this.logger.log('error', message, { obj });
    }

    async debug(message) {
        this.logger.log('debug', message);
    }
    async debug(message, obj) {
        this.logger.log('debug', message, { obj });
    }

}

module.exports = LoggerService;
