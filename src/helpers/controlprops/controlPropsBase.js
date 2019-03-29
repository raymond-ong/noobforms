import React, { Component } from 'react';

class ControlPropsBase extends Component {
    onTextChange = (e) => {
        // console.log('[DEBUG][ControlPropsBase] onTextChange');
        var textProp = {};
        textProp[e.target.parentNode.dataset.field] = e.target.value;
        this.setState(textProp); // anticipate changes when componentDidUpdate() is fired        
    }
}

export default ControlPropsBase;