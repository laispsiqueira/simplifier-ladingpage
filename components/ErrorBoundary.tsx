
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  // Fix: Making children optional helps resolve JSX type inference issues in some environments
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

// Fix: Explicitly define properties to resolve TS issues where state/props aren't correctly inherited from generic Component
class ErrorBoundary extends Component<Props, State> {
  // Fix: Initialize state as class property to ensure it's recognized by the compiler
  public override state: State = {
    hasError: false
  };

  // Constructor is optional when state is initialized as a property, 
  // but if kept, ensure it correctly handles the state assignment.
  constructor(props: Props) {
    super(props);
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  public override render(): ReactNode {
    // Fix: access state and props via this
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

    // Fix: return this.props.children
    return this.props.children;
  }
}

export default ErrorBoundary;
