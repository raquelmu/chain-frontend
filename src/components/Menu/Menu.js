import { Link, Route } from "react-router-dom"
import React, { Component } from "react";
import IconMenu from "./IconMenu";
import  './Menu.css'
import {menuData} from "../../utils/constants";

export default class Menu extends Component {
    
	showIcons = () => {
		return menuData.map((item, index)=>{
			const newRoute = item.route === '/profile/' ? `${item.route}${this.props.user._id}` : item.route
			return(
				<div className="icon" key={index}>
					<IconMenu route={newRoute} icon={item.icon} text={item.text}/>
				</div>
			)
		})
	}

	render(){
		return(
			<div className="nav">
				{this.showIcons()}
			</div>
		)
	}
}

