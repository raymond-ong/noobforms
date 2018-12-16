import React, { Component } from 'react';
import '../styles/noobControl.css';
import '../styles/toolbox.css'
import ToolItem from './toolItem';
import { Input, Segment, Label } from 'semantic-ui-react';

export const toolBoxItems = [
     {
          name: 'section',
          displayName: 'Section',
          icon: 'wpforms',
     },    
     {
          name: 'textbox',
          displayName: 'Textbox',
          icon: 'font',
     },
     {
          name: 'richText',
          displayName: 'Rich Text',
          icon: 'paint brush'
     },
     {
        name: 'label',
        displayName: 'Label',
        icon: 'info'
   },

     {
          name: 'numeric',
          displayName: 'Number',
          icon: 'sort numeric up'
     },
     {
          name: 'date',
          displayName: 'Date',
          icon: 'calendar alternate'
     },
     {
          name: 'combo',
          displayName: 'Combo',
          icon: 'dropdown'
     },
     {
          name: 'checkbox',
          displayName: 'Check',
          icon: 'check square outline'
     },
     {
          name: 'table',
          displayName: 'Table',
          icon: 'table'
     },
     {
          name: 'User',
          displayName: 'User',
          icon: 'user circle'
     },
     {
        name: 'Image',
        displayName: 'Image',
        icon: 'image outline'
    },
    {
        name: 'Video',
        displayName: 'Video',
        icon: 'video play'
    },
];

export function getToolItem(toolName) {
     return toolBoxItems.find((toolItem) => {
          return toolItem.name === toolName;
     })
};


class Toolbox extends Component {    

    render() {
        return <div className="toolboxContainer">
               <div className="toolboxTitle">Toolbox</div>
               <div className="toolList">{this.populateToolbox()}
                </div>
          </div>
     // return <div className="toolboxContainer">
     //      <Segment className="toolboxContainer">
     //           <Label fluid attached="top">Toolbox</Label>
     //           <div className="toolList">{this.populateToolbox()}</div>
     //      </Segment>
     //      </div>
    }

    populateToolbox() {        
          let tools = toolBoxItems.map( x => {
               return <ToolItem controlType={x} key={x.name}/>
          })

          let ret = <div className="toolBox">
          {tools}
          </div>;


         return ret;
    }
}

export default Toolbox;