import React, { Component } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  error: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: false };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      error: true,
    });
    console.log('error is ', error);
    console.log('errorInfo is ', errorInfo);
  }

  render() {
    if (this.state.error) {
      console.log('errrrrrrr');
      return <h1>Something went Wrong : 🫥</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
