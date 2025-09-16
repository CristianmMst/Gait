export const config = {
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000",
  clientUrl: process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000",
} as const;
