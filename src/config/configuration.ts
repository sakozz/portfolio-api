import * as dotenv from 'dotenv';

// Load environment variables from .env file, where API keys and passwords are configured.
dotenv.config();

export default () =>
  ({
    port: 3000,
    pg: {
      dbName: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DB_PORT, 10),
    },
    auth: {
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      googleClientSecret: process.env.GOOGLE_SECRET_KEY,
      googleUserProfileUrl: process.env.GOOGLE_SSO_USER_INFO_URL,
      googleCallbackUrl: process.env.GOOGLE_SSO_CALLBACK_URL,
      ttl: 60 * 60 * 24, // 1 day (in seconds)
      jwtSecret:
        process.env.JWT_SECRET ||
        '069f1febf713900e0eed5272f045158ad8f36051165f396fd3f282c419118523',
      frontendCallbackUrl: 'http://localhost:4200/admin',
    },
  }) as const;
