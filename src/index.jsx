import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./index.css";
import App from "./App";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Routes/Login"
import Detail from "./Routes/Detail"
import Home from "./Routes/Home"
import PageNotFound from "./Components/NotFound/PageNotFound"
import LoginProvider, { LoginContext } from "./Providers/ProviderLogin";
import { useContext } from "react";
import ThemeProvider from "./Providers/ProviderTheme";

const PrivateRoute = ({ children }) => {
  const { useToken } = useContext(LoginContext);
  return useToken.token ? children : <Navigate to="/" />
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LoginProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              } />
              <Route path="dentista/:id" element={
                <PrivateRoute>
                  <Detail />
                </PrivateRoute>
              } />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </LoginProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode >
);
