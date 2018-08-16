import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux'

class ControlPropsPane extends Component {
    render() {
        // TODO: this will evolve based on the selected control type
        return <div id="controlProps">
            <div><b>Properties</b></div>
            <label className="formLabel">Layout Title:
                <input type="text" name="layoutTitle" className="formInput" value={this.props.layoutTitle} onChange={this.props.ontextChangehandler.bind(this)}/>
            </label>
            <label className="formLabel">Number of Columns:
                <input type="text" name="layoutColumns" className="formInput" value={this.props.layoutColumns} onChange={this.props.onNumChangehandler.bind(this)}/>
            </label>
            <label className="formLabel">Number of Rows:
                <input type="text" name="layoutRows" className="formInput" value={this.props.layoutRows} onChange={this.props.onNumChangehandler.bind(this)}/>
            </label>
            <button type="button" onClick={() => this.props.onApplyClicked(this.props)} className="formButton">Apply</button>
        </div>;
    }
}

// These will become the props of this component
const mapStateToProps = (state) => {
    // debugger
    return {
        layoutRows: state.controlProps.layoutRows,
        layoutColumns: state.controlProps.layoutColumns,
        layoutTitle: state.controlProps.layoutTitle
    }
}

// These will become the props of this component
const mapDispatchToProps = (dispatch) => {
    return {
        // 'this' is undefined here because it is outside the scope of the class
        // so in order to access the props, we pass is as a parameter
        // Option B is to use mergeProps of redux
        onApplyClicked: (props) => {
            debugger        
            dispatch({
                type: 'APPLY_PROPS',
                title: props.layoutTitle,
                layoutRows: props.layoutRows,
                layoutColumns: props.layoutColumns
            })
      },

      ontextChangehandler: (e) => {
        //debugger
        dispatch(
            {
                type: 'SET_TEXT_CHANGE', 
                controlName: e.target.name,
                controlValue: e.target.value,
            });
      },
      onNumChangehandler: (e) => {
        //debugger
        dispatch(
            {
                type: 'SET_NUMTEXT_CHANGE', 
                controlName: e.target.name,
                controlValue: e.target.value,
            });
      }
    }
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(ControlPropsPane);