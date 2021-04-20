import React, { useState, useEffect, useCallback } from "react";
import { NavLink, Link } from "react-router-dom";
import { Icon, Popup } from "semantic-ui-react";
import { logoutAdmin } from "../redux/actions/auth";

//import style
import "../styles/components/navbar.scss";

const Navbar = () => {
    const [nav, setNav] = useState(false);

    const openNav = useCallback(() => {
        setNav(!nav);
    }, [nav]);

    useEffect(() => {
        if (nav) {
            document.getElementById("myNav").style.width = "100%";
        } else {
            document.getElementById("myNav").style.width = "0%";
        }
    }, [nav]);

    return (
        <div className="navbar-component">
            <div id="myNav" className="overlay">
                <div className="overlay-content">
                    <Link to="/credit">Credit Application</Link>
                    <Link to="/applications">Application Manager</Link>
                    <Link to="/billing">Billing Manager</Link>
                    <Link to="/errors">Error Manager</Link>
                    <Link to="/login">Logout</Link>
                </div>
            </div>
            <div className="nav">
                <div className="logo-menu">
                    <Link to="/">
                        <img src="/assets/logo.png" alt="Logo" />
                    </Link>
                </div>
                <div className="nav-menu">
                    <li>
                        <NavLink className="link" to="/applications" activeClassName="selected">
                            Application Manager
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="link" to="/credit" activeClassName="selected">
                            Credit Application
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="link" to="/billing" activeClassName="selected">
                            Billing Manager
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="link" to="/errors" activeClassName="selected">
                            Error Manager
                        </NavLink>
                    </li>
                    <li onClick={() => logoutAdmin()}>Logout</li>
                    <li className="menu-icon" onClick={openNav}>
                        {nav ? <Icon name="close" /> : <Icon name="bars" />}
                    </li>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
