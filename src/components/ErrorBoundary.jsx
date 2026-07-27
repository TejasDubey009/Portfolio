import React from 'react';
import { AlertTriangle } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Portfolio ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-fallback">
          <AlertTriangle size={32} className="error-icon" />
          <h3>Interactive Component Unavailable</h3>
          <p>WebGL rendering degraded gracefully. Please refresh or update your GPU driver.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
