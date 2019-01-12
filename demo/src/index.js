import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Basics from './basics/Basics';
import Comp from './basics/Comp';
import Props from './basics/Props';
import State from './basics/State';
import Render from './basics/Render';
import Book from './Book';
import Coverage from './Coverage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import GDSFP from './comp/GDSFP';
import Constructor from './comp/Constructor';
import Class from './comp/Class';
import Render2 from './comp/Render';
import Comp2 from './comp/Comp';

let CoverageSummary;
if (process.env.NODE_ENV === 'production') {
    CoverageSummary = require('istanbul-coverage-display').CoverageSummary;
} else {
    CoverageSummary = require('../../dist/index.esm').CoverageSummary;
}

function Index() {
    return (
        <BrowserRouter>
            <Fragment>
                <Switch>
                    <Route path="/coverage" component={Coverage} />
                    <Route path="/basics/comp" component={Comp} />
                    <Route path="/basics/props" component={Props} />
                    <Route path="/basics/state" component={State} />
                    <Route path="/basics/render" component={Render} />
                    <Route path="/basics" component={Basics} />
                    <Route path="/comp/render" component={Render2} />
                    <Route path="/comp/gdsfp" component={GDSFP} />
                    <Route path="/comp/cons" component={Constructor} />
                    <Route path="/comp/class" component={Class} />
                    <Route path="/comp" component={Comp2} />
                    <Route path="/" component={Book} />
                </Switch>
                <CoverageSummary magic />
            </Fragment>
        </BrowserRouter>
    );
}

ReactDOM.render(<Index />, document.getElementById('root'));
