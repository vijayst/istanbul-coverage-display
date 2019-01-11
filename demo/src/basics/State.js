import React from 'react';
import { Link } from 'react-router-dom';

export default function State() {
    return (
        <div>
            <h3>State</h3>
            <p>State is component data internal to component.</p>
            <Link to="/basics">Back to Basics</Link>
        </div>
    );
}
