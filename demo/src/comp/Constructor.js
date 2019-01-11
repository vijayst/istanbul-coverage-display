import React from 'react';
import { Link } from 'react-router-dom';

export default function Constructor() {
    return (
        <div>
            <h3>Constructor</h3>
            <p>React calls constructor first for any initialisation</p>
            <Link to="/comp">Back to Component</Link>
        </div>
    );
}
