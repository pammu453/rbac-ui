import React, { createContext, useReducer, useEffect, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "./constant";

const UserContext = createContext();

const initialState = [];

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USERS":
            return action.payload;

        case "ADD_USER":
            return [...state, action.payload];

        case "DELETE_USER":
            return state.filter((user) => user.id !== action.payload);

        case "EDIT_USER":
            return state.map((user) =>
                user.id === action.payload.id
                    ? { ...user, ...action.payload.editedData }
                    : user
            );

        default:
            return state;
    }
};

export const UserProvider = ({ children }) => {
    const [users, dispatch] = useReducer(reducer, initialState);

    // Load initial users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/users`);
                dispatch({ type: "SET_USERS", payload: response.data });
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    // Add User
    const addUser = async (user) => {
        try {
            const response = await axios.post(`${BASE_URL}/users`, user);
            dispatch({ type: "ADD_USER", payload: response.data });
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    // Edit User
    const editUser = async (id, editedData) => {
        console.log(id, editedData)
        try {
            await axios.put(`${BASE_URL}/users/${id}`, editedData);
            dispatch({ type: "EDIT_USER", payload: { id, editedData } });
        } catch (error) {
            console.error("Error editing user:", error);
        }
    };

    // Delete User
    const deleteUser = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/users/${id}`);
            dispatch({ type: "DELETE_USER", payload: id });
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <UserContext.Provider value={{ users, addUser, editUser, deleteUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext)