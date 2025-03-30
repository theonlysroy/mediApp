import { appendFileSync, createWriteStream } from "fs";

type LogLevelType = "info" | "warn" | "error";

const logLevels = {
  info: 0,
  warn: 1,
  error: 2,
};

export const fileLogger = (file: string, level: LogLevelType) => {
  const minLevel: number = logLevels[level] ?? logLevels.info;

  // const writeStream = createWriteStream(file, { flags: "a" });
  const logToFile = (logLevel: LogLevelType, message: string) => {
    if (logLevels[logLevel] >= minLevel) {
      const logMessage = `[${logLevel.toUpperCase()}]\t${new Date().toISOString()}\t${message}\n`;
      appendFileSync(file, logMessage, "utf8");
    }
  };
  return {
    info: (message: string) => logToFile("info", message),
    warn: (message: string) => logToFile("warn", message),
    error: (message: string) => logToFile("error", message),
  };
};
