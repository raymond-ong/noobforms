import React, { Component } from 'react';
import '../styles/noobControl.css';
import { DropTarget, DragSource } from 'react-dnd';
import * as constants from '../constants';
import NoobControlContent from './noobControlContent'

const ROW_HEIGHT = 65;
const CONTROL_PADDING = 20;
const GRID_GAP = 5;

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
                    onControlTypeSelected,
                    onMoveControl,
                    x,
                    y,
                    connectDropTarget, // comes from the collect() function
                    connectDragPreview,
                    hovered // potenttial drop target of selecting a control type
                }) => {
    let ctrlClass = 'noobControl';
    if (selected === true) {
        ctrlClass += ' selectedControl';
    }
    if (hovered) {
        ctrlClass += ' hoveredControlTypeDropTarget';
    }

    let ctrlStyle = {
        // set the minHeight instead of height. Height will make the height fixed regardless of the content.
        // minHeight allows the parent container to grow depending on content
        // actually we have not accounted for the Grid Gap yet...In case all the controls
        'minHeight': (ROW_HEIGHT * rowSpan) + (CONTROL_PADDING * (rowSpan - 1)) + (GRID_GAP * (rowSpan - 1)), 
        'gridRowEnd': 'span ' + rowSpan,
        'gridColumnEnd': 'span ' + colSpan,
    };

    console.log(`[DEBUG][NoobControl][render: ${controlId}] label: ${label} [x,y: (${x},${y})]`);

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

    return connectDropTarget(
    <div className={ctrlClass} style={ctrlStyle} onClick={onSelectControl} {...layoutPos}
        id={domCtrlId} >
        <NoobControlContent 
            controlId={controlId} 
            type={type}
            label={label}
        />

        <div className="resizer" id={"ctrlResizer" + controlId}
            onMouseDown={(e) => {                
                onResizerMouseDown(e);
            }
        }
        ></div>

        <div className="landingPadContainer" style={landingPadStyle}>
            {createLandingPads(rowSpan, colSpan, domCtrlId, x, y)}
        </div>
    </div>);
}

// Create a landing pad to allow the user to reduce the size of the control
function createLandingPads(rowSpan, colSpan, domParentCtrlId, parentX, parentY) {
    let retList = [];
    for (let i=0; i < rowSpan; i++) {
        for (let j=0; j < colSpan; j++) {
            let layoutPos = {
                'data-layoutx': j + parentX,
                'data-layouty': i + parentY,
            }
            retList.push(<div className="landingPadCell" 
                            parentctrlid={domParentCtrlId} 
                            key={"landingPad"+(i * colSpan + j)}
                            {...layoutPos}></div>);
        }
    }

    return retList;
}

// For Dropping from the toolbox or Moving control to a different position
const controlDropTarget = {
    drop(destControl, monitor) {
        let dropObj = monitor.getItem();
        if (dropObj.dndActionType === constants.DND_ACTION_SET_CONTROL_TYPE) {
            destControl.onControlTypeSelected(dropObj.arg);
        }
        else if (dropObj.dndActionType === constants.DND_ACTION_MOVE_CONTROL) {
            let droppedControl = dropObj.arg;
            destControl.onMoveControl(droppedControl, destControl);
        }
        
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        hovered: monitor.isOver(),
        control: monitor.getItem()
    }
}


// var dropTarget = DropTarget('control', controlDropTarget, collect)(NoobControl);
// export default DragSource('control', itemSource, collectDragSrc)(dropTarget);
//export default NoobControl;
export default DropTarget('control', controlDropTarget, collect)(NoobControl);