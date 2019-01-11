import React, { Component } from 'react';
import getCoverage from './getCoverage';
import computeTotals from './computeTotals';
import TableTree from 'react-table-tree';

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
        title: 'Branches',
        name: 'branchPerc',
        textAlign: 'center',
        width: '100px'
    },
    {
        title: 'Functions',
        name: 'functionPerc',
        textAlign: 'center',
        width: '100px'
    },
    {
        title: 'Lines',
        name: 'linePerc',
        textAlign: 'center',
        width: '100px'
    },
    {
        title: 'Statements',
        name: 'stmtPerc',
        textAlign: 'center',
        width: '100px'
    }
];

export default class CoverageDetail extends Component {
    constructor() {
        super();
        this.state = { treeNodes: [] };
    }

    componentDidMount() {
        const fileCoverages = getCoverage();
        if (!fileCoverages) return;
        let minSlashes = 100;
        fileCoverages.forEach(fc => {
            const slashes = fc.key.split('/').length;
            if (slashes < minSlashes) minSlashes = slashes;
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
                treeNode.data = computeTotals(children);
            }
            const { branches, functions, lines, statements } = treeNode.data;
            treeNode.branchPerc = `${branches.pct}% (${branches.total})`;
            treeNode.functionPerc = `${functions.pct}% (${functions.total})`;
            treeNode.linePerc = `${lines.pct}% (${lines.total})`;
            treeNode.stmtPerc = `${statements.pct}% (${statements.total})`;
        });

        this.setState({ treeNodes });
    }

    render() {
        const { treeNodes } = this.state;

        return (
            <div>
                {treeNodes.length ? (
                    <TableTree
                        datasets={treeNodes}
                        columns={columns}
                        rootId={1}
                        total={{ visible: true, name: 'Totals' }}
                    />
                ) : null}
            </div>
        );
    }
}
