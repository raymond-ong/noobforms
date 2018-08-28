import React, { Component } from 'react';
import {connect} from 'react-redux';
import NoobSection from '../components/noobSection';
import '../App.css';

class DesignerPane extends Component {
    render() {
        //debugger
        // Draw the designer based on the (initial) settings
        // Loop through each section and display them
        let sects = [];
        let i = 0;
        this.props.sections.forEach(sect => {
            sects.push(<NoobSection key={'sect'+i++} 
                        numRows={sect.layoutRows} 
                        numCols={sect.layoutColumns}
                        controls={sect.controls}
                        sectId={sect.sectId}
                        title={sect.title}></NoobSection>)
        });
                    
        return <div id="designer">{sects}</div>        
    }
}

// These will become the props of this component
const mapStateToProps = (state) => {
    return {
        selectedControl: state.designer.selectedControl,
        title: state.designer.title,
        sections: state.designer.sections
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
  
export default connect(mapStateToProps, mapDispatchToProps)(DesignerPane);