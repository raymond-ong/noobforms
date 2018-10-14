import React, { Component } from 'react';
import '../styles/noobSection.css';
import NoobControl from './noobControl';

function sectionMouseMoveHandler(e, resizingControlId, controls) {
    if (resizingControlId === null) {
        return;
    }    

    let domControl = findControlDom(resizingControlId);
    if (domControl === null) {
        return;
    }

    //debugger
    

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
}

function sectionMouseUpHandler(resizingControlId) {
    if (resizingControlId === null) {
        return;
    }
    
    console.log('[DEBUG][sectionMouseMoveHandler]' + resizingControlId);

    let domControl = findControlDom(resizingControlId);
    if (domControl === null) {
        return;
    }

    domControl.container.classList.remove('resizingControl');
    domControl.content.classList.remove('resizingContent');
    domControl.content.style.height = domControl.container.style.height;
    domControl.content.style.width = domControl.container.style.width;
}

function findControlDom(controlId) {
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

// use destructuring to capture all the properties passed from upper component
const NoobSection = ({controls, title, layoutRows, layoutColumns, sectId, resizingControlId,
                    onSelectControl, onResizerMouseDown, onSectionMouseUp, onSectionMouseMove}) => {
    let controlComps = controls.map((control) => {
        return <NoobControl 
                key={'ctrl' + control.controlId} 
                {...control}
                onSelectControl={() => onSelectControl(control)}
                onResizerMouseDown={(e) => onResizerMouseDown(control, e)}
        />
    })

    var divStyle = {'gridTemplateColumns': `repeat(${layoutColumns}, 1fr)`};
    console.log('[DEBUG][NoobSection] Rendering...');

    return (<div className="noobSectionMain">
    <div className="noobSectionTitle">{title}</div>
    <div className="noobSection" style={divStyle}
        onMouseUp={            
            (e) => {
                sectionMouseUpHandler(resizingControlId);
                onSectionMouseUp(sectId, e)
            }
        }
        // No need to propagate the mouse move event to the parent
        // Mouse moves do not change the state anyway, just handle here using DOM Manipulation
        // onMouseMove={(e) => {
        //     //debugger
        //     //onSectionMouseMove(sectId, e)            
        // }}
        onMouseMove = {(e) => {
            sectionMouseMoveHandler(e, resizingControlId, controls)
        }
    }
    >
        {controlComps}
    </div>    
    </div>
    )   
}

export default NoobSection;