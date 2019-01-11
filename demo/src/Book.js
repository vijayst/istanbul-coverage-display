import React from 'react';
import { Link } from 'react-router-dom';

export default function Book() {
    return (
        <div>
            <h1>Book</h1>
            <ul>
                <li>
                    <Link to="/section1">Section 1</Link>
                </li>
                <li>
                    <Link to="/coverage">Coverage</Link>
                </li>
            </ul>
        </div>
    );
}
