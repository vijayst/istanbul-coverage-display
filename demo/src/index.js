import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Section1 from './section1/Section1';
import Page1 from './section1/Page1';
import Book from './Book';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Coverage from '../../dist/index.esm';

function Index() {
    return (
        <BrowserRouter>
            <Fragment>
                <Switch>
                    <Route path="/section1/page1" component={Page1} />
                    <Route path="/section1" component={Section1} />
                    <Route path="/" component={Book} />
                </Switch>
                <Coverage />
            </Fragment>
        </BrowserRouter>
    );
}

ReactDOM.render(<Index />, document.getElementById('root'));
