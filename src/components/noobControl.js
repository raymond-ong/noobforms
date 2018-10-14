import React, { Component } from 'react';
import '../styles/noobControl.css';
import {connect} from 'react-redux';
import { DropTarget } from 'react-dnd';

const NoobControl = ({type, 
                    selected, 
                    sectId,
                    rowSpan,
                    colSpan,
                    name,
                    label,
                    controlId,
                    onSelectControl,
                    onResizerMouseDown,
                    resizeEvents, // not null if this control is currently being dragged to resize
                }) => {
    let ctrlClass = 'noobControl';
    if (selected === true) {
        ctrlClass += ' selectedControl';
    }

    let ctrlStyle = {
        // set the minHeight instead of height. Height will make the height fixed regardless of the content.
        // minHeight allows the parent container to grow depending on content
        'minHeight': 30 * rowSpan + 15 * (rowSpan - 1), // 15:
        //'position': 'relative',
        'gridRowEnd': 'span ' + rowSpan,
        'gridColumnEnd': 'span ' + colSpan,
    };

    let contentStyle = {
        // 'minHeight': 30 * rowSpan + 15 * (rowSpan - 1), // 15:
    }

    if (resizeEvents !== null) {
        console.log('[DEBUG][NoobControl][render]' + controlId + ' [Resizing] ' + resizeEvents.mouseMoveEvent.clientX);
        debugger
    }
    

    return (
    <div className={ctrlClass} style={ctrlStyle} onClick={onSelectControl} 
        id={"ctrl"+controlId} >
        <div className="myContent" id={"ctrlContent" + controlId}>
            ({controlId} / {type}) {label}
        </div>

        <div className="resizer" id={"ctrlResizer" + controlId}
            onMouseDown={(e) => {                
                onResizerMouseDown(e);
            }
        }
        ></div>
    </div>);
}


export default NoobControl;