// API Constants
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    REFRESH: '/api/auth/refresh',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me',
  },
  USERS: {
    LIST: '/api/users',
    CREATE: '/api/users',
    GET: '/api/users/:id',
    UPDATE: '/api/users/:id',
    DELETE: '/api/users/:id',
  },
  KNOWLEDGE: {
    ARTICLES: '/api/knowledge/articles',
    ARTICLE: '/api/knowledge/articles/:id',
    SEARCH: '/api/knowledge/search',
    CATEGORIES: '/api/knowledge/categories',
  },
  CHAT: {
    SESSIONS: '/api/chat/sessions',
    SESSION: '/api/chat/sessions/:id',
    MESSAGES: '/api/chat/sessions/:id/messages',
  },
  ANALYTICS: {
    DASHBOARD: '/api/analytics/dashboard',
    METRICS: '/api/analytics/metrics',
    REPORTS: '/api/analytics/reports',
  },
  FILES: {
    UPLOAD: '/api/files/upload',
    DOWNLOAD: '/api/files/:id/download',
    DELETE: '/api/files/:id',
  },
} as const;

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  VIEWER: 'viewer',
} as const;

export const ROLE_PERMISSIONS = {
  [USER_ROLES.ADMIN]: [
    'users:read',
    'users:write',
    'users:delete',
    'knowledge:read',
    'knowledge:write',
    'knowledge:delete',
    'analytics:read',
    'settings:read',
    'settings:write',
    'files:read',
    'files:write',
    'files:delete',
  ],
  [USER_ROLES.USER]: [
    'knowledge:read',
    'knowledge:write',
    'chat:read',
    'chat:write',
    'files:read',
    'files:write',
  ],
  [USER_ROLES.VIEWER]: [
    'knowledge:read',
    'chat:read',
  ],
} as const;

// Pagination
export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'text/plain',
    'text/csv',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  ALLOWED_EXTENSIONS: [
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.webp',
    '.pdf',
    '.txt',
    '.csv',
    '.doc',
    '.docx',
  ],
} as const;

// Rate Limiting
export const RATE_LIMITS = {
  DEFAULT: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  },
  AUTH: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 login attempts per windowMs
  },
  FILE_UPLOAD: {
    windowMs: 60 * 1000, // 1 minute
    max: 10, // limit each IP to 10 uploads per minute
  },
} as const;

// JWT
export const JWT = {
  EXPIRES_IN: '7d',
  REFRESH_EXPIRES_IN: '30d',
  ALGORITHM: 'HS256',
} as const;

// Password Requirements
export const PASSWORD_REQUIREMENTS = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 128,
  REQUIRE_LOWERCASE: true,
  REQUIRE_UPPERCASE: true,
  REQUIRE_NUMBERS: true,
  REQUIRE_SYMBOLS: false,
  BCRYPT_ROUNDS: 12,
} as const;

// Cache TTL (Time To Live) in seconds
export const CACHE_TTL = {
  SHORT: 5 * 60, // 5 minutes
  MEDIUM: 30 * 60, // 30 minutes
  LONG: 2 * 60 * 60, // 2 hours
  VERY_LONG: 24 * 60 * 60, // 24 hours
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Environment
export const ENVIRONMENTS = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
  TEST: 'test',
} as const;

// Knowledge Base
export const KNOWLEDGE_BASE = {
  MAX_TITLE_LENGTH: 200,
  MAX_SUMMARY_LENGTH: 500,
  MAX_CONTENT_LENGTH: 50000,
  MAX_TAGS: 10,
  SEARCH_MIN_LENGTH: 3,
} as const;

// Chat
export const CHAT = {
  MAX_MESSAGE_LENGTH: 4000,
  MAX_SESSIONS_PER_USER: 50,
  MAX_MESSAGES_PER_SESSION: 100,
  SESSION_TIMEOUT_MINUTES: 60,
} as const;

// Analytics
export const ANALYTICS = {
  DEFAULT_DATE_RANGE: 30, // days
  MAX_DATE_RANGE: 365, // days
  CHART_MAX_POINTS: 100,
} as const;