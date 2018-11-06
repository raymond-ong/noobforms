import React from 'react';
import '../../styles/textboxHelper.css';
import '../../styles/labelHelper.css';

// const DEFAULT_LABEL = 'Textbox Thequickbrownfoxjumpsoverthelazydog';
const DEFAULT_LABEL = 'Textbox';

export function renderTextbox(label) {
    if (!label) {
        label = DEFAULT_LABEL;
    }
    return <div className="textboxContainer">
        <label className="controlLabel">{label}:            
        </label>
        <input type="text" name="type" className="controlTextbox" value="" />
    </div>
}