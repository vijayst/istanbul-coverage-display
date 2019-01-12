import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getCoverage from './getCoverage';
import computeTotals from './computeTotals';
import './Summary.scss';

export default class Summary extends Component {
    constructor() {
        super();
        this.state = { data: {} };
    }

    handleRefresh() {
        this.refresh();
    }

    handleClose() {
        this.setState({ data: {}, showGuide: false });
    }

    handleShow() {
        this.refresh();
    }

    refresh() {
        const fileCoverages = getCoverage();
        if (fileCoverages) {
            const data = computeTotals(fileCoverages);
            this.setState({ data });
        } else {
            this.setState({ showGuide: true });
        }
    }

    render() {
        const { magic, onNavigate } = this.props;
        const { data, showGuide } = this.state;

        return (
            <div className="icd-summary">
                {data.branches ? (
                    <div className="icd-summary__popover">
                        <table className="icd-summary__table">
                            <thead>
                                <tr>
                                    <th width="200" />
                                    <th width="100" />
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Branch coverage:</td>
                                    <td align="right">
                                        {data.branches.pct}% (
                                        {data.branches.total})
                                    </td>
                                </tr>
                                <tr>
                                    <td>Function coverage:</td>
                                    <td align="right">
                                        {data.functions.pct}% (
                                        {data.functions.total})
                                    </td>
                                </tr>
                                <tr>
                                    <td>Line coverage:</td>
                                    <td align="right">
                                        {data.lines.pct}% ({data.lines.total})
                                    </td>
                                </tr>
                                <tr>
                                    <td>Statement coverage:</td>
                                    <td align="right">
                                        {data.statements.pct}% (
                                        {data.statements.total})
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="icd-summary__nav">
                            {onNavigate ? (
                                <button
                                    className="icd-summary__button"
                                    onClick={onNavigate}
                                >
                                    Details
                                </button>
                            ) : null}

                            <button
                                className="icd-summary__button"
                                onClick={this.handleRefresh.bind(this)}
                            >
                                Refresh
                            </button>
                            <button
                                className="icd-summary__button"
                                onClick={this.handleClose.bind(this)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                ) : showGuide ? (
                    <div className="icd-summary__popover">
                        <p>
                            Please install babel-plugin-istanbul as
                            devDependency. Add the plugin to .babelrc file or
                            webpack config for instrumenting your code.
                        </p>
                        <div style={{ textAlign: 'right' }}>
                            <button
                                className="icd-summary__button"
                                onClick={this.handleClose.bind(this)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                ) : null}
                <button
                    className="icd-summary__show"
                    style={{ opacity: magic ? 0 : 1 }}
                    onClick={this.handleShow.bind(this)}
                >
                    Show coverage
                </button>
            </div>
        );
    }
}

Summary.propTypes = {
    magic: PropTypes.bool,
    onNavigate: PropTypes.func
};
