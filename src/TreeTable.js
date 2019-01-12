import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';

export default class TreeTable extends Component {
    constructor(props) {
        super();
        const items = [];
        const root = props.data.find(d => d.id === 1);
        if (root) {
            items.push({
                node: root,
                expanded: true
            });
            const children = props.data.filter(d => d.parentId === 1);
            children.forEach(c => {
                items.push({
                    node: c,
                    expanded: false
                });
            });
        }
        this.state = { items };
    }

    getChildrenCount(item) {
        if (item.node.leaf) return 0;
        if (!item.expanded) return 0;
        const { items } = this.state;
        const children = items.filter(i => i.node.parentId === item.node.id);
        let count = children.length;
        children.forEach(c => {
            count += this.getChildrenCount(c);
        });
        return count;
    }

    handleToggle(id) {
        let { items } = this.state;
        const { data } = this.props;
        items = items.slice();
        const index = items.findIndex(i => i.node.id === id);
        const item = items[index];
        if (item.expanded) {
            const count = this.getChildrenCount(item);
            items.splice(index + 1, count);
            items[index] = {
                ...items[index],
                expanded: false
            };
            this.setState({ items });
        } else {
            const children = data
                .filter(d => d.parentId === id)
                .map(d => ({
                    node: d,
                    expanded: false
                }));
            items.splice(index + 1, 0, ...children);
            items[index] = {
                ...items[index],
                expanded: true
            };
            this.setState({ items });
        }
    }

    render() {
        const { items } = this.state;
        return (
            <table
                className="icd-table"
                border="1"
                cellSpacing="0"
                cellPadding="8"
            >
                <thead>
                    <tr>
                        <th width="300">Folder / File</th>
                        <th width="300">Path</th>
                        <th width="75">Branches</th>
                        <th width="75">Functions</th>
                        <th width="75">Lines</th>
                        <th width="75">Statements</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.node.id}>
                            <td
                                style={{
                                    paddingLeft: 16 * (item.node.level + 1)
                                }}
                            >
                                {item.node.leaf ? (
                                    item.node.name
                                ) : (
                                    <Dropdown
                                        text={item.node.name}
                                        expanded={item.expanded}
                                        onToggle={this.handleToggle.bind(
                                            this,
                                            item.node.id
                                        )}
                                    />
                                )}
                            </td>
                            <td style={{ paddingLeft: 16 }}>
                                {item.node.path}
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                {item.node.data.branches.pct}% (
                                {item.node.data.branches.total})
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                {item.node.data.functions.pct}% (
                                {item.node.data.functions.total})
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                {item.node.data.lines.pct}% (
                                {item.node.data.lines.total})
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                {item.node.data.statements.pct}% (
                                {item.node.data.statements.total})
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

TreeTable.propTypes = {
    data: PropTypes.array
};
