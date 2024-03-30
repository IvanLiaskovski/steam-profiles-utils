import fs from "fs";

export default function logger(message: string, path: string) {
  const logMessage = `${new Date().toISOString()} - ${message}\n`;

  fs.appendFile(path, logMessage, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });
}
