import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Section1 from './section1/Section1';
import Page1 from './section1/Page1';
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
                    <Route path="/section1/page1" component={Page1} />
                    <Route path="/section1" component={Section1} />
                    <Route path="/" component={Book} />
                </Switch>
                <CoverageSummary />
            </Fragment>
        </BrowserRouter>
    );
}

ReactDOM.render(<Index />, document.getElementById('root'));
