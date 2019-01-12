import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';

export default class TreeTable extends Component {
    render() {
        const { data } = this.props;
        const root = data.find(d => d.id === 1);
        return (
            <table className="icd-table" border="1" cellSpacing="0" cellPadding="8">
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
                    <tr>
                        <td style={{ paddingLeft: 16 }}>
                            <Dropdown />
                        </td>
                        <td style={{ paddingLeft: 16 }}>{root.path}</td>
                        <td style={{ textAlign: 'center' }}>{root.data.branches.pct}% ({root.data.branches.total})</td>
                        <td style={{ textAlign: 'center' }}>{root.data.functions.pct}% ({root.data.functions.total})</td>
                        <td style={{ textAlign: 'center' }}>{root.data.lines.pct}% ({root.data.lines.total})</td>
                        <td style={{ textAlign: 'center' }}>{root.data.statements.pct}% ({root.data.statements.total})</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

TreeTable.propTypes = {
    data: PropTypes.array
};