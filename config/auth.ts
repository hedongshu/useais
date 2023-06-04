import type { ModuleOptions } from '@bg-dev/nuxt-auth'

export const auth: Partial<ModuleOptions> = {
  baseUrl: process.env.AUTH_BASE_URL,

  accessToken: {
    jwtSecret: process.env.AUTH_ACCESS_TOKEN_SECRET || '',
    maxAge: 30 * 60, // 30 Minutes
    customClaims: {}, // Dynamic custom claims
  },

  refreshToken: {
    jwtSecret: process.env.AUTH_REFRESH_TOKEN_SECRET || '',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    cookieName: 'auth_refresh_token',
  },

  prisma: {}, // Prisma client options (optional)

  admin: {
    enable: true, // Enable admin API
  },

  // oauth: {
  //   google: {
  //     clientId: process.env.AUTH_OAUTH_GOOGLE_CLIENT_ID || '',
  //     clientSecret: process.env.AUTH_OAUTH_GOOGLE_CLIENT_SECRET || '',
  //     scopes: 'email profile',
  //     authorizeUrl: 'https://accounts.google.com/o/oauth2/auth',
  //     tokenUrl: 'https://accounts.google.com/o/oauth2/token',
  //     userUrl: 'https://www.googleapis.com/oauth2/v3/userinfo',
  //   },
  // },

  smtp: {
    host: process.env.AUTH_SMTP_HOST || '',
    port:
      (process.env.AUTH_SMTP_PORT && parseInt(process.env.AUTH_SMTP_PORT)) ||
      587,
    user: process.env.AUTH_SMTP_USER || '',
    pass: process.env.AUTH_SMTP_PASS || '',
    from: process.env.AUTH_SMTP_FROM || '',
  },

  redirect: {
    login: '/auth/login',
    logout: '/auth/login',
    home: '/',
    callback: '/auth/callback',
    emailVerify: '/auth/verify-email',
    passwordReset: '/auth/reset-password',
  },

  enableGlobalAuthMiddleware: false,

  registration: {
    requireEmailVerification: true,
    defaultRole: 'user',
  },
}
