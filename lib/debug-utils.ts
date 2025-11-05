// lib/debug-utils.ts
export class DebugLogger {
  private static instance: DebugLogger;
  private logs: string[] = [];

  private constructor() {}

  static getInstance(): DebugLogger {
    if (!DebugLogger.instance) {
      DebugLogger.instance = new DebugLogger();
    }
    return DebugLogger.instance;
  }

  log(context: string, data: any) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${context}: ${
      typeof data === "string" ? data : JSON.stringify(data, null, 2)
    }`;

    this.logs.push(logEntry);
    console.log(logEntry);

    // Keep only last 100 logs
    if (this.logs.length > 100) {
      this.logs.shift();
    }
  }

  getLogs() {
    return this.logs;
  }

  clearLogs() {
    this.logs = [];
  }
}

export const debug = DebugLogger.getInstance();
