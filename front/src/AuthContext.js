import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ user: null, token: null });

    useEffect(() => {
        const authData = localStorage.getItem('auth');
        if (authData) {
            setAuth(JSON.parse(authData));
        }
    }, []);

    console.log("AuthContext state:", auth);  // Debug the entire auth state

    const login = ({ user, token }) => {
        const authData = { user, token };
        localStorage.setItem('auth', JSON.stringify(authData));
        setAuth(authData);
    };

    const logout = () => {
        localStorage.removeItem('auth');
        setAuth({ user: null, token: null });
    };

    return (
        <AuthContext.Provider value={{ ...auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
