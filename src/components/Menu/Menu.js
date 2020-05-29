import { Link } from "react-router-dom"
import React, { Component } from "react";


export default class Menu extends Component {

    render(){
        return(
            <div className="nav">
                <Link to={'/ads'}><img src="/img/home-icon.png" alt="home"/></Link>
                <Link to={'/ads'}><img src="/img/search-icon.png" alt="search"/></Link>                <img/>
                <Link to={'/ads/new'}><img src="/img/plus-icon.png" alt="plus"/></Link>                <img/>
                <Link to={'/favorites'}><img src="/img/favorites-icon.png" alt="favorites"/></Link>
                <Link to={'/profile/:id'}><img src="/img/profile-icon.png" alt="profile"/></Link>
            </div>
        )
    }
}

