import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Basics from './basics/Basics';
import Comp from './basics/Comp';
import Book from './Book';
import Coverage from './Coverage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CoverageSummary } from '../../dist/index.esm';

function Index() {
    return (
        <BrowserRouter basename={process.env.NODE_ENV === 'production' ? '/istanbul-coverage-display/' : '/'}>
            <Fragment>
                <Switch>
                    <Route path="/coverage" component={Coverage} />
                    <Route path="/basics/comp" component={Comp} />
                    <Route path="/basics" component={Basics} />
                    <Route path="/" component={Book} />
                </Switch>
                <CoverageSummary />
            </Fragment>
        </BrowserRouter>
    );
}

ReactDOM.render(<Index />, document.getElementById('root'));
