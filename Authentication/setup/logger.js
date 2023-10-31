import log4js from 'log4js';

log4js.configure({
    appenders: {
        console: { type: 'console' },
        authentication: {
            type: 'file',
            filename: 'logs/authentication.log',
            pattern: 'dd-MM-yyy',
            maxLogSize: 10485760,
            compress: true
        },
    },
    categories: {
        default: { appenders: ['console', 'authentication'], level: 'debug' }
    },
});

const logger = log4js.getLogger('auhtentication');

export default logger;