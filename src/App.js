import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SplitPane from "react-split-pane";
import Navbar from "./components/navbar";
import ControlPropsPane from "./containers/controlPropsPane";
import DesignerPane from './containers/designerPane';


class App extends Component {
  render() {
    return (      
      <div id="main">
        <Navbar/>
        <div className = "mainSplit">          
          <SplitPane className= "theSplit" split="vertical" minSize={200} defaultSize={300}>
              <SplitPane split="horizontal" minSize={200} defaultSize={300}>              
                <div>Controls Toolbox</div>
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

export default App;
