
import React, { Component } from "react";
import style from './Button.module.css'


export default class Button extends Component {

    

    render() {
        const { onClick, type = "button", className = "primary" } = this.props; 
        return(
            <button className={style[className]} type={type} onClick={onClick} >{this.props.children}</button>
        )
    }
}
