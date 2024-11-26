import React from "react";
import { Link } from "react-router-dom";

const LinkItem = ({ location }) => {
    const locations = [
        { path: "/", name: "Dashboard" },
        { path: "/users", name: "Users" },
        { path: "/roles", name: "Roles" },
        { path: "/permissions", name: "Permissions" },
    ];

    return (
        <>
            {locations.map((link) => (
                <Link
                    to={link.path}
                    key={link}
                    className={`px-4 py-2 rounded-md ${link === location ? "bg-white text-blue-600" : "hover:bg-blue-700"
                        }`}
                >
                    {link.name}
                </Link>
            ))}
        </>
    );
};

export default LinkItem;
