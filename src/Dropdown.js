import React, { Component } from 'react';
import Arrow from './Arrow';
import PropTypes from 'prop-types';

export default class Dropdown extends Component {
    
    render() {
        const { text, expanded, onToggle } = this.props;

        return (
            <span style={{ display: 'inline-flex', alignItems: 'center' }} onClick={onToggle}>
                <Arrow width="16" height="16" down={expanded} />
                <span style={{ marginLeft: 8 }}>{text}</span>
            </span>
        );
    }
}

Dropdown.propTypes = {
    text: PropTypes.string,
    expanded: PropTypes.bool,
    onToggle: PropTypes.func
};
