"use client";

import {Component, ErrorInfo, ReactNode} from 'react';
import ErrorFallback from "@/app/utils/errorFallback";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(): State {
        return {hasError: true};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <ErrorFallback/>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
