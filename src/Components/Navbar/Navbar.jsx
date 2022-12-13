import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../../Providers/ProviderLogin"
import { ThemeContext } from "../../Providers/ProviderTheme";

const Navbar = () => {
  const { useToken, limparToken } = useContext(LoginContext);
  const { theme,  handleTheme } = useContext(ThemeContext);

  const logoutFunction = () => {
    localStorage.clear();
    limparToken()
  }

  return (
    <header className="sticky-top">
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar navbar-dark bg-dark ou navbar-light bg-light*/}
      <nav
        className={
          `navbar navbar-expand-sm 
          ${ theme ? "navbar-dark" : "navbar-light" } 
          ${ theme ? "bg-dark" : "bg-light" }
          ${ theme ? "bg-dark" : "bg-light" }
          `}
          aria-label="Third navbar example"
          >
        <div className="container">
          <Link className={`navbar-brand ${styles.navbarBrand}`} to="/home">
            DH Odonto
          </Link>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarsExample03"
            >
            <ul className="navbar-nav mb-2 mb-sm-0">
              <li className={
                `nav-item 
                ${styles.navBarLink}
                ${ theme ? "textLight" : "textDark" }
                `}>
                {useToken.token ? <Link to="/home" > Home </Link> : null}
              </li>
              <li className={
                `nav-item 
                ${styles.navBarLink}
                
                `}>
                {
                 useToken.token ? 
                  <Link 
                    to="/" 
                    onClick={logoutFunction}
                    className={`${styles.textDark}`}
                    >Logout </Link> : 
                  <Link to="/"> Login </Link>
                }
              </li>
              <li className={`nav-item`}>
                <button 
                  className={`
                    btn 
                    ${styles.btnStyle}
                    ${theme ? "btn-light" : "btn-dark"}
                    `}
                    onClick={handleTheme}
                    >
                  {theme ? "☀" : "🌙"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
