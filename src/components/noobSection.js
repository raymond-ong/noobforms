import React, { Component } from 'react';
import '../styles/noobSection.css';
import NoobControl from './noobControl';

class NoobSection extends Component {
    render() {
        // Create N dummy controls based on the number of rows and columns defined in the props
        // TODO: Do not create the controls from scratch...check the state props first if the controls 
        // have already been created previously. Otherwise, we will lose saved info
        let controls = [];
        let i =  0;
        for (let iCol = 0; iCol < this.props.numCols; iCol++) {
            for (let iRow = 0; iRow < this.props.numRows; iRow++) {
                //controls.push(<div key={'ctrl' + i++}>Imma control</div>);
                controls.push(<NoobControl key={'ctrl' + i++}/>);
            }
        }

        //repeat(100, 1fr);
        
        var divStyle = {'gridTemplateColumns': `repeat(${this.props.numCols}, 1fr)`};
        //var divStyle = {'gridTemplateColumns': `repeat(3, 1fr)`};
        return <div className="noobSectionMain">
                <div className="noobSectionTitle">{this.props.title}</div>
                <div className="noobSection" style={divStyle}>{controls}</div>
                </div>;
    }

    componentDidMount() {
        // fire event that the control has been initialized...but who is the parent???    
    }
}

export default NoobSection