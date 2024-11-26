import React, { createContext, useReducer, useEffect, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "./constant";

const RoleContext = createContext();

const initialState = [];

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_ROLES":
            return action.payload;

        case "ADD_ROLE":
            return [...state, action.payload];

        case "DELETE_ROLE":
            return state.filter((role) => role.id !== action.payload);

        case "EDIT_ROLE":
            return state.map((role) =>
                role.id === action.payload.id
                    ? { ...role, ...action.payload.editedData }
                    : role
            );

        default:
            return state;
    }
};

export const RoleProvider = ({ children }) => {
    const [roles, dispatch] = useReducer(reducer, initialState);

    // Load initial roles
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/roles`);
                dispatch({ type: "SET_ROLES", payload: response.data });
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        };
        fetchRoles();
    }, []);

    // Add Role
    const addRole = async (role) => {
        try {
            const response = await axios.post(`${BASE_URL}/roles`, role);
            dispatch({ type: "ADD_ROLE", payload: response.data });
        } catch (error) {
            console.error("Error adding role:", error);
        }
    };

    // Edit Role
    const editRole = async (id, editedData) => {
        try {
            await axios.put(`${BASE_URL}/roles/${id}`, editedData);
            dispatch({ type: "EDIT_ROLE", payload: { id, editedData } });
        } catch (error) {
            console.error("Error editing role:", error);
        }
    };

    // Delete Role
    const deleteRole = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/roles/${id}`);
            dispatch({ type: "DELETE_ROLE", payload: id });
        } catch (error) {
            console.error("Error deleting role:", error);
        }
    };

    return (
        <RoleContext.Provider value={{ roles, addRole, editRole, deleteRole }}>
            {children}
        </RoleContext.Provider>
    );
};

export const useRole = () => useContext(RoleContext)
