import React from 'react';
import { Link } from 'react-router-dom';

export default function Comp() {
    return (
        <div>
            <h2>Class Component</h2>
            <p>
                This is a section on Class Components.
            </p>
            <ul>
                <li>
                    <Link to="/comp/class">Class</Link>
                </li>
                <li>
                    <Link to="/comp/cons">Constructor</Link>
                </li>
                <li>
                    <Link to="/comp/gdsfp">GetDerivedStateFromProps</Link>
                </li>
                <li>
                    <Link to="/comp/render">Render</Link>
                </li>
                <li>
                    <Link to="/">Back to Book</Link>
                </li>
            </ul>
        </div>
    );
}