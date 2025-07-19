import winston from 'winston';
import path from 'path';

const logLevel = process.env.LOG_LEVEL || 'info';
const logDir = process.env.LOG_DIR || 'logs';

// Custom log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
    const logEntry = {
      timestamp,
      level,
      message,
      ...(stack && { stack }),
      ...(Object.keys(meta).length && { meta }),
    };
    return JSON.stringify(logEntry);
  })
);

// Console format for development
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.simple(),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    return `${timestamp} [${level}]: ${message}${stack ? `\n${stack}` : ''}`;
  })
);

const transports: winston.transport[] = [];

// Always add console transport
transports.push(
  new winston.transports.Console({
    format: process.env.NODE_ENV === 'production' ? logFormat : consoleFormat,
  })
);

// Add file transports in production
if (process.env.NODE_ENV === 'production') {
  transports.push(
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      format: logFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
      format: logFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 10,
    })
  );
}

export const logger = winston.createLogger({
  level: logLevel,
  format: logFormat,
  transports,
  exitOnError: false,
});

// Create structured logging methods
export const createLogger = (service: string) => ({
  info: (message: string, meta?: Record<string, any>) =>
    logger.info(message, { service, ...meta }),
  
  warn: (message: string, meta?: Record<string, any>) =>
    logger.warn(message, { service, ...meta }),
  
  error: (message: string, error?: Error, meta?: Record<string, any>) =>
    logger.error(message, { service, error: error?.stack || error, ...meta }),
  
  debug: (message: string, meta?: Record<string, any>) =>
    logger.debug(message, { service, ...meta }),
  
  audit: (action: string, user: string, resource?: string, meta?: Record<string, any>) =>
    logger.info('AUDIT', {
      service,
      action,
      user,
      resource,
      timestamp: new Date().toISOString(),
      ...meta,
    }),
});

export default logger;