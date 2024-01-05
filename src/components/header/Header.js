import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import header_logo from "../../media/marianamovies.png";

const Header = () => {
    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/"><img className="header__icon" src={header_logo}/></Link>
                <Link to="/movie/id" style={{textDecoration: "none"}}><span>Movie</span></Link>
                <Link to="/movies/top_rated" style={{textDecoration: "none"}}><span>Top Rated</span></Link>
            </div>
        </div>
    )
}

export default Header