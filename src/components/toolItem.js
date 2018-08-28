import React, { Component } from 'react';
import {DragSource} from 'react-dnd'
import '../styles/toolbox.css'

class ToolItem extends Component { 
     render() {
          const {connectDragSource, control} = this.props;
          //console.log('render for ToolItem ' + this.props.controlType.displayName);
          //debugger

          return connectDragSource(<div className="toolItem">{this.props.controlType.displayName}</div>);
     }
}

const itemSource = {
     beginDrag(props) {
          //debugger
          return props.controlType
     }
 }
 
 function collect(connect, monitor) {
     return {
         connectDragSource: connect.dragSource(),
         connectDragPreview: connect.dragPreview(),
         //isDragging: monitor.isDragging()
     }
 }
 
 export default DragSource('control', itemSource, collect)(ToolItem);