import React, { Component } from 'react';
import Select, { Option } from 'rc-select';
import 'rc-select/assets/index.css';
import { Input } from 'semantic-ui-react';
import ControlPropsBase from './controlPropsBase';

// No need to involve redux here
// Make this a standalone component
// Reason: If we simply render the control props as a dummy component without any state,
// It would be difficult to get the values (e.g. need to check the DOM?)
class ComboboxProps extends ControlPropsBase {

    constructor(props) {
        super(props);
        this.state = {
            ...props.controlProps
        };
        this.onCurrPropsChanged = props.onCurrPropsChanged;
      }

    render() {
        // TODO: Use semantic UI form
        let nameField = {
            'data-field': 'name'
        }

        return <div>
            <label className="controlLabel">Name:
            </label>
            <Input size='mini' fluid value={this.state.name} onChange={this.onTextChange.bind(this)} {...nameField}>
            </Input>

            <label className="controlLabel">Label:
            </label>
            <Input size='mini' fluid value={this.state.label} onChange={this.onTextChange.bind(this)} {...{['data-field']: 'label'}}>
            </Input>
        </div>
    }

    // getAppliedProps() {
    //     return this.state;
    // }

    // Called when any state was updated
    // For example, when text changed, the base class calls setState
    componentDidUpdate(prevProps, prevState) {
        this.onCurrPropsChanged(this.state);
    }
}

export default ComboboxProps