import React, { ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  location?: string;
}

interface State {
  hasError: boolean;
}

/**
 * Standard React Error Boundary component.
 * Uses a Class Component because error boundary lifecycle methods (getDerivedStateFromError, componentDidCatch) 
 * are not yet available via React Hooks.
 */
class ErrorBoundary extends React.Component<Props, State> {
  // Explicitly declaring state as a property to ensure it is correctly recognized by the TypeScript compiler
  public state: State = {
    hasError: false,
  };

  // Explicitly declare props to avoid TS error
  readonly props: Readonly<Props>;

  constructor(props: Props) {
    super(props);
    this.props = props;
    // Initializing state within the constructor to maintain standard React patterns
    this.state = {
      hasError: false,
    };
  }

  /**
   * Static method called by React when an error occurs in a child component.
   * Updates the state so the next render will show the fallback UI.
   */
  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  /**
   * Lifecycle method called after an error has been thrown.
   * Used for logging error details to the console with provided location context.
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Accessing this.props through inherited React.Component properties
    console.error(`Uncaught error in ${this.props.location || 'component'}:`, error, errorInfo);
  }

  /**
   * Renders the fallback UI if an error was caught, or the children otherwise.
   */
  render() {
    // Accessing this.state through inherited React.Component properties
    if (this.state.hasError) {
      // Returning the provided fallback or a default error display
      return this.props.fallback || (
        <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 text-red-400 text-sm font-medium flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span>This section is currently unavailable due to a technical error.</span>
        </div>
      );
    }
    // Accessing this.props.children when no error has occurred
    return this.props.children;
  }
}

export default ErrorBoundary;