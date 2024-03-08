import React from "react";
import "./navbar.css"
import Authentication from "../auth/authComponent";

function Navbar() {


    return (
        <div className="navbar">
            <div className="logo">Todo App</div>
            <Authentication/>
        </div>
    );
}

export default Navbar;
