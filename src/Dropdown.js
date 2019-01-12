import React, { Component } from 'react';
import Arrow from './Arrow';

export default class Dropdown extends Component {
    constructor() {
        super();
        this.state = { down: true };
    }
    
    handleToggle() {
        this.setState({ down: !this.state.down });
    }

    render() {
        const { down } = this.state;

        return (
            <span style={{ display: 'inline-flex', alignItems: 'center' }} onClick={this.handleToggle.bind(this)}>
                <Arrow width="16" height="16" down={down} />
                <span style={{ marginLeft: 8 }}>Heloo</span>
            </span>
        );
    }
}
