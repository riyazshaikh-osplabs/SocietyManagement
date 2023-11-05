// import log4js from 'log4js';

// log4js.configure({
//     appenders: {
//         console: { type: 'console' },
//         authentication: {
//             type: 'file',
//             filename: 'logs/authentication.log',
//             pattern: 'dd-MM-yyy',
//             maxLogSize: 10485760,
//             compress: true
//         },
//     },
//     categories: {
//         default: { appenders: ['console', 'authentication'], level: 'debug' }
//     },
// });

// const logger = log4js.getLogger('auhtentication');

// import winston from 'winston';
// import winstonRotate from 'winston-daily-rotate-file';

// // const logLevel = process.env.LOG_LEVEL || 'debug';

// const logsLevel = {
//     error: 0,
//     warn: 1,
//     info: 2,
//     debug: 3,
//     access: 4
// }

// const logger = winston.createLogger({
//     levels: logsLevel.levels,
//     level: logLevel,
//     format: winston.format.combine(
//         winston.format.timestamp({
//             format: () => {
//                 const date = new Date();
//                 const hours = date.getHours() % 12 || 12;
//                 const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
//                 return `${date.getDate()} ${date.toLocaleDateString('en-us', { month: 'short' })} ${date.getFullYear()} ${hours}:${date.getMinutes()}:${date.getSeconds()} ${ampm}`;
//             }
//         }),
//         winston.format.printf(({ timestamp, level, message }) => {
//             return `${timestamp} -- ${level} -- ${message}`;
//         }),
//     ),
//     transports: [
//         new winstonRotate({
//             filename: 'logs/error.log',
//             level: 'error',
//             datePattern: '',
//             zippedArchive: true,
//             maxSize: '1k',
//             maxFiles: '30d',
//         }),
//         new winstonRotate({
//             filename: 'logs/debug.log',
//             level: 'debug',
//             datePattern: '',
//             zippedArchive: true,
//             maxSize: '1k',
//             maxFiles: '30d',
//         }),
//         new winstonRotate({
//             filename: 'logs/access.log',
//             level: 'info',
//             datePattern: '',
//             zippedArchive: true,
//             maxSize: '1k',
//             maxFiles: '30d',
//         }),
//     ],
// });

// import winston from 'winston';
// import winstonRotate from 'winston-daily-rotate-file';

// // const logLevel = process.env.LOG_LEVEL || 'debug';

// const logsLevel = {
//     error: 0,
//     warn: 1,
//     info: 2,
//     debug: 3,
//     access: 4
// }

// const debug = (...text) => {
//     console.debug(...text);
//     winston.createLogger({
//         levels: logsLevel.debug,
//         level: 'debug',
//         format: winston.format.combine(
//             winston.format.timestamp({
//                 format: () => {
//                     const date = new Date();
//                     const hours = date.getHours() % 12 || 12;
//                     const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
//                     return `${date.getDate()} ${date.toLocaleDateString('en-us', { month: 'short' })} ${date.getFullYear()} ${hours}:${date.getMinutes()}:${date.getSeconds()} ${ampm}`;
//                 }
//             }),
//             winston.format.printf(({ timestamp, level, message }) => {
//                 return `${timestamp} -- ${level} -- ${message}`;
//             }),
//         ),
//         transports: [
//             new winston.transports.Console(),
//             new winstonRotate({
//                 filename: 'logs/debug.log',
//                 level: 'error',
//                 datePattern: '',
//                 zippedArchive: true,
//                 maxSize: '1k',
//                 maxFiles: '30d',
//             }),
//         ],
//     });
// }

// const error = (...text) => {
//     console.error(...text);
//     winston.createLogger({
//         levels: logsLevel.error,
//         level: 'error',
//         format: winston.format.combine(
//             winston.format.timestamp({
//                 format: () => {
//                     const date = new Date();
//                     const hours = date.getHours() % 12 || 12;
//                     const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
//                     return `${date.getDate()} ${date.toLocaleDateString('en-us', { month: 'short' })} ${date.getFullYear()} ${hours}:${date.getMinutes()}:${date.getSeconds()} ${ampm}`;
//                 }
//             }),
//             winston.format.printf(({ timestamp, level, message }) => {
//                 return `${timestamp} -- ${level} -- ${message}`;
//             }),
//         ),
//         transports: [
//             new winston.transports.Console(),
//             new winstonRotate({
//                 filename: 'logs/error.log',
//                 level: 'error',
//                 datePattern: '',
//                 zippedArchive: true,
//                 maxSize: '1k',
//                 maxFiles: '30d',
//             }),
//         ],
//     });
// }

