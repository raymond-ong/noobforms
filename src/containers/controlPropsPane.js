import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux';
import * as constants from '../constants';
import '../styles/controlProps.css';
import '../styles/labelHelper.css';
import { Message } from 'semantic-ui-react';
import {getToolItem} from '../components/toolbox';
import * as textboxHelper from '../helpers/controlhelpers/textboxHelper';
import * as comboboxHelper from '../helpers/controlhelpers/comboboxHelper';
import ComboboxProps from '../helpers/controlprops/comboboxProps';

class ControlPropsPane extends Component {
    render() {
        let propsEl = null;
        let applyButton = null;
        let titleEl = null;
        this.currProps = null; // For holding the current state inputted by the user, prior to clicking Apply

        if (this.props.selectedType === constants.TYPE_SECTION) {   
            propsEl = this.getSectionProps();  
            applyButton =   this.getApplyButton();    
        }
        else if (this.props.selectedType === constants.TYPE_CONTROL && 
            this.props.selectedControl.type !== '' &&
            this.props.selectedControl.type !== constants.TYPE_CONTROL_NONE) {
            titleEl = <div className="propsTitle">{getToolItem(this.props.selectedControl.type).displayName + ' Properties'}</div>;
            this.propsEl = this.getControlProps(this.props.selectedControl);
            applyButton =   this.getApplyButton();
        }
        else {
            // if nothing is selected, display message
            propsEl = <Message warning>No Section or Control selected</Message>;
            applyButton = null;
        }
                
        return <div id="controlProps" className="controlPropsPane">{titleEl}{this.propsEl}{applyButton}</div>;
    }

    getControlProps(selectedControl) {
        var style={
            'marginRight': '5px',
            'marginTop': '0px',
            'padding': '0px',
        };

        let controlPropsEl = null;

        switch(selectedControl.type) {
            // case 'textbox':
            //     return textboxHelper.renderControlProps(selectedControl, this.props.controlStates, this.textChangedHandler.bind(this));
            case 'combo':
                controlPropsEl = <ComboboxProps controlProps={this.props.controlStates} onCurrPropsChanged={this.onCurrPropsChanged.bind(this)}/>;
                //return comboboxHelper.renderControlProps(selectedControl, this.props.controlStates);
                break;
            default:
                break;
        }


        return controlPropsEl;
    }

    onCurrPropsChanged(controlProps) {
        // pass in all the controlProps
        this.currProps = controlProps;
    }

    getApplyButton() {
        return <button type="button" onClick={() => this.props.onApplyClicked(this.props, this.currProps)} className="formButton">Apply</button>;
    }

    // textChangedHandler(e, data) {
    //     this.props.controlStates[e.target.name] = e.target.value;
    // }
}

// These will become the props of this component
// These props come from the reducer
const mapStateToProps = (state) => {
    //debugger
    return {
        selectedType: state.controlProps.selectedType,
        selectedControl: state.controlProps.selectedControl,
        selectedSection: state.controlProps.selectedSection,

        // make a copy of the control or section's props instead of directly binding to the selected control's props
        // because we want to pass the changes only when the Apply button is clicked
        controlStates: state.controlProps.controlStates
    }
}

// These will become the props of this component
const mapDispatchToProps = (dispatch) => {
    return {
        // 'this' is undefined here because it is outside the scope of the class
        // so in order to access the props, we pass is as a parameter
        // Option B is to use mergeProps of redux
        onApplyClicked: (props, currProps) => {
            //debugger
            // TODO: do some validation
            // (1) If section # of row/col is changed, make sure there is there are empty columns or empty rows
            // Get the props entered from the control props helper
            debugger
            dispatch({
                type: 'APPLY_PROPS',
                selectedControl: currProps,
                selectedType: constants.TYPE_CONTROL
                // controlId: props.selectedControl.controlId,
                // controlRowSpan: props.controlRowSpan,
                // controlColSpan: props.controlColSpan,
                // controlLabel: props.controlLabel,
                // controlName: props.controlName,
                // controlType: props.controlType,
                // selectedType: constants.TYPE_CONTROL

                // title: props.layoutTitle,
                // layoutRows: props.layoutRows,
                // layoutColumns: props.layoutColumns
            })
      },

    //   ontextChangehandler: (e) => {
    //     //debugger
    //     dispatch(
    //         {
    //             type: 'SET_CONTROL_TEXT_CHANGE', 
    //             controlName: e.target.name,
    //             controlValue: e.target.value,
    //         });
    //   },
    //   onNumChangehandler: (e) => {
    //     //debugger
    //     dispatch(
    //         {
    //             type: 'SET_CONTROL_NUMTEXT_CHANGE', 
    //             controlName: e.target.name,
    //             controlValue: e.target.value,
    //         });
    //   }
    }
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(ControlPropsPane);