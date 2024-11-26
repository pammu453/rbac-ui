import React from "react";
import { Navbar } from "flowbite-react";
import { HiMenu } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import LinkItem from "./LinkItem";

const NavBar = () => {
    const location = useLocation();

    return (
        <Navbar fluid className="bg-gradient-to-r from-teal-400 to-blue-600 text-white shadow-lg">
            <Navbar.Brand>
                <Link to="/" className="text-white text-2xl font-bold">
                    RBAC UI
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle>
                <HiMenu className="w-6 h-6" />
            </Navbar.Toggle>
            <Navbar.Collapse>
               <LinkItem  location={location.pathname}/>
            </Navbar.Collapse> 
        </Navbar>
    );
};

export default NavBar;