// const access = (...text) => {
//     console.log(...text);
//     winston.createLogger({
//         levels: logsLevel.access,
//         level: 'access',
//         format: winston.format.combine(
//             winston.format.timestamp({
//                 format: () => {
//                     const date = new Date();
//                     const hours = date.getHours() % 12 || 12;
//                     const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
//                     return `${date.getDate()} ${date.toLocaleDateString('en-us', { month: 'short' })} ${date.getFullYear()} ${hours}:${date.getMinutes()}:${date.getSeconds()} ${ampm}`;
//                 }
//             }),
//             winston.format.printf(({ timestamp, level, message }) => {
//                 return `${timestamp} -- ${level} -- ${message}`;
//             }),
//         ),
//         transports: [
//             new winston.transports.Console(),
//             new winstonRotate({
//                 filename: 'logs/access.log',
//                 level: 'error',
//                 datePattern: '',
//                 zippedArchive: true,
//                 maxSize: '1k',
//                 maxFiles: '30d',
//             }),
//         ],
//     });
// }

// if (process.env.NODE_ENV !== 'production') {
//     (new winston.transports.Console());
// }

// export default {
//     debug,
//     error,
//     access,
// };

// import winston from "winston";
// import winstonRotate from "winston-daily-rotate-file";

// // Function to create a logger instance with specified options
// const createLoggerInstance = (filename, level) => {
//     return winston.createLogger({
//         levels: {
//             error: 0,
//             info: 1,
//             debug: 2,
//             access: 3
//         },
//         format: winston.format.combine(
//             winston.format.timestamp({
//                 format: () => {
//                     const date = new Date();
//                     const hours = date.getHours() % 12 || 12;
//                     const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
//                     return `${date.getDate()} ${date.toLocaleDateString('en-us', { month: 'short' })} ${date.getFullYear()} ${hours}:${date.getMinutes()}:${date.getSeconds()} ${ampm}`;
//                 }
//             }),
//             winston.format.printf(({ timestamp, level, message }) => {
//                 return `${timestamp} -- ${level} -- ${message}`;
//             }),
//         ),
//         transports: [
//             new winston.transports.Console({ level: level }),
//             new winstonRotate({
//                 filename: `logs/${filename}-%DATE%.log`,
//                 zippedArchive: true,
//                 maxFiles: '30d',
//                 maxSize: '1k',
//                 level: level
//             })
//         ]
//     });
// };

// const accessLogger = createLoggerInstance('access', 'access');
// const debugLogger = createLoggerInstance('debug', 'debug');
// const errorLogger = createLoggerInstance('error', 'error');

// const access = (...message) => {
//     accessLogger.log('access', message.join(' '));
// }

// const debug = (...message) => {
//     debugLogger.log('debug', message.join(' '));
//     errorLogger.error('error', message.join(' '));
// }

// const error = (...message) => {
//     errorLogger.log('error', message.join(' '));
// }

// export default {
//     access,
//     debug,
//     error
// }

// import winston from "winston";
// import winstonRotate from "winston-daily-rotate-file";

// // Create a common transport for 'debug' and 'error' logs
// const debugErrorTransport = new winston.transports.Console({
//     level: 'debug',
//     format: winston.format.combine(
//         winston.format.timestamp(),
//         winston.format.printf(({ timestamp, level, message }) => {
//             return `${timestamp} -- ${level} -- ${message}`;
//         })
//     )
// });

// // Create a common transport for 'access' logs
// const accessTransport = new winston.transports.Console({
//     level: 'access',
//     format: winston.format.combine(
//         winston.format.timestamp(),
//         winston.format.printf(({ timestamp, level, message }) => {
//             return `${timestamp} -- ${level} -- ${message}`;
//         })
//     ),
// });

// // Create a common logger instance for 'debug' logs
// const debugLogger = winston.createLogger({
//     levels: {
//         error: 0,
//         info: 1,
//         debug: 2,
//         access: 3
//     },
//     format: winston.format.combine(
//         winston.format.timestamp({
//             format: () => {
//                 const date = new Date();
//                 const hours = date.getHours() % 12 || 12;
//                 const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
//                 return `${date.getDate()} ${date.toLocaleDateString('en-us', { month: 'short' })} ${date.getFullYear()} ${hours}:${date.getMinutes()}:${date.getSeconds()} ${ampm}`;
//             }
//         }),
//         winston.format.printf(({ timestamp, level, message }) => {
//             return `${timestamp} -- ${level} -- ${message}`;
//         }),
//     ),
//     transports: [
//         debugErrorTransport,
//         new winston.transports.File({
//             filename: 'logs/debug-%DATE%.log',
//             zippedArchive: true,
//             maxFiles: '30d',
//             maxSize: '1k',
//             level: 'debug',
//             format: winston.format.combine(
//                 winston.format.timestamp(),
//                 winston.format.printf(({ timestamp, level, message }) => {
//                     return `${timestamp} -- ${level} -- ${message}`;
//                 }),
//             ),
//         }),
//     ]
// });

// // Create separate logger instances for 'access' and 'error' logs
// const accessLogger = winston.createLogger({
//     levels: {
//         access: 3
//     },
//     format: winston.format.combine(
//         winston.format.timestamp({
//             format: () => {
//                 const date = new Date();
//                 const hours = date.getHours() % 12 || 12;
//                 const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
//                 return `${date.getDate()} ${date.toLocaleDateString('en-us', { month: 'short' })} ${date.getFullYear()} ${hours}:${date.getMinutes()}:${date.getSeconds()} ${ampm}`;
//             }
//         }),
//         winston.format.printf(({ timestamp, level, message }) => {
//             return `${timestamp} -- ${level} -- ${message}`;
//         }),
//     ),
//     transports: [accessTransport],
// });

