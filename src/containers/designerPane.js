import React, { Component } from 'react';
import {connect} from 'react-redux';
import NoobSectionList from '../components/noobSectionList';
import '../App.css';


// These will become the props of this component
const mapStateToProps = (state) => {
    return {
        sections: state.designer.sections,
        resizingControlId: state.designer.resizingControlId
    }
}

// These will become the props of this component
const mapDispatchToProps = (dispatch) => {
    return {
        onSelectControl: (control) => {
            //debugger
            dispatch({
                type: 'SELECT_CONTROL',
                // pass the entire control, not just the ID, because we need to display the control props 
                // in the Control Props pane
                control 
            });
        },

        onResizerMouseDown: (control, e) => {
            console.log('[DEBUG][RESIZERMOUSEDOWN] control:' + control.controlId);
            dispatch({
                type: 'RESIZE_CONTROL_START',
                control
            });
            
        },

        onSectionMouseUp: (sectId, e, newSize) => {
            console.log('[DEBUG][SECTIONMOUSEUP] sectid:' + sectId);
            dispatch({
                type: 'SECTION_MOUSE_UP',
                sectId,
                newSize
            });
        },

        /* No need to track the mouse movement here, since the mouse movement will not 
            cause a permanent state change
        onSectionMouseMove: (sectId, e) => {
            // Ideally: dispatch only if there is control that is resizing
            // console.log('[DEBUG][SECTIONMOUSE MOVE] sectid:' + sectId);
            dispatch({
                type: 'SECTION_MOUSE_MOVE',
                sectId, // to let the neighbouring controls that they are potentially affected
                mouseMoveEvent: e
            });

        }
        */
    }
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(NoobSectionList);