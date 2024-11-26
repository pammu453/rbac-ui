import React, { createContext, useReducer, useEffect, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "./constant";

const PermissionContext = createContext();

const initialState = [];

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_PERMISSIONS":
            return action.payload;

        case "ADD_PERMISSION":
            return [...state, action.payload];

        case "DELETE_PERMISSION":
            return state.filter((permission) => permission.id !== action.payload);

        case "EDIT_PERMISSION":
            return state.map((permission) =>
                permission.id === action.payload.id
                    ? { ...permission, ...action.payload.editedData }
                    : permission
            );

        default:
            return state;
    }
};

export const PermissionProvider = ({ children }) => {
    const [permissions, dispatch] = useReducer(reducer, initialState);

    // Load initial permissions
    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/permissions`);
                dispatch({ type: "SET_PERMISSIONS", payload: response.data });
            } catch (error) {
                console.error("Error fetching permissions:", error);
            }
        };
        fetchPermissions();
    }, []);

    // Add Permission
    const addPermission = async (permission) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/permissions`,
                permission
            );
            dispatch({ type: "ADD_PERMISSION", payload: response.data });
        } catch (error) {
            console.error("Error adding permission:", error);
        }
    };

    // Edit Permission
    const editPermission = async (id, editedData) => {
        try {
            await axios.put(`${BASE_URL}/permissions/${id}`, editedData);
            dispatch({ type: "EDIT_PERMISSION", payload: { id, editedData } });
        } catch (error) {
            console.error("Error editing permission:", error);
        }
    };

    // Delete Permission
    const deletePermission = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/permissions/${id}`);
            dispatch({ type: "DELETE_PERMISSION", payload: id });
        } catch (error) {
            console.error("Error deleting permission:", error);
        }
    };

    return (
        <PermissionContext.Provider
            value={{ permissions, addPermission, editPermission, deletePermission }}
        >
            {children}
        </PermissionContext.Provider>
    );
};

export const usePermission = () => useContext(PermissionContext)
