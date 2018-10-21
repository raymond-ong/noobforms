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
                    x,
                    y
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

    //console.log(`[DEBUG][NoobControl][render: ${controlId}][x,y: (${x},${y})]`);

    // access these in Javascript by x.dataset.layoutx (Note: lowercase)
    let layoutPos = {
        'data-layoutx': x,
        'data-layouty': y,
        'data-rowspan': rowSpan,
        'data-colspan': colSpan,
    }

    return (
    <div className={ctrlClass} style={ctrlStyle} onClick={onSelectControl} {...layoutPos}
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

        <div className="landingPad">
        </div>
    </div>);
}


export default NoobControl;