import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center border border-slate-100">
            <h2 className="text-2xl font-medium text-slate-800 mb-4">
              Ops! Algo deu errado.
            </h2>
            <p className="text-slate-600 mb-6 font-light">
              Encontramos um problema inesperado na aplicação.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-brand-orange text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all shadow-md"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
