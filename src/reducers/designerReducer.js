// How does the designer pane get these initial state??
// => declared in the rootReducer's combineReducer
// In the mapStateToProps of the Designer Pane, it is setting the local props from state.designer.xxx
import * as constants from '../constants';
import {getToolItem} from '../components/toolbox';

let lastControlId = 0;
let letSectionId = 0;

const createDefaultControls = (sectIdIn) => {
    let ret = [];
    for (let iRow = 0; iRow < constants.defaultNumRows; iRow++) {
        for (let iCol = 0; iCol < constants.defaultNumColumns; iCol++) {
            ret.push(createControl(iRow, iCol, sectIdIn));
        }
    }

    return ret;
}

function createControl(iRow, iCol, sectIdIn) {
    return {
        type: 'none',
        selected: false,
        sectId: sectIdIn,
        rowSpan: 1,
        colSpan: 1,
        name: '', // put an empty string instead of null...textbox control does not bind properly if null
        label: '',
        controlId: lastControlId++,
        x: iCol,
        y: iRow
    }
}

const defaultSection = {
    title: 'Section A',
    layoutRows: constants.defaultNumRows,
    layoutColumns: constants.defaultNumColumns,
    sectId: letSectionId++,
    controls: createDefaultControls(0),
    
    //TODO childSections: []
}

const initialState = {
    selectedControlId: null, // to make it easier to find the selected control when applying new props
    resizingControlId: null,
    resizingEvent: null,
    sections: [
        defaultSection,
    ]
}

function findSelectedControl(sections, selectedControl) {
    if (!sections || !selectedControl) {
        return null;
    }
    let sectContainer = sections.filter(x => x.sectId === selectedControl.props.sectId);
    if (!sectContainer || sectContainer.length !== 1 || !sectContainer[0].controls) {
        return null;
    }
    return sectContainer[0].controls.filter(x => x.keyId === selectedControl.props.keyId);
}

function findControlById(state, inputControlId) {
    // find each section for the control
    //debugger
    let retObj = null;
    let findId = inputControlId; // todo: closure stuff...let-variables are accessible from inner functions
    state.sections.forEach(section => {
        var controls = section.controls;
        var foundControl = controls.find(control =>  control.controlId === findId);
        if (foundControl) {
            retObj = foundControl;
            return; // break
        }
    });

    return retObj;
}

function getSection(sectId, state) {
    if (!state || !state.sections) {
        return null;
    }

    return state.sections.find(section => {
        return section.sectId === sectId
    })
}

// x,y: coordinate of control resized
// rowSpan, colSpan: new size of the  control
// Omit controls that are covered by the resized control
function getNewControls(section, updatedControl) {
    let affectedXStart = updatedControl.x;
    let affectedXEnd = updatedControl.x + updatedControl.colSpan - 1;
    let affectedYStart = updatedControl.y;
    let affectedYEnd = updatedControl.y + updatedControl.rowSpan - 1;

    let retList = []; // controls returned must be arranged according to index
    let retControlMap = {}; // to ease sorting the list to be returned
    let xyMap = []; // to help check gaps
    // Add back the updatedControl and other controls not affected
    section.controls.forEach(control => {
        if (control.x < affectedXStart || control.x > affectedXEnd ||
            control.y < affectedYStart || control.y > affectedYEnd || 
            control.controlId === updatedControl.controlId) {
                retControlMap[control.y * section.layoutColumns + control.x] = control;
                populateXyMap(xyMap, control, section);
            }        
    })

    // Create new controls as necessary -- if size was reduced or reshaped
    // Idea: Check if we still fulfill the rowSpan and colSpan; then find gaps and fill up
    for (let iRow = 0; iRow < section.layoutRows; iRow++) {
        for (let iCol = 0; iCol < section.layoutColumns; iCol++) {
            let index = iRow * section.layoutColumns + iCol;
            if (xyMap[index] === 1) {
                retList.push(retControlMap[index])
            }
            if (xyMap[index] > 0) {
                continue; // either there is a control, or this area is within the span of a control
            }

            // We need to create a new control
            retList.push(createControl(iRow, iCol, section.sectId));            
        }
    }
    
    return retList;
}

function populateXyMap(xyMap, control, section) {
    let xStart = control.x;
    let xEnd = control.x + control.colSpan;
    let yStart = control.y;
    let yEnd = control.y + control.rowSpan;

    //console.log(`[DEBUG][populateXyMap][start] ${control.controlId}`);
    for (let iRow = yStart; iRow < yEnd; iRow++) {
        for (let iCol = xStart; iCol < xEnd; iCol++) {
            let index = iRow * section.layoutColumns + iCol;
            // 1: if this is the control's start X,Y
            // 2: if this index is within the scope of the control's additional span
            // undefined: gap
            xyMap[index] = iRow === yStart && iCol === xStart ? 1 : 2; 
            //console.log(`[DEBUG][populateXyMap] ${index}`);
        }
    }
}

