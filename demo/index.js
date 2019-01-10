import React from "react";
import ReactDOM from "react-dom";
import Coverage from 'istanbul-coverage-display';
import Page1 from './section1/Page1';

function Index() {
    return (
        <div>
            Book
            <Page1 />
            <Coverage />
        </div>
    );
}

ReactDOM.render(<Index />, document.getElementById("root"));


