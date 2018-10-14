import React, { Component } from 'react';
import '../App.css';

class Navbar extends Component {
    render() {
        return <div className="navbar">
            <div className="nav-logo">Noob Forms</div>
            <ul className="nav-list">
                <li><a href="#Designer">DESIGNER</a></li>
                <li><a href="#Data">DATA LIST</a></li>
            </ul>
        </div>;
    }
}

export default Navbar