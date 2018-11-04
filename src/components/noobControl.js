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
        'gridRowEnd': 'span ' + rowSpan,
        'gridColumnEnd': 'span ' + colSpan,
    };

    //console.log(`[DEBUG][NoobControl][render: ${controlId}][x,y: (${x},${y})]`);

    // access these in Javascript by x.dataset.layoutx (Note: lowercase)
    let layoutPos = {
        'data-layoutx': x,
        'data-layouty': y,
        'data-rowspan': rowSpan,
        'data-colspan': colSpan,
    }

    let landingPadStyle = {
        gridTemplateColumns: `repeat(${colSpan}, 1fr)`,
        gridTemplateRows: `repeat(${rowSpan}, 1fr)`,
    }

    let domCtrlId = "ctrl"+controlId;

    return (
    <div className={ctrlClass} style={ctrlStyle} onClick={onSelectControl} {...layoutPos}
        id={domCtrlId} >
        <div className="myContent" id={"ctrlContent" + controlId}>
            ({controlId} / {type}) {label}
        </div>

        <div className="resizer" id={"ctrlResizer" + controlId}
            onMouseDown={(e) => {                
                onResizerMouseDown(e);
            }
        }
        ></div>

        <div className="landingPadContainer" style={landingPadStyle}>
            {createLandingPads(rowSpan, colSpan, domCtrlId)}
        </div>
    </div>);
}

// Create a landing pad to allow the user to reduce the size of the control
function createLandingPads(rowSpan, colSpan, domParentCtrlId) {
    let retList = [];
    for (let i=0; i < rowSpan; i++) {
        for (let j=0; j < colSpan; j++) {
            let layoutPos = {
                'data-layoutx': j,
                'data-layouty': i,
            }
            retList.push(<div className="landingPadCell" 
                            parentctrlid={domParentCtrlId} 
                            key={"landingPad"+(i * colSpan + j)}
                            {...layoutPos}></div>);
        }
    }

    return retList;
}


export default NoobControl;