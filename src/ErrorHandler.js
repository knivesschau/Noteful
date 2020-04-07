import React, {Component} from 'react';

export default class ErrorHandler extends Component {
    state = {error: false};

    static getDerivedStateFromError(error) {
        console.error(error);
        return {error};
    }

    render () {
        if (this.state.error) {
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