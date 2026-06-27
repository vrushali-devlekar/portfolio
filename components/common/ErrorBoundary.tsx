"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Sentry } from "@/lib/sentry.client";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    Sentry.captureException(error, {
      componentStack: errorInfo.componentStack,
    });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-full mb-4">
            <i className="ri-error-warning-line text-2xl text-red-500"></i>
          </div>
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground text-sm max-w-md mb-6">
            An unexpected client-side error occurred. The incident has been
            recorded, and our engineering team has been notified.
          </p>
          {this.state.error && (
            <pre className="p-4 bg-card border border-border text-red-400 font-mono text-xs text-left max-w-lg overflow-auto rounded-lg mb-6">
              {this.state.error.message}
            </pre>
          )}
          <button
            onClick={this.handleReset}
            className="px-4 py-2 bg-foreground text-background font-medium rounded-lg text-sm hover:opacity-90 active:scale-95 transition-all duration-150"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
