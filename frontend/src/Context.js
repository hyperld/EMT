import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        try {
            const response = await axios.post("http://localhost:8080/users/login", { username, password });
            setUser(response.data);
        } catch (error) {
            alert("Invalid credentials");
        }
    };
    const logout = () => {
        setUser(null);
    };
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>

    );
};
export { AuthProvider };
export const useAuth = () => useContext(AuthContext);