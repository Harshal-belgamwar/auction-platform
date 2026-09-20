
import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get(
                    "/api/v1/auth/me"
                );

                setUser(response.data);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

