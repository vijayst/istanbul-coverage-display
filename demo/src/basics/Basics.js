import React from 'react';
import { Link } from 'react-router-dom';

export default function Section1() {
    return (
        <div>
            <h2>React Basics</h2>
            <p>
                This is a section on React Basics.
            </p>
            <ul>
                <li>
                    <Link to="/basics/comp">Component</Link>
                </li>
                <li>
                    <Link to="/">Back to Book</Link>
                </li>
            </ul>
        </div>
    );
}
