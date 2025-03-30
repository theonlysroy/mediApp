import dotenv from "dotenv";
import { prismaClient } from "./db";
dotenv.config({ path: ".env" });
import { createServer } from "http";
import app from "./src/app";
import { consoleLogger as logger } from "./src/logger/consoleLogger";

const port = process.env.PORT || 4002;
const httpServer = createServer(app);

async function startServer() {
  try {
    await prismaClient.$connect();
    logger.info("Database connected...");
    httpServer.listen(port, () =>
      logger.info(`Server running @ http://localhost:${port}`)
    );

    // Handle SIGTERM and SIGINT for graceful shutdown
    process.on("SIGTERM", async () => {
      logger.info("SIGTERM signal received: closing HTTP server...");
      httpServer.close(async () => {
        logger.info("HTTP server closed.");
        await prismaClient.$disconnect();
        logger.info("Database disconnected.");
        process.exit(0);
      });
    });

    process.on("SIGINT", async () => {
      logger.info("SIGINT signal received: closing HTTP server...");
      httpServer.close(async () => {
        logger.info("HTTP server closed.");
        await prismaClient.$disconnect();
        logger.info("Database disconnected.");
        process.exit(0);
      });
    });
  } catch (error: any) {
    logger.error(`Server Failed to start: ${error.message}`);
    await prismaClient.$disconnect();
    process.exit(1);
  }
}

startServer();
