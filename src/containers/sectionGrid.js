import React, { Component } from 'react';
import {connect} from 'react-redux'

class SectionGrid extends Component {
    render() {
        // Draw the designer based on the (initial settings)
        return <div>Grid1</div>;
    }
}

// These will become the props of this component
const mapStateToProps = (state) => {
    return {
        
    }
}

// These will become the props of this component
const mapDispatchToProps = (dispatch) => {
    return {
    //   onApplyClicked: () => {
    //       dispatch({type: 'APPLY_PROPS'})
    //   }
    }
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(SectionGrid);