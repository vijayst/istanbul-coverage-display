import React from 'react';
import { Link } from 'react-router-dom';

export default function Props() {
    return (
        <div>
            <h3>Props</h3>
            <p>Props is component data from parent component.</p>
            <Link to="/basics">Back to Basics</Link>
        </div>
    );
}
