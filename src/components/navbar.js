import React, { Component } from 'react';
import '../App.css';
import logo from '../images/noob2_small.png' // relative path to image 

class Navbar extends Component {    
    render() {
        var style = {'backgroundColor': 'red'};
        return <div className="navbar">
            <img className="noobLogo" src={logo}></img>
            
            <ul className="nav-list">
                <li><a href="#Designer">Designer</a></li>
                <li><a href="#Data">Data List</a></li>
            </ul>
        </div>;        
    }
}

export default Navbar