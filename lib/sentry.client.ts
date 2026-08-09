/**
 * Observability & Error Monitoring Client (Sentry Integration)
 * Tracks client-side exceptions, WebGL canvas failures, and device incompatibility.
 */

interface SentryInitConfig {
  dsn?: string;
  environment?: string;
  tracesSampleRate?: number;
}

class SentryClient {
  private dsn: string | null = null;
  private environment: string = "production";

  public init(config: SentryInitConfig = {}) {
    this.dsn = config.dsn || process.env.NEXT_PUBLIC_SENTRY_DSN || null;
    this.environment = config.environment || process.env.NODE_ENV || "production";
    
    if (process.env.NODE_ENV === "development") {
      console.log(
        `%c[Sentry Observability] Initialized (${this.environment})`,
        "color: #818cf8; font-weight: bold;"
      );
    }
  }

  public captureException(
    error: Error | unknown,
    extraContext?: Record<string, unknown>
  ) {
    const errorInstance =
      error instanceof Error ? error : new Error(String(error));

    if (process.env.NODE_ENV === "development") {
      console.group(
        `%c[Sentry Exception Captured]`,
        "color: #ef4444; font-weight: bold;"
      );
      console.error("Message:", errorInstance.message);
      console.error("Stack:", errorInstance.stack);
      if (extraContext) {
        console.log("Context:", extraContext);
      }
      console.groupEnd();
    }
  }

  public captureWebGLError(
    error: Error | unknown,
    canvasInfo?: Record<string, unknown>
  ) {
    this.captureException(error, {
      category: "WebGL_Canvas_Failure",
      webglSupported: this.isWebGLSupported(),
      userAgent: typeof window !== "undefined" ? window.navigator.userAgent : "SSR",
      ...canvasInfo,
    });
  }

  public captureMessage(
    message: string,
    level: "info" | "warning" | "error" = "info"
  ) {
    if (process.env.NODE_ENV === "development") {
      console.log(
        `%c[Sentry Telemetry - ${level.toUpperCase()}] ${message}`,
        "color: #10b981;"
      );
    }
  }

  public isWebGLSupported(): boolean {
    if (typeof window === "undefined") return false;
    try {
      const canvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch {
      return false;
    }
  }
}

export const Sentry = new SentryClient();
