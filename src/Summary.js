import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getCoverage from './getCoverage';
import computeTotals from './computeTotals';

const BaseButtonStyle = {
    color: 'white',
    padding: '5px 10px',
    fontSize: 16,
    border: 0,
    borderRadius: 3
};

const TablePadding = 30;

export default class Summary extends Component {
    constructor() {
        super();
        this.state = { data: {} };
    }

    handleClose() {
        this.setState({ data: {} });
    }

    handleShow() {
        const fileCoverages = getCoverage();
        if (fileCoverages) {
            const data = computeTotals(fileCoverages);
            this.setState({ data });
        }
    }

    getPosition(padding = 0) {
        const { position } = this.props;
        switch (position) {
            case 'topLeft':
                return {
                    top: padding,
                    left: 0
                };
            case 'bottomLeft':
                return {
                    bottom: padding,
                    left: 0
                };
            case 'topRight':
                return {
                    top: padding,
                    right: 0
                };
            case 'bottomRight':
                return {
                    bottom: padding,
                    right: 0
                };
            default:
                return {
                    bottom: 0,
                    left: 0
                };
        }
    }

    render() {
        const { data } = this.state;
        const position = this.getPosition();
        const showButtonStyle = Object.assign({}, BaseButtonStyle, position, {
            position: 'fixed',
            backgroundColor: 'red',
            zIndex: 10000
        });

        const hideButtonStyle = Object.assign({}, BaseButtonStyle, {
            backgroundColor: 'rgba(0,0,0,.24)'
        });

        return (
            <div>
                {data.branches ? (
                    <div
                        style={Object.assign(
                            {
                                padding: 20,
                                backgroundColor: '#eee',
                                position: 'fixed',
                                zIndex: 10000
                            },
                            this.getPosition(TablePadding)
                        )}
                    >
                        <table>
                            <thead>
                                <tr>
                                    <th width="200" />
                                    <th
                                        width="100"
                                    />
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Branch coverage:</td>
                                    <td align="right">{data.branches.pct}% ({data.branches.total})</td>
                                </tr>
                                <tr>
                                    <td>Function coverage:</td>
                                    <td align="right">{data.functions.pct}% ({data.functions.total})</td>
                                </tr>
                                <tr>
                                    <td>Line coverage:</td>
                                    <td align="right">{data.lines.pct}% ({data.lines.total})</td>
                                </tr>
                                <tr>
                                    <td>Statement coverage:</td>
                                    <td align="right">{data.statements.pct}% ({data.statements.total})</td>
                                </tr>
                            </tbody>
                        </table>
                        <div style={{ textAlign: 'right', marginTop: 12 }}>
                            <button
                                style={hideButtonStyle}
                                onClick={this.handleClose.bind(this)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                ) : null}
                <button
                    style={showButtonStyle}
                    onClick={this.handleShow.bind(this)}
                >
                    Show coverage
                </button>
            </div>
        );
    }
}

Summary.propTypes = {
    position: PropTypes.oneOf([
        'bottomLeft',
        'topLeft',
        'bottomRight',
        'topRight'
    ])
};

Summary.defaultProps = {
    position: 'bottomLeft'
};
