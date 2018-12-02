import React from 'react';
import '../../styles/textboxHelper.css';
import '../../styles/labelHelper.css';
import { Input } from 'semantic-ui-react';

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
        <label className="controlLabel">{label}:            
        </label>
        {/* <input type="text" name="type" className="controlTextbox" value="" /> */}
        {/* <div className="controlTextbox"> */}
            <Input 
                size='mini' 
                fluid
                // label={label} 
                // labelPosition='left'
                style={style}
                placeholder={label}>
            </Input>
        {/* </div> */}

    </div>
}