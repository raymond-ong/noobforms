// How does the designer pane get these initial state??
// => declared in the rootReducer's combineReducer
// In the mapStateToProps of the Designer Pane, it is setting the local props from state.designer.xxx
import * as constants from '../constants';

const createDefaultControls = (sectIdIn) => {
    let ret = [];
    let id = 0;
    for (let iCol = 0; iCol < constants.defaultNumColumns; iCol++) {
        for (let iRow = 0; iRow < constants.defaultNumRows; iRow++) {
            ret.push({
                type: 'none',
                selected: false,
                sectId: sectIdIn,
                keyId: id++,
                rowSpan: 1,
                colSpan: 1,
                name: '', // put an empty string instead of null...textbox control does not bind properly if null
                label: ''
            });
        }
    }

    return ret;
}

const defaultSection = {
    title: 'Section A',
    layoutRows: constants.defaultNumRows,
    layoutColumns: constants.defaultNumColumns,
    sectId: 0,
    controls: createDefaultControls(0),
    
    //TODO childSections: []
}

const initialState = {
    selectedControl: null,
    sections: [
        defaultSection
    ]
}

function rebuildSections(oldSections, newRows, newColumns) {
    // Assume that validation has been done prior to calling this function
    // -> Already validated that there are empty rows and columns when shrinking the section size
    for (let iSect = 0; iSect < oldSections.length; iSect++) {
        for (let iCol = 0; iCol < newColumns; iCol++) {
            for (let iRow = 0; iCol < newRows; iRow++) {

            }
        }
    }
    
}

function copySections(oldSections, selectedControl) {
    // Assume that validation has been done prior to calling this function
    // -> Already validated that there are empty rows and columns when shrinking the section size
    let retSects = [];
    for (let iSect = 0; iSect < oldSections.length; iSect++) {
        retSects.push({...oldSections[iSect]});
        // let ctrls = [];
        // for (let iCtrl = 0; iCtrl < oldSections[iSect].controls; iCtrl++) {
        //     ctrls.push({...oldSections[iSect].controls[iCtrl]});
        // }

        // retSects.controls = ctrls;
    }
    
    return retSects;
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

const reducer = (state = initialState, action) => {
    const newState = {...state};
    switch(action.type) {
    case 'APPLY_PROPS':
        if (action.selectedType === constants.TYPE_CONTROL) {
            //debugger
            newState.sections = [...state.sections];
            let selectedControl  = findSelectedControl(newState.sections, state.selectedControl);
            if (!selectedControl || selectedControl.length  !== 1) {
                break;
            }
            selectedControl[0].rowSpan = action.controlRowSpan;
            selectedControl[0].colSpan = action.controlColSpan;
            selectedControl[0].label = action.controlLabel;
            selectedControl[0].name = action.controlName;
            selectedControl[0].type = action.controlType;
        }
        else {

        }
        //debugger

        break;   
    case 'SELECT_CONTROL': 
        //debugger
        // set the selected control as selected
        if (state.selectedControl && state.selectedControl.props.sectId === action.selectedControl.props.sectId &&
            state.selectedControl.props.keyId === action.selectedControl.props.keyId) {
                break; // same control
            }
        newState.sections = [...state.sections];
        let oldSelectedControlState = findSelectedControl(newState.sections, state.selectedControl);
        newState.selectedControl = action.selectedControl; // might not be needed anymore...just traverse the controls one by one to see which one has selected=true
        
        let newSelectedControlState = findSelectedControl(newState.sections, action.selectedControl);
        if (newSelectedControlState.length === 1) {
            if (oldSelectedControlState && oldSelectedControlState.length === 1 && 
                (oldSelectedControlState[0].sectId !== newSelectedControlState[0].sectId || oldSelectedControlState[0].keyId !== newSelectedControlState[0].keyId)) {
                    oldSelectedControlState[0].selected = false;
            }
            newSelectedControlState[0].selected = true;
        }
        break;
    case 'SET_CONTROL_TYPE':
        console.log('[Designer Reducer] SET_CONTROL_TYPE...');
        debugger
        newState.sections = [...state.sections];
        let selectedControl  = findSelectedControl(newState.sections, action.selectedControl);
        if (!selectedControl || selectedControl.length  !== 1) {
            break;
        }
        selectedControl[0].type = action.controlType.displayName;    
        break;
    }

    return newState;
};

export default reducer;