import React, {Component} from 'react';

export default class ErrorHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return {hasError: true}
    }

    render () {
        if (this.state.hasError) {
            return (
                <main className="error-page">
                    <h1>
                        We're sorry! An error occurred. Please try again later.
                    </h1>
                </main>
            );
        }
        return this.props.children;
    }
}