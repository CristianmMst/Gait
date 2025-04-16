process.loadEnvFile();

export const {
  DB_NAME,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_PORT = 3306,
  JWT_SECRET,
  CLIENT_URL,
} = process.env;
