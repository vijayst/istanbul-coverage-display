import React from 'react';
import { Link } from 'react-router-dom';

export default function Book() {
    return (
        <div>
            <h1>React Book</h1>
            <p>As you read this book, coverage increases.</p>
            <ul>
                <li>
                    <Link to="/coverage">Coverage</Link>
                </li>
                <li>
                    <Link to="/basics">The Basics</Link>
                </li>
            </ul>
        </div>
    );
}
