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
        //debugger;

        if (this.props.selectedType === constants.TYPE_SECTION) {   
            propsEl = this.getSectionProps();  
            applyButton =   this.getApplyButton();    
        }
        else if (this.props.selectedType === constants.TYPE_CONTROL && 
            this.props.selectedControl.type !== '' &&
            this.props.selectedControl.type !== constants.TYPE_CONTROL_NONE) {
            //propsEl = <div>Control selected</div>;
            titleEl = <div className="propsTitle">{getToolItem(this.props.selectedControl.type).displayName + ' Properties'}</div>;
            propsEl = this.getControlProps(this.props.selectedControl);
            applyButton =   this.getApplyButton();
        }
        else {
            // if nothing is selected, display message
            propsEl = <Message warning>No Section or Control selected</Message>;
            applyButton = null;
        }
                
        return <div id="controlProps" className="controlPropsPane">{titleEl}{propsEl}{applyButton}</div>;
    }

    getControlProps(selectedControl) {
        debugger
        var style={
            'marginRight': '5px',
            'marginTop': '0px',
            'padding': '0px',
        };

        switch(selectedControl.type) {
            case 'textbox':
                return textboxHelper.renderControlProps(selectedControl, this.props.controlStates, this.textChangedHandler.bind(this));
            case 'combo':
                //return comboboxHelper.renderControlProps(selectedControl, this.props.controlStates);
                return <ComboboxProps controlProps={this.props.controlStates}/>;
            default:
                return null;
        }

        // let ret = <div>
        //     <label className="controlLabel">Control Type:
        //     </label>
        //     <Input size='mini' fluid value={getToolItem(selectedControl.type).displayName}>
        //     </Input>

        //     <label className="controlLabel">Control Name:
        //     </label>
        //     <Input size='mini' fluid value={selectedControl.name}>
        //     </Input>

        //     <label className="controlLabel">Control Label:
        //     </label>
        //     <Input size='mini' fluid value={selectedControl.label}>
        //     </Input>

        //     {/* <label className="formLabel">Control Type:
        //         <input type="text" name="type" className="formInput" value={this.props.controlType} onChange={this.props.ontextChangehandler.bind(this)}/>
        //     </label>
        //     <label className="formLabel">Control Name:
        //         <input type="text" name="name" className="formInput" value={this.props.controlName} onChange={this.props.ontextChangehandler.bind(this)}/>
        //     </label>
        //     <label className="formLabel">Label:
        //         <input type="text" name="label" className="formInput" value={this.props.controlLabel} onChange={this.props.ontextChangehandler.bind(this)}/>
        //     </label>
        //     <label className="formLabel">Row Span:
        //         <input type="text" name="rowSpan" className="formInput" value={this.props.controlRowSpan} onChange={this.props.onNumChangehandler.bind(this)}/>
        //     </label>
        //     <label className="formLabel">Column Span:
        //         <input type="text" name="colSpan" className="formInput" value={this.props.controlColSpan} onChange={this.props.onNumChangehandler.bind(this)}/>
        //     </label> */}
        //     </div>;

        // return ret;
    }

    getSectionProps() {
        let ret = <div>
            <label className="formLabel">Layout Title:
                <input type="text" name="layoutTitle" className="formInput" value={this.props.layoutTitle} onChange={this.props.ontextChangehandler.bind(this)}/>
            </label>
            <label className="formLabel">Number of Columns:
                <input type="text" name="layoutColumns" className="formInput" value={this.props.layoutColumns} onChange={this.props.onNumChangehandler.bind(this)}/>
            </label>
            <label className="formLabel">Number of Rows:
                <input type="text" name="layoutRows" className="formInput" value={this.props.layoutRows} onChange={this.props.onNumChangehandler.bind(this)}/>
            </label>
            </div>;

        return ret;
    }    

    getApplyButton() {
        return <button type="button" onClick={() => this.props.onApplyClicked(this.props)} className="formButton">Apply</button>;
    }

    textChangedHandler(e, data) {
        debugger
        this.props.controlStates[e.target.name] = e.target.value;
    }
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

        // controlRowSpan: state.controlProps.controlStates.rowSpan,
        // controlColSpan: state.controlProps.controlStates.colSpan,
        // controlLabel: state.controlProps.controlStates.label,
        // controlName: state.controlProps.controlStates.name,
        // controlType: state.controlProps.controlStates.type,
    }
}

// These will become the props of this component
const mapDispatchToProps = (dispatch) => {
    return {
        // 'this' is undefined here because it is outside the scope of the class
        // so in order to access the props, we pass is as a parameter
        // Option B is to use mergeProps of redux
        onApplyClicked: (props) => {
            //debugger
            // TODO: do some validation
            // (1) If section # of row/col is changed, make sure there is there are empty columns or empty rows
            
            dispatch({
                type: 'APPLY_PROPS',
                controlId: props.selectedControl.controlId,
                controlRowSpan: props.controlRowSpan,
                controlColSpan: props.controlColSpan,
                controlLabel: props.controlLabel,
                controlName: props.controlName,
                controlType: props.controlType,
                selectedType: constants.TYPE_CONTROL

                // title: props.layoutTitle,
                // layoutRows: props.layoutRows,
                // layoutColumns: props.layoutColumns
            })
      },

      ontextChangehandler: (e) => {
        //debugger
        dispatch(
            {
                type: 'SET_CONTROL_TEXT_CHANGE', 
                controlName: e.target.name,
                controlValue: e.target.value,
            });
      },
      onNumChangehandler: (e) => {
        //debugger
        dispatch(
            {
                type: 'SET_CONTROL_NUMTEXT_CHANGE', 
                controlName: e.target.name,
                controlValue: e.target.value,
            });
      }
    }
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(ControlPropsPane);