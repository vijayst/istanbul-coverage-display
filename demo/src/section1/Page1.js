import React from 'react';
import { Link } from 'react-router-dom';

export default function Page1() {
    return (
        <div>
            <h3>Page 1</h3>
            <Link to="/section1">Back to Section 1</Link>
        </div>
    );
}
