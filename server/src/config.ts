try {
  process.loadEnvFile();
} catch {
  import("dotenv").then((dotenv) => dotenv.config());
}

export const {
  DB_NAME,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  PORT = 4000,
  DB_PORT = 3306,
  JWT_SECRET,
  CLIENT_URL,
  MERCADOPAGO_ACCESS_TOKEN,
  NODE_ENV = "development",
} = process.env;
