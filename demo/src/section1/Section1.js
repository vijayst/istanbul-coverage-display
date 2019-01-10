import React from 'react';
import { Link } from 'react-router-dom';
import Page1 from './Page1';

export default function Section1() {
    return (
        <div>
            <h2>Section 1</h2>
            <ul>
                <li>
                    <Link to="/section1/page1">Page 1</Link>
                </li>
                <li>
                    <Link to="/">Back to Book</Link>
                </li>
            </ul>
        </div>
    );
}
