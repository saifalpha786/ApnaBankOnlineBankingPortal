import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./Auth"



export const RequireAuth = ({ children }) => {
    const auth = useAuth();
    const location = useLocation()

    if (!auth.jwt) {
        return <Navigate to="/apnabank/signIn" state={{ path: location.pathname }} />;
    }



    return children;
};
