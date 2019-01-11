import React from 'react';
import { Link } from 'react-router-dom';

export default function Class() {
    return (
        <div>
            <h3>Classes!</h3>
            <p>React Component extends the base class: React.Component.</p>
            <Link to="/comp">Back to Component</Link>
        </div>
    );
}
