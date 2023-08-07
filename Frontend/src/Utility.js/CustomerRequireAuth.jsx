import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./Auth"



export const CustomerRequireAuth = ({ children }) => {
    const auth = useAuth();
    const location = useLocation()

    if (!auth.jwt) {
        return <Navigate to="/apnabank/customerSignIn" state={{ path: location.pathname }} />;
    }



    return children;
};
