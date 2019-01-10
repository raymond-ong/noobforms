import React from 'react';
import { DragSource } from 'react-dnd';
import * as textboxhelper from '../helpers/controlhelpers/textboxHelper';
import * as comboboxHelper from '../helpers/controlhelpers/comboboxHelper';
import * as constants from '../constants';

// Purpose of separating the content from the noobControl itself is to allow moving of control without interfering with the resize operation
const NoobControlContent = ({controlId, type, label, connectDragSource}) => {
    return connectDragSource(
    <div className="myContent" id={"ctrlContent" + controlId}>
        {renderControlContent(type, label)}
    </div>)
}

function renderControlContent(type, label) {
    switch(type) {
        case 'textbox':
            return textboxhelper.renderTextbox(label);
        case 'combo':
            return comboboxHelper.renderCombobox(label);
        default:
            return '';
    }
}

// For Moving controls to a different position
const itemSource = {
    beginDrag(props) {
         return {
            'arg': props,
            'dndActionType': constants.DND_ACTION_MOVE_CONTROL
       }
    }
}

function collectDragSrc(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        //isDragging: monitor.isDragging()
    }
}


export default DragSource('control', itemSource, collectDragSrc)(NoobControlContent);