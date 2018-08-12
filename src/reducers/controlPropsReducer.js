const initialState = {
    layoutRows: 5,
    layoutColumns: 3,
    layoutTitle: 'Layout1'
}

const reducer = (state = initialState, action) => {
    const newState = {...state};
    switch(action.type) {
        case 'APPLY_PROPS':
            // Do some Validation?
            // Just ask the desginer to update itself
            // Or just let the designer to listen to this event
            break;
        case 'SET_NUMTEXT_CHANGE':
            let numVal = parseInt(action.controlValue);
            if (!isNaN(numVal)) {
                newState[action.controlName] = numVal;
            }
            
            break;
        case 'SET_TEXT_CHANGE':
            newState[action.controlName] = action.controlValue;
            break;
        default:
            break;
    }        
    
    return newState;
};

export default reducer;