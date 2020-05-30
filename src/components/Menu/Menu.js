import { Link } from "react-router-dom"
import React, { Component } from "react";
import IconMenu from "./IconMenu";
import  './menu.css'

export default class Menu extends Component {

    render(){

        return(
            <div className="nav">
                <div className="icon-menu">
                    <IconMenu 
                        route={'/ads'}
                        icon={"/img/home-icon.png"}
                        text={"home"}>
                    </IconMenu>
                </div>
                <div className="icon-menu">
                    <IconMenu 
                        route={'/ads'}
                        icon={"/img/search-icon.png"}
                        text={"search"}>
                    </IconMenu>
                </div>
                <div className="icon-menu">
                    <IconMenu 
                        route={'/ads/new'}
                        icon={"/img/plus-icon.png"}
                        text={"plus"}>
                    </IconMenu>
                </div>
                <div className="icon-menu">
                    <IconMenu
                        route={'/favorites'}
                        icon={"/img/favorites-icon.png"}
                        text={"favorites"}>
                    </IconMenu>
                </div>
                <div className="icon-menu">
                    <IconMenu
                        route={'/profile/:id'}
                        icon={"/img/profile-icon.png"}
                        text={"profile"}>
                    </IconMenu>
                </div>
            </div>
        )
    }
}

