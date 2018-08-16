import React, { Component } from 'react';
import '../styles/noobControl.css';
import {connect} from 'react-redux'

class NoobControl extends Component {
    render() {        
        return <div className="noobControl" 
                    onClick={this.props.OnControlSelected.bind(this)}>
                </div>;
    }
}

// These will become the props of this component
const mapStateToProps = (state) => {
    // debugger
    return {
        // layoutTitle: state.controlProps.layoutTitle
        type: state.NoobControl
    }
}

// These will become the props of this component
const mapDispatchToProps = (dispatch) => {
    return {
        // 'this' is undefined here because it is outside the scope of the class
        // so in order to access the props, we pass it as a parameter
        // Option B is to use mergeProps of redux
        OnControlSelected: (props) => {
            debugger        
            dispatch({
                type: 'SELECT_CONTROL',
                selectedControl: this,
            })
      },
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(NoobControl);