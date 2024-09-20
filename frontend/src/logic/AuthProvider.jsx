import { useContext, createContext, useState } from "react";

const UserContext = createContext();

export const AuthProvider = ({children})=> {
    const [userState, setUserState] = useState(true);

    const login = ()=> setUserState(true);
    const logout = ()=> setUserState(false);    

    return(
        <UserContext.Provider value={{userState, login, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export const useAuth = ()=> useContext(UserContext);