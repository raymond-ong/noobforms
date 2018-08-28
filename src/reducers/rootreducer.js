/*
const initialState = {
    selectedControl: null,
    layoutRows: 10,
    layoutColumns: 3,
}


const reducer = (state = initialState, action) => {
    const newState = {...state};
    switch(action.type) {
    case 'APPLY_PROPS':
        debugger
        console.log(`[reducer] APPLY_PROPS`);
        break;
    
    }

    return newState;
};

export default reducer;
*/

import { combineReducers } from 'redux'
import designer from './designerReducer' // Note: this naming affects the property of the state inside the container's mapToXXX
import controlProps from './controlPropsReducer';
//import appSplitPane from './appReducer';
//import noobControl from './noobControlReducer';

const noobApp = combineReducers({    
    controlProps,
    designer, 
    //appSplitPane
    //noobControl
})

export default noobApp
