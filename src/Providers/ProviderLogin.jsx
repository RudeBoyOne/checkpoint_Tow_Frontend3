import { useEffect } from "react";
import { createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const LoginContext = createContext({});

const LoginProvider = ({ children }) => {
    const [useToken, setToken] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    
    const preencherTokenState = ({ token, tipo }) => {
        setToken({ ...useToken, token, tipo })
    }
    
    const limparToken = () => {
        setToken({token: "", tipo: ""})
    }

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"))
        if(token){
            preencherTokenState({token: token.token, tipo: token.tipo})
            navigate(location.pathname)
        }
    }, [])

    return (
        <LoginContext.Provider
            value={{
                useToken,
                preencherTokenState,
                limparToken
            }}
        >
            {children}
        </LoginContext.Provider>
    );
};

export default LoginProvider;