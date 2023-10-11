

export default {
  web_port: process.env.WEBSERVER_PORT ?? 8080,
  salt_rounds: process.env.SALT_ROUND ?? 10,
  database_url: process.env.DATABASE_URL ?? "file:./dev.db"
}