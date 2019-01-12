import React, { Component } from 'react';
import Arrow from './Arrow';
import PropTypes from 'prop-types';
import './Dropdown.scss';

export default class Dropdown extends Component {
    
    render() {
        const { text, expanded, onToggle } = this.props;

        return (
            <span className="dropdown" onClick={onToggle}>
                <Arrow className="dropdown__arrow" down={expanded} />
                <span className="dropdown__text">{text}</span>
            </span>
        );
    }
}

Dropdown.propTypes = {
    text: PropTypes.string,
    expanded: PropTypes.bool,
    onToggle: PropTypes.func
};
