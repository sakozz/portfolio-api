export default () =>
  ({
    port: parseInt(process.env.PORT, 10) || 3000,
    pg: {
      dbName: process.env.DATABASE_NAME || 'portfolio_db',
      username: process.env.DATABASE_USERNAME || 'pgUser',
      password: process.env.DATABASE_PASSWORD || 'pgPassword',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    },
    auth: {
      ttl: 60 * 60 * 24, // 1 day (in seconds)
      jwtSecret:
        process.env.JWT_SECRET ||
        '069f1febf713900e0eed5272f045158ad8f36051165f396fd3f282c419118523',
    },
  }) as const;
