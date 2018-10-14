import React, { Component } from 'react';
import '../styles/noobControl.css';
import {connect} from 'react-redux'
import '../styles/toolbox.css'
import {DragSource} from 'react-dnd'
import ToolItem from './toolItem';

const toolBoxItems = [
     {
          name: 'section',
          displayName: 'Section',
          logo: '',
     },    
     {
          name: 'text',
          displayName: 'Textbox',
          logo: '',
     },
     {
          name: 'richText',
          displayName: 'Rich Text',
          logo: ''
     },
     {
        name: 'label',
        displayName: 'Label',
        logo: ''
   },

     {
          name: 'numeric',
          displayName: 'Number',
          logo: ''
     },
     {
          name: 'date',
          displayName: 'Date Time',
          logo: ''
     },
     {
          name: 'combo',
          displayName: 'Combo',
          logo: ''
     },
     {
          name: 'checkbox',
          displayName: 'Checkbox',
          logo: ''
     },
     {
          name: 'table',
          displayName: 'Table',
          logo: ''
     },
     {
          name: 'User',
          displayName: 'User',
          logo: ''
     },
     {
        name: 'Image',
        displayName: 'Image',
        logo: ''
    },
    {
        name: 'Video',
        displayName: 'Video',
        logo: ''
    },
];


class Toolbox extends Component {    

    render() {
        return <div className="toolboxContainer"><b>Toolbox</b>
               <div className="toolList">{this.populateToolbox()}
                </div>
                </div>
    }

    populateToolbox() {        
          let tools = toolBoxItems.map( x => {
               return <ToolItem controlType={x} key={x.name}/>
          })

          //debugger
          let ret = <div className="toolBox">{tools}</div>;


         return ret;
    }
}

export default Toolbox;