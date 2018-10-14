// How does the designer pane get these initial state??
// => declared in the rootReducer's combineReducer
// In the mapStateToProps of the Designer Pane, it is setting the local props from state.designer.xxx
import * as constants from '../constants';

let lastControlId = 0;
let letSectionId = 0;

const createDefaultControls = (sectIdIn) => {
    let ret = [];
    for (let iCol = 0; iCol < constants.defaultNumColumns; iCol++) {
        for (let iRow = 0; iRow < constants.defaultNumRows; iRow++) {
            ret.push({
                type: 'none',
                selected: false,
                sectId: sectIdIn,
                rowSpan: 1,
                colSpan: 1,
                name: '', // put an empty string instead of null...textbox control does not bind properly if null
                label: '',
                controlId: lastControlId++,
                resizeEvents: null
            });
        }
    }

    return ret;
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
        controls.forEach(control => {
            if (control.controlId === findId) {
                retObj = control;
                return; // break
            }
        })
    });

    return retObj;
}

function clearControlResizeEvents(state) {
    state.sections.forEach(section => {
        let controls = section.controls;
        controls.forEach(control => {
            if (control.resizeEvents !== null) {
                control.resizeEvents = null;
            }
        })
    })
}

const reducer = (state = initialState, action) => {
    const newState = {...state};
    switch(action.type) {
    case 'APPLY_PROPS':
        if (action.selectedType === constants.TYPE_CONTROL) {
            //debugger
            newState.sections = [...state.sections];
            let selectedControl  = findControlById(newState, action.controlId);
            if (selectedControl === null) {
                break;
            }
            selectedControl.rowSpan = action.controlRowSpan;
            selectedControl.colSpan = action.controlColSpan;
            selectedControl.label = action.controlLabel;
            selectedControl.name = action.controlName;
            selectedControl.type = action.controlType;
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
        let oldSelectedControl = findControlById(newState, newState.selectedControlId);
        if (oldSelectedControl !== null) {
            oldSelectedControl.selected = false;
        }

        newState.selectedControlId = action.control.controlId;
        let newSelectedControl = findControlById(newState, action.control.controlId);
        if (newSelectedControl !== null) {
            newSelectedControl.selected = true;
        }
        
        break;
    case 'SET_CONTROL_TYPE':
        console.log('[Designer Reducer] SET_CONTROL_TYPE...');
        //debugger
        newState.sections = [...state.sections];
        let selectedControl  = findSelectedControl(newState.sections, action.selectedControl);
        if (!selectedControl || selectedControl.length  !== 1) {
            break;
        }
        selectedControl[0].type = action.controlType.displayName;    
        break;
    case 'RESIZE_CONTROL_START':
        //debugger
        //newState.sections = [...state.sections];
        // TODO: Currently, all the controls are re-rendering whenever resizing events are fired
        // Maybe we can only re-render affected controls if we update only the affected controls here...
        // So maybe track resizingControl/resizingEvennt inside each control
        newState.resizingControlId = action.control.controlId;
        newState.sections = [...state.sections]; // force the section to re-render, so that he will know how to handle mouse move
        break;
    
    case 'SECTION_MOUSE_UP':    
        // clear the resizeEvents property of all controls
        newState.sections = [...state.sections];
        clearControlResizeEvents(newState);
        newState.resizingControlId = null;
        break;
    case 'SECTION_MOUSE_MOVE':
        if (newState.resizingControlId === null) {
            return state; // return old state since there is no control resizing
        }

        console.log('[DEBUG][DESIGNER REDUCER][SECTION_MOUSE_MOVE]' + action.mouseMoveEvent.clientX);

        let resizingControl = findControlById(newState, newState.resizingControlId);
        if (resizingControl !== null) {
            newState.sections = [...state.sections];
            resizingControl.resizeEvents = {
                //mouseMoveEvent: action.mouseMoveEvent -- this object would have been disposed when the control receives this
                mouseMoveEvent: {...action.mouseMoveEvent} // workaround to avoid this object from being disposed when the control receives this
            };
        }
        break;
    case 'RESIZING_STOP':
        newState.resizingControl = null;
        newState.resizingEvent = null;

        break;
    }

    return newState;
};

export default reducer;