function reconstructXyAftResize(state, updatedControl, newSize) {
    if (!state || !state.sections || !updatedControl || updatedControl.sectId === null) {
        return null;
    }

    let sectionUpdated = getSection(updatedControl.sectId, state);
    if (!sectionUpdated || !sectionUpdated.controls) {
        return;
    }

    sectionUpdated.controls = getNewControls(sectionUpdated, updatedControl);
}

function selectControl(state, newSelectedControlId) {
    let oldSelectedControl = findControlById(state, state.selectedControlId);
    if (oldSelectedControl !== null) {
        oldSelectedControl.selected = false;
    }

    state.selectedControlId = newSelectedControlId;
    let newSelectedControl = findControlById(state, newSelectedControlId);
    if (newSelectedControl !== null) {
        newSelectedControl.selected = true;
    }
}

function generateDefaultName(type, sections) {
    let i = 0;
    while(true) {
        let currName = type + i;
        if (!nameExists(currName, sections)) {
            return currName;
        }
        i++;
    }
}

function nameExists(name, sections) {
    return sections.find(sect => sect.controls.find(ctrl => ctrl.name === name));
}

function exchangePositions(sections, control1, control2) {
    // TODO: consider exchanging positions between 2 sections
    // Exchange the properties
    let tempX = control2.x;
    let tempY = control2.y;
    control2.x = control1.x;
    control2.y = control1.y;
    control1.x = tempX;
    control1.y = tempY;

    // Swap the elements in the section
    // Assume 1 section only for now
    let section = sections[0];
    let control1Idx = section.controls.indexOf(control1);
    let control2Idx = section.controls.indexOf(control2);
    let tempObj = control1;
    section.controls[control1Idx] = control2;
    section.controls[control2Idx] = tempObj;
}

const reducer = (state = initialState, action) => {
    const newState = {...state};
    switch(action.type) {
    case 'APPLY_PROPS':
        debugger
        // TODO: do validation like duplicate name checking here
        // state.error = '...' --> there should be a component that renders an error message if the state has errors        
        if (action.selectedType === constants.TYPE_CONTROL) {
            newState.sections = [...state.sections];
            let appliedControl = findControlById(newState, newState.selectedControlId);
            if (appliedControl === null) {
                break;
            }
            //let appliedControlIdx = section.controls.indexOf(control1);
            //appliedControl = {...action.selectedControl};            
            appliedControl.name = action.selectedControl.name;
            appliedControl.label = action.selectedControl.label;
            // TODO: re-calculate the X and Y positions if necessary
        }
        else {
        }

        break;   
    case 'SELECT_CONTROL': 
        // if new Selected ControlId is the same as old selected ControlId, do nothing
        if (newState.selectedControlId === action.control.controlId) {
            break;
        }

        newState.sections = [...state.sections];
        selectControl(newState, action.control.controlId);
        
        break;
    case 'SET_CONTROL_TYPE':
        console.log('[Designer Reducer] SET_CONTROL_TYPE...');
        newState.sections = [...state.sections];
        let selectedControl  = findControlById(newState, action.selectedControl.controlId);
        if (selectedControl === null) {
            break;
        }
        selectedControl.type = action.controlType.name;
        selectedControl.name = generateDefaultName(selectedControl.type, newState.sections);
        selectedControl.label = selectedControl.name;

        // Also set this as selected
        selectControl(newState, selectedControl.controlId);
        break;
    case 'RESIZE_CONTROL_START':
        //debugger
        //newState.sections = [...state.sections];
        // TODO: Currently, all the controls are re-rendering whenever resizing events are fired
        // Maybe we can only re-render affected controls if we update only the affected controls here...
        // So maybe track resizingControl/resizingEvennt inside each control
        newState.resizingControlId = action.control.controlId;
        //newState.sections = [...state.sections]; // force the section to re-render...to avoid side effects with control selection...TODO optimize this
        break;
    
    case 'SECTION_MOUSE_UP':
        let resizingControl = findControlById(newState, newState.resizingControlId);
        newState.resizingControlId = null;        
        //newState.sections = [...state.sections];
        if (action.newSize) {
            console.log(`[DEBUG][SECTION_MOUSE_UP][New Size: ${action.newSize.newRows} ${action.newSize.newCols}] `);            
            if (resizingControl === null) {
                break;
            }

            resizingControl.rowSpan = action.newSize.newRows;
            resizingControl.colSpan = action.newSize.newCols;

            // TODO: re-calculate the X and Y positions
            reconstructXyAftResize(state, resizingControl, action.newSize);
        }
        break;
    case 'RESIZING_STOP':
        newState.resizingControl = null;
        newState.resizingEvent = null;

        break;
    case 'MOVE_CONTROL':
        newState.sections = [...state.sections];
        let control1 = findControlById(newState, action.droppedControl.controlId);
        let control2 = findControlById(newState, action.destControl.controlId);
        exchangePositions(newState.sections, control1, control2);
        break;
    }

    return newState;
};

export default reducer;