import React from 'react';
import { Link } from 'react-router-dom';

export default function GDSFP() {
    return (
        <div>
            <h3>GetDerivedStateFromProps</h3>
            <p>GetDerivedStateFromProps, static function, initialises state from props.</p>
            <Link to="/comp">Back to Component</Link>
        </div>
    );
}
