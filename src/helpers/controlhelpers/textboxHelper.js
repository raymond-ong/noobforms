import React from 'react';
import '../../styles/textboxHelper.css';
import '../../styles/labelHelper.css';
import { Input, Segment, Label } from 'semantic-ui-react';

// const DEFAULT_LABEL = 'Textbox Thequickbrownfoxjumpsoverthelazydog';
const DEFAULT_LABEL = 'Textbox';

export function renderTextbox(label) {
    if (!label) {
        label = DEFAULT_LABEL;
    }
    // use this instead of wrapping it inside our container
    var style={
        'marginRight': '5px',
        'marginTop': '0px',
        'marginBottom': '5px',
        'padding': '0px',
    }; 
    return <div className="textboxContainer">        
        <div className="controlLabel">{label}:            
        </div>
            <Input 
                size='tiny' 
                fluid
                style={style}
                placeholder={label}>
            </Input>
    </div>
}

function onChangeHandler(e, data) {
    // this will not work. Changing the state requires calling setState() or firing Redux actions
    this[e.target.name] = e.target.value;    
}

export function renderControlProps(control, state, textChanged) {
    return <div>
        <div className="controlLabel">Name:
        </div>
        <Input size='mini' fluid 
            //value={state.name} 
            // don't use value; otherwise we need to bind it to the state, and manage the value using onChange
            defaultValue={state.name}
            name='name'
            //onChange={onChangeHandler.bind(state)} 
            // onChange={
            //     (e) => {
            //         debugger
            //         state.name = e.target.value;
            //     }} 
            //onChange={textChanged}
        >
        </Input>

        <div className="controlLabel">Label:
        </div>
        <Input size='mini' fluid defaultValue={control.label}>
        </Input>
    </div>
}