import React, { Component } from 'react';
import '../styles/noobSection.css';
import NoobControl from './noobControl';

function sectionMouseMoveHandler(e, resizingControlId, controlIds) {
    if (resizingControlId === null) {
        return;
    }    

    let domControl = findControlDomById(resizingControlId);
    if (domControl === null) {
        return;
    }

    if (!domControl.container.classList.contains('resizingControl')) {
        domControl.container.classList.add('resizingControl');
        domControl.content.classList.add('resizingContent');
    }        

    let rectContainer = domControl.container.getClientRects()[0];

    let yDelta = e.clientY - rectContainer.bottom - 20;
    let xDelta = e.clientX - rectContainer.right - 20;
      
    //console.log(`[DEBUG][sectionMouseMoveHandler][id=${resizingControlId}][${e.clientX}]vs[${domControl.container}]`);
    //console.log(`[DEBUG][e.clientX:${e.clientX}][rectX:${rectContainer.x}][rectR:${rectContainer.right}][xDelta:${xDelta}]`);
    domControl.content.style.width = `${rectContainer.width + xDelta}px`;
    domControl.content.style.height = `${rectContainer.height + yDelta}px`;

    // TODO: Find the dom of each control, and get each of their rects.
    // Check if there is an overlap with the resized control.
    // If any of the overlaps is invalid (e.g. there is a control that is not 'none'), do not allow resizing 
    rectContainer = domControl.content.getClientRects()[0];
    //console.log(`[DEBUG][RESIZER][L-R: ${rectContainer.left} - ${rectContainer.right}][T-B: ${rectContainer.top} - ${rectContainer.bottom}]`);

    checkOverlaps(resizingControlId, rectContainer, controlIds);

}

function checkOverlaps(resizingControlId, rectResizing, controlIds) {
    controlIds.forEach((controlId) => {       
        if (resizingControlId === controlId) {
            return; // continue
        }
        let domControl = findControlDomById(controlId);
        if (domControl === null) {
            return;
        }

        let rectContainer = domControl.container.getClientRects()[0];

        if (controlId === 5) {
            //console.log(`[DEBUG][CTRL5][L-R: ${rectContainer.left} - ${rectContainer.right}][T-B: ${rectContainer.top} - ${rectContainer.bottom}]`);
        }
        
        let isOverlap = hasOverlap(rectResizing, rectContainer);
        if (isOverlap) {
            domControl.container.classList.add('potentialResizeDrop');
        }
        else if (domControl.container.classList.contains('potentialResizeDrop')) {

            domControl.container.classList.remove('potentialResizeDrop');
        }
        
        //debugger
    } );
}

function hasOverlap(rect1, rect2) {
    let buffer = 20;
    let horzCollision = (rect2.left >= rect1.left) && (rect2.left <= rect1.right);
    let vertCollision = (rect2.top >= rect1.top) && (rect2.top <= rect1.bottom);

    return horzCollision && vertCollision;
}

function sectionMouseUpHandler(resizingControlId, controlIds) {
    if (resizingControlId === null) {
        return;
    }
    
    console.log('[DEBUG][sectionMouseMoveHandler]' + resizingControlId);

    controlIds.forEach( currCtrlId => {
        let domControl = findControlDomById(currCtrlId);
        if (domControl === null) {
            return;
        }

        domControl.container.classList.remove('potentialResizeDrop');

        if (currCtrlId === resizingControlId) {
            domControl.container.classList.remove('resizingControl');
            domControl.content.classList.remove('resizingContent');
            domControl.content.style.height = domControl.container.style.height;
            domControl.content.style.width = domControl.container.style.width;    
        }
    });
}

function calculateNewSize(resizingControlId, controlIds) {
    // check how many of the controls have the 'potentialResizeDrop' class in their DOM
    if (resizingControlId === null) {
        return;
    }
    
    console.log('[DEBUG][sectionMouseMoveHandler]' + resizingControlId);

    let resizedControlDom = findControlDomById(resizingControlId);

    let domControls = findPotentialDrops();
    if (!domControls || !resizedControlDom) {
        return null; // means control was not resized
    }
    
    let newX = 0;
    let newY = 0;
        
    for (let currControl of domControls) {
        let currX = parseInt(currControl.dataset.layoutx);
        let currY = parseInt(currControl.dataset.layouty);
        if (currX && currX > newX) {
            newX = currX;
        }
        if (currY && currY > newY) {
            newY = currY;
        }
    };

    debugger

    return {
        newCols: newX - resizedControlDom.container.dataset.layoutx - resizedControlDom.container.dataset.colspan + 1 + 1,
        newRows: newY - resizedControlDom.container.dataset.layouty - resizedControlDom.container.dataset.rowspan + 1 + 1,
    }

}

function findControlDomById(controlId) {
    let ret = {};
    let keyQuery = `[id="ctrl${controlId}"]`;
    let retEl = document.querySelectorAll(keyQuery);
    if (retEl.length !== 1) {
        return null;
    }

    ret.container = retEl[0];
    ret.content = ret.container.firstChild;
    ret.resizer = ret.content.nextSibling;

    return ret;    
}

function findPotentialDrops() {
    return document.getElementsByClassName("potentialResizeDrop");    
}

// use destructuring to capture all the properties passed from upper component
const NoobSection = ({controls, title, layoutRows, layoutColumns, sectId, resizingControlId,
                    onSelectControl, onResizerMouseDown, onSectionMouseUp}) => {
    let controlComps = controls.map((control) => {
        return <NoobControl 
                key={'ctrl' + control.controlId} 
                {...control}
                onSelectControl={() => onSelectControl(control)}
                onResizerMouseDown={(e) => onResizerMouseDown(control, e)}
        />
    })

    let controlIds = controls.map(control => control.controlId);

    var divStyle = {'gridTemplateColumns': `repeat(${layoutColumns}, 1fr)`};
    console.log('[DEBUG][NoobSection] Rendering...');

    return (<div className="noobSectionMain">
    <div className="noobSectionTitle">{title}</div>
    <div className="noobSection" style={divStyle}
        onMouseUp={            
            (e) => {
                let newSize = calculateNewSize(resizingControlId);
                onSectionMouseUp(sectId, e, newSize); // callback
                sectionMouseUpHandler(resizingControlId, controlIds);
            }
        }
        // No need to propagate the mouse move event to the parent
        // Mouse moves do not change the state anyway, just handle here using DOM Manipulation
        onMouseMove = {(e) => {
            sectionMouseMoveHandler(e, resizingControlId, controlIds)
        }
    }
    >
        {controlComps}
    </div>    
    </div>
    )   
}

export default NoobSection;