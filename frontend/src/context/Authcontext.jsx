import { createContext, useContext, useState } from "react";
export const AuthContext = createContext();
export const useAuthContext = () => {
    return useContext(AuthContext);
}
export const AuthContextProvider = ({ children }) => {
    const [Authuser, setAuthuser] = useState(JSON.parse(localStorage.getItem("mental-health-user")) || null);
    return <AuthContext.Provider value={{
        Authuser, setAuthuser
    }}>
        {children}
    </AuthContext.Provider>
}


