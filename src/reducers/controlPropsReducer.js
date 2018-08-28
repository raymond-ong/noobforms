import * as constants from '../constants';

const initialState = {    
    selectedType: null, // either a control, section or null
    selectedControl: null,    
    selectedSection: null,

    // control states of the selected control
    controlStates: {
        type: 'none', 
        rowSpan: 0,
        colSpan: 0,
        label: '',
        name: ''
    }

    // section states of the selected section
}

const reducer = (state = initialState, action) => {
    const newState = {...state};
    switch(action.type) {
        case 'APPLY_PROPS':
            // Do some Validation?
            // Just ask the desginer to update itself
            // Or just let the designer to listen to this event
            break;
        case 'SET_CONTROL_NUMTEXT_CHANGE':
            // allow empty string or any valid number
            if (action.controlValue.length === 0) {
                newState.controlStates[action.controlName] = "";
                break;
            }
            let numVal = parseInt(action.controlValue);
            if (!isNaN(numVal)) {
                newState.controlStates[action.controlName] = numVal;
            }
            
            break;
        case 'SET_CONTROL_TEXT_CHANGE':
            newState.controlStates[action.controlName] = action.controlValue;
            break;

        case 'SELECT_CONTROL':
            // Repopulate the control proprties pane based on what was selected
            //debugger
            newState.selectedType = constants.TYPE_CONTROL;
            newState.selectedControl = action.selectedControl;
            newState.controlStates.rowSpan = action.selectedControl.props.rowSpan;
            newState.controlStates.colSpan = action.selectedControl.props.colSpan;
            newState.controlStates.name = action.selectedControl.props.name;
            newState.controlStates.label = action.selectedControl.props.label;
            newState.controlStates.type = action.selectedControl.props.type;
            break;
        default:
            break;
    }        
    
    return newState;
};

export default reducer;