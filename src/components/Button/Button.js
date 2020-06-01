
import React, { Component } from "react";
import apiClient from "../../services/apiClient";
import style from './Button.module.css'
// import apiClient from "../../services/apiClient";


export default class Button extends Component {

    

    render() {
        const { layout, onClick, type = "button", className = "primary" } = this.props; 
        return(
            <button className={style[className]} type={type} onClick={onClick} >{layout}</button>
        )
    }
}
