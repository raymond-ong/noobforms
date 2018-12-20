import React, { Component } from 'react';
import Select, { Option } from 'rc-select';
import 'rc-select/assets/index.css';
import { Input } from 'semantic-ui-react';

// No need to involve redux here
// Make this a standalone component
class ComboboxProps extends Component {

    constructor(props) {
        debugger
        super(props);
        this.state = {
            ...props.controlProps
        };
      }

    render() {
        // TODO: Use semantic UI form
        return <div>
            <label className="controlLabel">Name:
            </label>
            <Input size='mini' fluid value={this.props.name}>
            </Input>

            <label className="controlLabel">Label:
            </label>
            <Input size='mini' fluid value={this.props.label}>
            </Input>
        </div>
    }
}

export default ComboboxProps