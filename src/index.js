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

export default class Coverage extends Component {
    constructor() {
        super();
        this.state = { treeNodes: [] };
    }

    handleClose() {
        this.setState({ treeNodes: [] });
    }

    getInitialSubData() {
        return {
            total: 0,
            covered: 0
        };
    }

    getInitialData() {
        return {
            branches: this.getInitialSubData(),
            functions: this.getInitialSubData(),
            lines: this.getInitialSubData(),
            statements: this.getInitialSubData()
        };
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
            const paths = fileCoverage.key.split('/').slice(minSlashes - 1);
            fileCoverage.path = paths.join('/');
            fileCoverage.parentPath =
                paths.length > 1
                    ? paths.slice(0, paths.length - 1).join('/')
                    : rootPath;
            fileCoverage.level = paths.length;
            fileCoverage.name = paths[fileCoverage.level - 1];
            fileCoverage.paths = paths;
            fileCoverage.leaf = true;
        });
        let id = 1;
        const rootPath = '[Total]';
        const rootNode = {
            id: id++,
            path: rootPath,
            name: 'Total',
            level: 0
        };
        const treeData = {
            [rootNode.path]: rootNode
        };
        fileCoverages.forEach(fc => {
            fc.id = id++;
            if (fc.level === 1) {
                fc.parentId = 1;
                return;
            }
            let childNode = fc;
            for (let i = fc.level - 2; i >= 0; i--) {
                const paths = fc.paths.slice(0, i + 1);
                const path = paths.join('/');
                let node = treeData[path];
                if (!node) {
                    node = {
                        id: id++,
                        path,
                        parentPath:
                            paths.length > 1
                                ? paths.slice(0, paths.length - 1).join('/')
                                : rootPath,
                        name: paths[paths.length - 1],
                        parentId: 1,
                        level: i + 1
                    };
                    treeData[path] = node;
                }
                childNode.parentId = node.id;
                childNode = node;
            }
        });
        let treeNodes = Object.values(treeData);
        treeNodes = treeNodes.concat(fileCoverages);
        treeNodes.sort(function(a, b) {
            return a.level < b.level ? 1 : a.level > b.level ? -1 : 0;
        });
        treeNodes.forEach(treeNode => {
            if (!treeNode.leaf) {
                const children = treeNodes.filter(
                    n => n.parentId === treeNode.id
                );
                const data = this.getInitialData();
                children.forEach(c => {
                    data.branches.total += c.data.branches.total;
                    data.branches.covered += c.data.branches.covered;
                    data.functions.total += c.data.functions.total;
                    data.functions.covered += c.data.functions.covered;
                    data.lines.total += c.data.lines.total;
                    data.lines.covered += c.data.lines.covered;
                    data.statements.total += c.data.statements.total;
                    data.statements.covered += c.data.statements.covered;
                });
                data.branches.pct = data.branches.total
                    ? Math.round(
                          (data.branches.covered * 100) / data.branches.total
                      )
                    : 100;
                data.functions.pct = data.functions.total
                    ? Math.round(
                          (data.functions.covered * 100) / data.functions.total
                      )
                    : 100;
                data.lines.pct = data.lines.total
                    ? Math.round((data.lines.covered * 100) / data.lines.total)
                    : 100;
                data.statements.pct = data.statements.total
                    ? Math.round(
                          (data.statements.covered * 100) /
                              data.statements.total
                      )
                    : 100;
                treeNode.data = data;
            }
            treeNode.lineCount = treeNode.data.statements.total;
            treeNode.branchPerc = treeNode.data.branches.pct;
            treeNode.functionPerc = treeNode.data.functions.pct;
            treeNode.linePerc = treeNode.data.lines.pct;
            treeNode.stmtPerc = treeNode.data.statements.pct;
        });

        this.setState({ treeNodes });
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
        const { treeNodes } = this.state;
        const position = this.getPosition();
        const showButtonStyle = Object.assign({}, BaseButtonStyle, position, {
            position: 'fixed',
            backgroundColor: 'red',
            zIndex: 10000
        });

        const hideButtonStyle = Object.assign({}, BaseButtonStyle, {
            backgroundColor: 'rgba(0,0,0,.24)'
        });

        const rootNode = treeNodes.find(n => n.level === 0);

        return (
            <div>
                {rootNode ? (
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
                                    <td>Line count:</td>
                                    <td align="right">{rootNode.lineCount}</td>
                                </tr>
                                <tr>
                                    <td>Branch coverage:</td>
                                    <td align="right">{rootNode.branchPerc}%</td>
                                </tr>
                                <tr>
                                    <td>Function coverage:</td>
                                    <td align="right">{rootNode.functionPerc}%</td>
                                </tr>
                                <tr>
                                    <td>Line coverage:</td>
                                    <td align="right">{rootNode.linePerc}%</td>
                                </tr>
                                <tr>
                                    <td>Statement coverage:</td>
                                    <td align="right">{rootNode.stmtPerc}%</td>
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
