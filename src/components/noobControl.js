import React, { Component } from 'react';
import '../styles/noobControl.css';
import {connect} from 'react-redux';
import { DropTarget } from 'react-dnd';

class NoobControl extends Component {
    render() {
        let ctrlClass = 'noobControl';
        if (this.props.selected === true) {
            ctrlClass += ' selectedControl';
        }
        //debugger
        let ctrlStyle = {};
        
        ctrlStyle['height'] = 20 * this.props.rowSpan + 15 * (this.props.rowSpan - 1);
        ctrlStyle['gridRowEnd'] = 'span ' + this.props.rowSpan;
        ctrlStyle['gridColumnEnd'] = 'span ' + this.props.colSpan;
        if (this.props.hovered) {
            ctrlStyle['backgroundColor'] = 'coral';
        }
        //console.log('Noob Control render() for ' + this.props.keyId);

        const {connectDropTarget, hovered, control} = this.props;

        return connectDropTarget(
            <div className={ctrlClass}
                style={ctrlStyle} 
                onClick={ () => this.props.OnControlSelected(this)}>{this.props.keyId} / {this.props.type}
            </div>);
    }
}

// These will become the props of this component
const mapStateToProps = (state) => {
    //debugger
    return {
        // layoutTitle: state.controlProps.layoutTitle
        // type: state.NoobControl,
        // selected: state.selected
        // key: state.props.key        
    }
}

// These will become the props of this component
const mapDispatchToProps = (dispatch) => {
    return {
        // 'this' is undefined here because it is outside the scope of the class
        // so in order to access the props, we pass it as a parameter
        // Option B is to use mergeProps of redux
        OnControlSelected: (selControl) => {
            //debugger
            dispatch({
                type: 'SELECT_CONTROL',
                selectedControl: selControl,
            })
        },
        OnControlTypeSelected: (controlType, selControl) => {
            console.log('OnControlTypeSelected');
            dispatch({
                type: 'SET_CONTROL_TYPE',
                selectedControl: selControl,
                controlType
            })
        }
    };
  };

const controlDropTarget = {
    drop(props, monitor, control) {
        console.log('dropped!!!');
        let controlType = monitor.getItem();
        props.OnControlTypeSelected(controlType, control);
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        hovered: monitor.isOver(),
        control: monitor.getItem()
    }
}

NoobControl = DropTarget('control', controlDropTarget, collect)(NoobControl);
export default connect(mapStateToProps, mapDispatchToProps)(NoobControl);
//export default DropTarget('control', itemSource, collect)(NoobControl);