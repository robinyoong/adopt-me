//mostly code from React documentation

import React, { Component } from 'react';
import { Link, Redirect } from '@reach/router';

class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error', error, info);
  }

  // Runs each time it gets new state or new props
  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(()=> this.setState({redirect: true}), 5000)
    }
  }

  render() {
    if(this.state.redirect) {
      return <Redirect to='/' />
    }
    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing. <Link to="/">Click here</Link>{' '}
          to go back to the homepage or wait for five seconds.
        </h1>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
