import { z } from 'zod';

// User types
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: z.enum(['admin', 'user', 'viewer']),
  tenantId: z.string().uuid(),
  isActive: z.boolean(),
  lastLoginAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastLoginAt: true,
});

export const UpdateUserSchema = CreateUserSchema.partial();

export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;

// Authentication types
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const RegisterSchema = LoginSchema.extend({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  tenantId: z.string().uuid().optional(),
});

export type LoginRequest = z.infer<typeof LoginSchema>;
export type RegisterRequest = z.infer<typeof RegisterSchema>;

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresAt: string;
}

// Tenant types
export const TenantSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().min(1),
  settings: z.object({
    theme: z.object({
      primaryColor: z.string().optional(),
      secondaryColor: z.string().optional(),
    }).optional(),
    features: z.object({
      chat: z.boolean().default(true),
      analytics: z.boolean().default(true),
      knowledgeBase: z.boolean().default(true),
    }).optional(),
  }).optional(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Tenant = z.infer<typeof TenantSchema>;

// Knowledge Base types
export const KnowledgeArticleSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  content: z.string(),
  summary: z.string().optional(),
  tags: z.array(z.string()),
  category: z.string(),
  isPublished: z.boolean(),
  authorId: z.string().uuid(),
  tenantId: z.string().uuid(),
  viewCount: z.number().default(0),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateKnowledgeArticleSchema = KnowledgeArticleSchema.omit({
  id: true,
  viewCount: true,
  createdAt: true,
  updatedAt: true,
});

export type KnowledgeArticle = z.infer<typeof KnowledgeArticleSchema>;
export type CreateKnowledgeArticle = z.infer<typeof CreateKnowledgeArticleSchema>;

// Chat types
export const ChatMessageSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  role: z.enum(['user', 'assistant']),
  sessionId: z.string().uuid(),
  userId: z.string().uuid(),
  tenantId: z.string().uuid(),
  metadata: z.record(z.any()).optional(),
  createdAt: z.date(),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export const ChatSessionSchema = z.object({
  id: z.string().uuid(),
  title: z.string().optional(),
  userId: z.string().uuid(),
  tenantId: z.string().uuid(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ChatSession = z.infer<typeof ChatSessionSchema>;

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

// File Upload types
export const FileUploadSchema = z.object({
  id: z.string().uuid(),
  fileName: z.string(),
  originalName: z.string(),
  mimeType: z.string(),
  size: z.number(),
  path: z.string(),
  uploadedBy: z.string().uuid(),
  tenantId: z.string().uuid(),
  createdAt: z.date(),
});

export type FileUpload = z.infer<typeof FileUploadSchema>;

// Analytics types
export interface AnalyticsMetric {
  name: string;
  value: number;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  period: string;
}

export interface AnalyticsDashboard {
  metrics: AnalyticsMetric[];
  charts: {
    usage: Array<{ date: string; value: number }>;
    topArticles: Array<{ title: string; views: number }>;
    userActivity: Array<{ date: string; activeUsers: number }>;
  };
  lastUpdated: string;
}

// Error types
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED');
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super(message, 403, 'FORBIDDEN');
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}