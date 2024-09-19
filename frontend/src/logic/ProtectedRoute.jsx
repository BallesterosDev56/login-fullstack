import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({children})=> {
    const {userState} = useAuth();
    const navigate = useNavigate();

    console.log(userState);
    if (!userState) {
        navigate('/');

    }
    

    return(
        children
    )
}