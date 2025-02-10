import React, { Component } from 'react';

class NotFound extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='container text-center not-found-page'>
                ERROR 404! Page not found!
            </div>
        );
    }
}

export default NotFound;