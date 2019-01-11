import React from 'react';
import { Link } from 'react-router-dom';
import { CoverageDetail } from '../../dist/index.esm';

export default function Coverage() {
    return (
        <div style={{ padding: 20 }}>
            <h1>Coverage</h1>
            <CoverageDetail />
            <div style={{ marginTop: 20 }}>
                <Link to="/">Go Back</Link>
            </div>
        </div>
    );
}