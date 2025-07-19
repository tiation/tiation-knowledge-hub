import { Request, Response, NextFunction } from 'express';
import { createLogger } from '../utils/logger';

const logger = createLogger('monitoring');

interface RequestMetrics {
  startTime: [number, number];
  path: string;
  method: string;
  userAgent?: string;
  ip: string;
}

// Request metrics middleware
export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = process.hrtime();
  
  const metrics: RequestMetrics = {
    startTime,
    path: req.path,
    method: req.method,
    userAgent: req.get('User-Agent'),
    ip: req.ip || req.connection.remoteAddress || 'unknown',
  };

  // Store metrics in request for later use
  (req as any).metrics = metrics;

  // Override res.end to capture response metrics
  const originalEnd = res.end;
  res.end = function(this: Response, ...args: any[]) {
    const diff = process.hrtime(startTime);
    const duration = diff[0] * 1000 + diff[1] * 1e-6; // Convert to milliseconds

    // Log request completion
    logger.info('Request completed', {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: Math.round(duration * 100) / 100, // Round to 2 decimal places
      ip: metrics.ip,
      userAgent: metrics.userAgent,
      contentLength: res.get('Content-Length') || 0,
    });

    // Call original end method
    originalEnd.apply(this, args);
  };

  next();
};

// Health check endpoint
export const healthCheck = (req: Request, res: Response) => {
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();
  
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(uptime / 60)} minutes`,
    memory: {
      rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
      heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
      heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
      external: `${Math.round(memoryUsage.external / 1024 / 1024)} MB`,
    },
    nodeVersion: process.version,
    environment: process.env.NODE_ENV || 'development',
  };

  logger.info('Health check requested', { health });
  
  res.status(200).json(health);
};

// Error tracking middleware
export const errorTrackingMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorId = Math.random().toString(36).substring(7);
  
  logger.error('Unhandled error', error, {
    errorId,
    method: req.method,
    path: req.path,
    query: req.query,
    body: req.body,
    headers: req.headers,
    ip: req.ip || req.connection.remoteAddress,
  });

  // Don't expose internal error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(500).json({
    error: 'Internal Server Error',
    errorId,
    ...(isDevelopment && {
      message: error.message,
      stack: error.stack,
    }),
  });
};

export default {
  metricsMiddleware,
  healthCheck,
  errorTrackingMiddleware,
};