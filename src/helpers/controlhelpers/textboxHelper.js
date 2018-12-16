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
        'padding': '0px',
    }; 
    return <div className="textboxContainer">        
        <div className="controlLabel">{label}:            
        </div>
            <Input 
                size='mini' 
                fluid
                style={style}
                placeholder={label}>
            </Input>
    </div>
}

let localState = {};

function onChangeHandler(e) {
    debugger
    localState[e.target.name] = e.target.value;    
}

export function renderControlProps(control) {
    localState.ctrlName = control.name;
    return <div>
        <div className="controlLabel">Name:
        </div>
        <Input size='mini' fluid value={localState.ctrlName} onChange={onChangeHandler} name='ctrlName'>
        </Input>

        <div className="controlLabel">Label:
        </div>
        <Input size='mini' fluid value={control.label}>
        </Input>
    </div>
}