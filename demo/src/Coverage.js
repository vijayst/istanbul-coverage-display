import React from 'react';
import { Link } from 'react-router-dom';
let CoverageDetail;
if (process.env.NODE_ENV === 'production') {
    CoverageDetail = require('istanbul-coverage-display').CoverageDetail;
} else {
    CoverageDetail = require('../../dist/index.esm').CoverageDetail;
}

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