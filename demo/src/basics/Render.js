import React from 'react';
import { Link } from 'react-router-dom';

export default function Render() {
    return (
        <div>
            <h3>Render</h3>
            <p>Component renders based on state and props.</p>
            <Link to="/basics">Back to Basics</Link>
        </div>
    );
}
