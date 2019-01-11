import React from 'react';
import { Link } from 'react-router-dom';

export default function Comp() {
    return (
        <div>
            <h3>Component</h3>
            <p>Component is a function or a class.</p>
            <Link to="/basics">Back to Basics</Link>
        </div>
    );
}
