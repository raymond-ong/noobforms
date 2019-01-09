import React, { Component } from 'react';
import '../styles/noobSection.css';
import NoobControl from './noobControl';

function sectionMouseMoveHandler(e, resizingControlId, controlIds, resizingControlObject) {
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
    let rectResizing = domControl.content.getClientRects()[0];
    //console.log(`[DEBUG][RESIZER][L-R: ${rectResizing.left} - ${rectResizing.right}][T-B: ${rectResizing.top} - ${rectResizing.bottom}]`);

    // Check overlaps with other controls
    checkOverlaps(resizingControlId, rectResizing, controlIds); // overlap with other controls

    // Check overlaps with landing pad
    checkLandingPadOverlap(resizingControlId, rectContainer, rectResizing, resizingControlObject);
}

function checkLandingPadOverlap(resizingControlId, rectContainer, rectResizing, resizingControlObject) {
    // will only take effect if the resizing rect's height or width is smaller than the container
    if (rectContainer.width <= rectResizing.width && 
        rectContainer.height <= rectResizing.height) {
            removeAllLandingPadPotentialDrops();
            return;
    }    
    
    let landingPadsDom = findLandingPadsByParentControl(resizingControlId);
    //console.log('[DEBUG] checkLandingPadOverlap...' + landingPadsDom.length);
    //debugger
    // check if resizing rect covers me
    landingPadsDom.forEach(landingPad => {
        let rectLandingPad = landingPad.getClientRects()[0];
        let isOverlapped = hasOverlap(rectResizing, rectLandingPad);
        if (isOverlapped) {
            landingPad.classList.add('landingPadPotentialDrop');
        }
        else if (landingPad.classList.contains('landingPadPotentialDrop')) {
            landingPad.classList.remove('landingPadPotentialDrop');
        }
    });
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
    
    console.log('[DEBUG][sectionMouseUpHandler]' + resizingControlId);

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

    // Remove all the landing pads also
    removeAllLandingPadPotentialDrops();

}

function removeAllLandingPadPotentialDrops() {
    let landingPadPotDrops = document.getElementsByClassName('landingPadPotentialDrop');
    if (landingPadPotDrops.length > 0) {
        //debugger
        // console.log('[DEBUG] removeAllLandingPadPotentialDrops' + landingPadPotDrops.length);
    }

    while (landingPadPotDrops.length > 0) {
        let currPad = landingPadPotDrops[0];
        currPad.classList.remove('landingPadPotentialDrop');
    }
}

function calculateNewSize(resizingControlId, controlIds) {
    // check how many of the controls have the 'potentialResizeDrop' class in their DOM
    if (resizingControlId === null) {
        return;
    }
    
    console.log('[DEBUG][calculateNewSize]' + resizingControlId);

    let resizedControlDom = findControlDomById(resizingControlId);

    let domControls = findPotentialDrops();
    if (!domControls || !resizedControlDom || domControls.length === 0) {
        return null; // means control was not resized
    }
    
    let maxX = 0;
    let maxY = 0;
        
    // TODO: of syntax is not supported in Edge
    for (let i = 0; i < domControls.length; i++) {
        let currControl = domControls[i];
        let currX = parseInt(currControl.dataset.layoutx);
        let currY = parseInt(currControl.dataset.layouty);
        if (currX && currX > maxX) {
            maxX = currX;
        }
        if (currY && currY > maxY) {
            maxY = currY;
        }
    };

    return {
        // newCols: newX - resizedControlDom.container.dataset.layoutx - resizedControlDom.container.dataset.colspan + 1 + 1,
        // newRows: newY - resizedControlDom.container.dataset.layouty - resizedControlDom.container.dataset.rowspan + 1 + 1,
        // no need to include rowspan...we will eventually disallow resizing into a "blank control"
        newCols: maxX - resizedControlDom.container.dataset.layoutx + 1,
        newRows: maxY - resizedControlDom.container.dataset.layouty + 1,
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
    ret.landingPad = ret.resizer.nextSibling;

    return ret;    
}

function findLandingPadsByParentControl(controlId) {
    let ret = {};
    let keyQuery = `[parentctrlid="ctrl${controlId}"]`;
    return document.querySelectorAll(keyQuery);
}

function findPotentialDrops() {
    let retList = [];
    retList.push(...document.getElementsByClassName("potentialResizeDrop"));
    retList.push(...document.getElementsByClassName("landingPadPotentialDrop"));
    return retList;
}

function getControlObject(controlId, controls) {
    if (controlId === null) {
        return null;
    }
    
    return controls.find(control => {
        return control.controlId === controlId;
    })
}

// use destructuring to capture all the properties passed from upper component
const NoobSection = ({controls, title, layoutRows, layoutColumns, sectId, resizingControlId,
                    onSelectControl, onResizerMouseDown, onSectionMouseUp, onControlTypeSelected, onMoveControl}) => {
    let controlComps = controls.map((control) => {
        return <NoobControl 
                key={'ctrl' + control.controlId} 
                {...control}
                onSelectControl={() => onSelectControl(control)}
                onResizerMouseDown={(e) => onResizerMouseDown(control, e)}
                onControlTypeSelected={(controlType) => onControlTypeSelected(controlType, control)}
                onMoveControl={(droppedControl, destControl) => onMoveControl(droppedControl, destControl)}
        />
    })

    let controlIds = controls.map(control => control.controlId);
    let resizingControlObject = getControlObject(resizingControlId, controls);

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
            sectionMouseMoveHandler(e, resizingControlId, controlIds, resizingControlObject)
        }
    }
    >
        {controlComps}
    </div>    
    </div>
    )   
}

export default NoobSection;