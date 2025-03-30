import { fileLogger } from "./logger/fileLogger";
import path from "path";

const filePath = path.resolve(__dirname, "logs/app.log");
export const fLog = fileLogger(filePath, "info");
