import { Link } from "react-router-dom"
import React, { Component } from "react";
import  './IconMenu.css'

export default class IconMenu extends Component {

    render(){
        const { route, icon, text} = this.props;
        return(
            <Link to={route} className="icon-menu"><img src={icon} alt={text}/></Link>
        )
    }
}

