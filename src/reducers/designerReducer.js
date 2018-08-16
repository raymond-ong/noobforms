// How does the designer pane get these initial state??
// => declared in the rootReducer's combineReducer
// In the mapStateToProps of the Designer Pane, it is setting the local props from state.designer.xxx
const defaultSection = {
    title: 'Section A',
    layoutRows: 5,
    layoutColumns: 3,
    controls: []
    //TODO childSections: []
}

const initialState = {
    selectedControl: null,
    sections: [
        defaultSection,
        defaultSection
    ]    
}


const reducer = (state = initialState, action) => {
    const newState = {...state};
    switch(action.type) {
    case 'APPLY_PROPS':
        debugger
        //newState.selectedControl = newState.sections[0];
        newState.sections = [...state.sections];
        newState.sections[0].title = action.title;
        newState.sections[0].layoutRows = action.layoutRows;
        newState.sections[0].layoutColumns = action.layoutColumns;
        break;    
    }

    return newState;
};

export default reducer;