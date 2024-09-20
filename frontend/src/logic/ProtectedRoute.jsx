import { useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({children})=> {
    const {userState} = useAuth();
    const navigate = useNavigate();

    useEffect(()=> {
        if (!userState) {
            navigate('/');
    
        }
    }, [])
    

    return(
        children
    )
}