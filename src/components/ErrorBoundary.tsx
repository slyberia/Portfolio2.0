import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  location?: string;
  rawContent?: string;
}

interface State {
  hasError: boolean;
  showRawContent: boolean;
  error?: Error;
}

/**
 * Standard React Error Boundary component.
 * Uses a Class Component because error boundary lifecycle methods (getDerivedStateFromError, componentDidCatch)
 * are not yet available via React Hooks.
 */
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      showRawContent: false,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, showRawContent: false, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Uncaught error in ${this.props.location || 'component'}:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 dark:bg-slate-900/50 dark:border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 shrink-0 text-slate-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <div className="text-sm">
                <p className="font-semibold text-slate-900 dark:text-white">
                  Render Error ({this.props.location || 'Component'})
                </p>
                <p className="text-slate-500 dark:text-slate-400">
                  This section failed to load properly.
                </p>
              </div>
            </div>
            {this.props.rawContent && (
              <button
                onClick={() => this.setState((s) => ({ ...s, showRawContent: !s.showRawContent }))}
                className="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 dark:border-white/20 dark:hover:bg-white/10 dark:text-slate-300 transition-colors"
              >
                {this.state.showRawContent ? 'Hide Raw Text' : 'View Raw Text'}
              </button>
            )}
          </div>
          {this.state.showRawContent && this.props.rawContent && (
            <div className="mt-4 p-4 rounded-xl bg-white border border-slate-200 dark:bg-slate-950 dark:border-white/10 overflow-x-auto">
              <pre className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-mono">
                {this.props.rawContent}
              </pre>
            </div>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
