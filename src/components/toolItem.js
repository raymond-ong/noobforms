import React, { Component } from 'react';
import {DragSource} from 'react-dnd'
import '../styles/toolbox.css'
import { Label } from 'semantic-ui-react'
import * as constants from '../constants';

class ToolItem extends Component { 
     render() {
          const {connectDragSource, control} = this.props;
          //console.log('render for ToolItem ' + this.props.controlType.displayName);
          //debugger

        //   return connectDragSource(<div className="toolItem">{this.props.controlType.displayName}</div>);
          //return connectDragSource(<div className="ui blue label">{this.props.controlType.displayName}</div>);
          //return connectDragSource(<div>{this.props.controlType.displayName}</div>);
          return connectDragSource(<div className="toolItemContainerd">
               <Label 
                    //color="blue" 
                    color="teal" 
                    style={{display: 'block'}} // fluid does not work for labels
                    icon={this.props.controlType.icon}
                    //icon='mail'
                    content={this.props.controlType.displayName}
               />
          </div>);
     }
}

const itemSource = {
     beginDrag(props) {
          //debugger
          return {
               'arg': props.controlType,
               'dndActionType': constants.DND_ACTION_SET_CONTROL_TYPE
          }
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