// const errorLogger = winston.createLogger({
//     levels: {
//         error: 0
//     },
//     format: winston.format.combine(
//         winston.format.timestamp({
//             format: () => {
//                 const date = new Date();
//                 const hours = date.getHours() % 12 || 12;
//                 const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
//                 return `${date.getDate()} ${date.toLocaleDateString('en-us', { month: 'short' })} ${date.getFullYear()} ${hours}:${date.getMinutes()}:${date.getSeconds()} ${ampm}`;
//             }
//         }),
//         winston.format.printf(({ timestamp, level, message }) => {
//             return `${timestamp} -- ${level} -- ${message}`;
//         }),
//     ),
//     transports: [
//         new winston.transports.File({
//             filename: 'logs/error-%DATE%.log',
//             zippedArchive: true,
//             maxFiles: '30d',
//             maxSize: '1k',
//             level: 'error',
//         }),
//     ]
// });

// const access = (...message) => {
//     accessLogger.log('access', message.join(' '));
// }

// const debug = (...message) => {
//     debugLogger.log('debug', message.join(' '));
// }

// const error = (...message) => {
//     errorLogger.log('error', message.join(' '));
// }

// export default {
//     access,
//     debug,
//     error
// }








// import winston from "winston";
// import winstonRotate from "winston-daily-rotate-file";

// const createLoggerInstance = (filename, levels) => {
//     return winston.createLogger({
//         levels: {
//             access: 1
//         },
//         format: winston.format.combine(
//             winston.format.timestamp({
//                 format: () => {
//                     const date = new Date();
//                     const hours = date.getHours() % 12 || 12;
//                     const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
//                     return `${date.getDate()} ${date.toLocaleDateString('en-us', { month: 'short' })} ${date.getFullYear()} ${hours}:${date.getMinutes()}:${date.getSeconds()} ${ampm}`;
//                 }
//             }),
//             winston.format.printf(({ timestamp, level, message }) => {
//                 return `${timestamp} -- ${level} -- ${message}`;
//             }),
//         ),
//         transports: [
//             new winston.transports.Console({ level: levels }),
//             new winstonRotate({
//                 filename: `logs/${filename}-%DATE%.log`,
//                 zippedArchive: true,
//                 maxFiles: '30d',
//                 maxSize: '10k',
//                 level: levels
//             })
//         ]
//     });
// };

// const debugLogger = winston.createLogger({
//     format: winston.format.combine(
//         winston.format.timestamp({
//             format: () => {
//                 const date = new Date();
//                 const hours = date.getHours() % 12 || 12;
//                 const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
//                 return `${date.getDate()} ${date.toLocaleDateString('en-us', { month: 'short' })} ${date.getFullYear()} ${hours}:${date.getMinutes()}:${date.getSeconds()} ${ampm}`;
//             }
//         }),
//         winston.format.printf(({ timestamp, level, message }) => {
//             return `${timestamp} -- ${level} -- ${message}`;
//         }),
//     ),
//     transports: [
//         new winston.transports.Console({ level: 'debug' }),
//         new winstonRotate({
//             filename: `logs/debug-%DATE%.log`,
//             zippedArchive: true,
//             maxFiles: '30d',
//             maxSize: '10k',
//             level: 'debug'
//         }),
//     ]
// });

// const errorLogger = winston.createLogger({
//     format: winston.format.combine(
//         winston.format.timestamp({
//             format: () => {
//                 const date = new Date();
//                 const hours = date.getHours() % 12 || 12;
//                 const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
//                 return `${date.getDate()} ${date.toLocaleDateString('en-us', { month: 'short' })} ${date.getFullYear()} ${hours}:${date.getMinutes()} ${ampm}`;
//             }
//         }),
//         winston.format.printf(({ timestamp, level, message }) => {
//             return `${timestamp} -- ${level} -- ${message}`;
//         }),
//     ),
//     transports: [
//         new winston.transports.Console({ level: 'error' }),
//         new winstonRotate({
//             filename: `logs/error-%DATE%.log`,
//             zippedArchive: true,
//             maxFiles: '30d',
//             maxSize: '10k',
//             level: 'error'
//         }),
//         new winstonRotate({
//             filename: `logs/debug-%DATE%.log`,
//             maxFiles: '30d',
//             maxSize: '10k',
//             level: 'error'
//         }),
//     ]
// });

// const accessLogger = createLoggerInstance('access', 'access');

const access = (message) => {
    console.log(message);
}

const debug = (message) => {
    console.debug(message);
}

const error = (message) => {
    console.error(message);
}

const log = (message) => {
    console.log(message);
}

export default {
    access,
    debug,
    error,
    log
}