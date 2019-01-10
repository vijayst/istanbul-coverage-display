import React, { Component } from 'react';
import libCoverage from 'istanbul-lib-coverage';
import PropTypes from 'prop-types';

const BaseButtonStyle = {
    color: 'white',
    padding: '5px 10px',
    fontSize: 16,
    border: 0,
    borderRadius: 3
};

const TablePadding = 30;

const columns = [
    {
        title: 'Folder / File',
        name: 'name',
        width: '100px'
    },
    {
        title: 'Path',
        name: 'path',
        width: '200px'
    },
    {
        title: 'Line Count',
        name: 'lineCount',
        width: '50px'
    },
    {
        title: 'Branches',
        name: 'branchPerc',
        textAlign: 'center'
    },
    {
        title: 'Functions',
        name: 'functionPerc',
        textAlign: 'center'
    },
    {
        title: 'Lines',
        name: 'linePerc',
        textAlign: 'center'
    },
    {
        title: 'Statements',
        name: 'stmtPerc',
        textAlign: 'center'
    }
];

export default class Coverage extends Component {
    constructor() {
        super();
        this.state = { fileCoverages: [] };
    }

    handleClose() {
        this.setState({ fileCoverages: [] });
    }

    handleShow() {
        var map = libCoverage.createCoverageMap({});
        map.merge(window.__coverage__);
        let minSlashes = 100;
        const fileCoverages = Object.keys(map.data).map(key => {
            const slashes = key.split('/').length;
            if (slashes < minSlashes) {
                minSlashes = slashes;
            }
            return {
                key,
                data: map.data[key].toSummary().data
            };
        });
        fileCoverages.forEach(fileCoverage => {
            fileCoverage.key = fileCoverage.key
                .split('/')
                .slice(minSlashes - 1)
                .join('/');
        });
        this.setState({ fileCoverages });
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
        const { fileCoverages } = this.state;
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
                {fileCoverages.length ? (
                    <div
                        style={Object.assign(
                            {
                                padding: 20,
                                backgroundColor: 'rgba(0,0,0,.12)',
                                position: 'fixed',
                                zIndex: 10000
                            },
                            this.getPosition(TablePadding)
                        )}
                    >
                        <table
                            border="1"
                            cellSpacing="0"
                            style={{ maxHeight: 400, overflow: 'scroll' }}
                        >
                            <thead>
                                <tr>
                                    <th width="200">File</th>
                                    <th width="50">Branches</th>
                                    <th width="50">Functions</th>
                                    <th width="50">Lines</th>
                                    <th width="50">Statements</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fileCoverages.map(fileCoverage => (
                                    <tr key={fileCoverage.key}>
                                        <td>{fileCoverage.key}</td>
                                        <td>
                                            {fileCoverage.data.branches.pct}
                                        </td>
                                        <td>
                                            {fileCoverage.data.functions.pct}
                                        </td>
                                        <td>{fileCoverage.data.lines.pct}</td>
                                        <td>
                                            {fileCoverage.data.statements.pct}
                                        </td>
                                    </tr>
                                ))}
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

Coverage.propTypes = {
    position: PropTypes.oneOf([
        'bottomLeft',
        'topLeft',
        'bottomRight',
        'topRight'
    ])
};

Coverage.defaultProps = {
    position: 'bottomLeft'
};
