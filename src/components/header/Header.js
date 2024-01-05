import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import header_logo from "../../media/marianamovies.png";

const Header = () => {
    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/"><img className="header__icon" src={header_logo}/></Link>
            </div>
        </div>
    )
}

export default Header