const initialState = {
    colspan: 1,
    rowspan: 1,
    controlType: 'none',    
}


const reducer = (state = initialState, action) => {
    const newState = {...state};
    switch(action.type) {
    case 'SET_CONTROL_PROPS':
        //debugger
        break;    
    }

    return newState;
};

export default reducer;