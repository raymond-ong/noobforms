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
        name: '',
        textboxStates: {},
        comboStates: {}
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
            //debugger
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
            newState.selectedControl = action.control;
            // newState.controlStates.rowSpan = action.control.rowSpan;
            // newState.controlStates.colSpan = action.control.colSpan;
            // newState.controlStates.name = action.control.name;
            // newState.controlStates.label = action.control.label;
            // newState.controlStates.type = action.control.type;
            break;
        case 'SET_CONTROL_TYPE':
            console.log('[DEBUG][Control Props Reducer][SET_CONTROL_TYPE]');
            newState.selectedType = constants.TYPE_CONTROL;
            newState.selectedControl = {...action.selectedControl};
            newState.selectedControl.type = action.controlType.name;
            newState.controlStates = {...newState.controlStates,
                type: constants.TYPE_CONTROL,
                rowSpan: action.selectedControl.rowSpan,
                colSpan: action.selectedControl.colSpan,
                label: action.selectedControl.label,
                name: action.selectedControl.name,                
            }
            break;
        default:
            break;
    }        
    
    return newState;
};

export default reducer;