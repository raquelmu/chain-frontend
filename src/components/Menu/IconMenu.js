import { Link } from "react-router-dom"
import React, { Component } from "react";


export default class IconMenu extends Component {

    render(){
        const { route, icon, text} = this.props;
        return(
            <div>
                <Link to={route}><img src={icon} alt={text}/></Link>
            </div>
        )
    }
}

