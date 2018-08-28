import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SplitPane from "react-split-pane";
import Navbar from "./components/navbar";
import ControlPropsPane from "./containers/controlPropsPane";
import DesignerPane from './containers/designerPane';
import Toolbox from './components/toolbox';
import * as constants from './constants';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class App extends Component {
  render() {
    return (      
      <div id="main">
        <Navbar/>
        <div className = "mainSplit">          
          <SplitPane className= "theSplit" split="vertical" minSize={200} defaultSize={300}>
              <SplitPane 
                    className="sideSplit" split="horizontal" minSize={constants.defaultToolboxHeight} defaultSize={constants.defaultToolboxHeight}>
                <Toolbox>Controls Toolbox</Toolbox>
                <ControlPropsPane/>
              </SplitPane>    
              <DesignerPane/>
          </SplitPane>
        </div>

        <div className="btmFooter">
        Footer
        </div>
      </div>
     );
  }
}

//export default App;
export default DragDropContext(HTML5Backend)(App);