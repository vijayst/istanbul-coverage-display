import React from 'react';
import { Link } from 'react-router-dom';

export default function Render() {
    return (
        <div>
            <h3>Render</h3>
            <p>All component classes should have render function</p>
            <Link to="/comp">Back to Component</Link>
        </div>
    );
}
