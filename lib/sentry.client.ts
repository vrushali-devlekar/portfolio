/**
 * Mock Sentry Client for Observability
 * In a real-world enterprise application, this would import from '@sentry/nextjs'
 */

interface SentryInitConfig {
  dsn: string;
  environment: string;
  tracesSampleRate: number;
}

class MockSentry {
  private dsn: string | null = null;
  private environment: string = "development";

  init(config: SentryInitConfig) {
    this.dsn = config.dsn;
    this.environment = config.environment;
    console.log(
      `%c[Sentry Mock] Initialized on environment: ${this.environment} with DSN: ${this.dsn}`,
      "color: #818cf8; font-weight: bold;",
    );
  }

  captureException(
    error: Error | unknown,
    extraContext?: Record<string, unknown>,
  ) {
    const errorInstance =
      error instanceof Error ? error : new Error(String(error));

    // Log exception to local console with rich developer framing
    console.group(
      `%c[Sentry Error Captured]`,
      "color: #ef4444; font-weight: bold;",
    );
    console.error("Message:", errorInstance.message);
    console.error("Stack:", errorInstance.stack);
    if (extraContext) {
      console.log("Extra Context:", extraContext);
    }
    console.groupEnd();

    // Mock API telemetry post:
    // fetch('/api/monitoring/errors', { method: 'POST', body: JSON.stringify({ ... }) })
  }

  captureMessage(
    message: string,
    level: "info" | "warning" | "error" = "info",
  ) {
    console.log(
      `%c[Sentry Telemetry Message - ${level.toUpperCase()}] ${message}`,
      "color: #10b981;",
    );
  }
}

export const Sentry = new MockSentry();
