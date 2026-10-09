import React, { Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('App runtime error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '24px', fontFamily: 'sans-serif', textAlign: 'center', backgroundColor: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ maxWidth: '480px', background: '#ffffff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
            <h2 style={{ color: '#0f172a', fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
              LingoBangla লোড হতে সমস্যা হয়েছে
            </h2>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '16px' }}>
              অনুগ্রহ করে পেজটি একবার রিফ্রেশ করুন।
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{ background: '#059669', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              রিফ্রেশ করুন
            </button>
            {this.state.error && (
              <pre style={{ marginTop: '16px', textAlign: 'left', fontSize: '11px', background: '#f1f5f9', padding: '8px', borderRadius: '6px', overflowX: 'auto', color: '#dc2626' }}>
                {this.state.error.message}
              </pre>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
}
