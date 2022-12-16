import { useState } from "react";
import styles from "./Form.module.css";
import api from "../../Services/api"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../../Providers/ProviderLogin"
import { ThemeContext } from "../../Providers/ProviderTheme"
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";

const LoginForm = () => {
  const [formLogin, setFormLogin] = useState({ login: "", password: "" })
  const [errorForm, setErrorForm] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false)
  const { preencherTokenState } = useContext(LoginContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    authlogin();
  };

  const cleanSetErrorForm = () => {
    setErrorForm("")
  }

  const authlogin = async () => {
    try {
      if (!formLogin.login.trim() || formLogin.login.length < 5 || formLogin.password.length < 5) {
        setErrorForm("Erro. Por favor, verifique os dados inseridos no formulário")
      } else {
        cleanSetErrorForm()
        const response = await api.post("/auth", {
          username: formLogin.login,
          password: formLogin.password
        });
        preencherTokenState({ token: response.data.token, tipo: response.data.tipo })
        localStorage.setItem("token", JSON.stringify(response.data));
        navigate("/home")
      }

    } catch (error) {
      setErrorForm("Dados inválidos!")
    }
  }

  return (
    <>
      <h1>Login</h1>
      <div
        className={`
            text-center 
            card container 
            ${styles.card}
            ${theme ? styles.cardDark : styles.card}
            `}
      >
        <div className={`card-body ${styles.CardBody}`}>
          <form onSubmit={handleSubmit}>
            <input
              value={formLogin.login}
              onChange={(e) => setFormLogin({ ...formLogin, login: e.target.value })}
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Login"
              name="login"
              required
              aria-label="login"
            />
            <div className={` 
                    ${styles.boxInputPassword} 
                    ${styles.inputSpacing}
                    ${theme ? styles.boxInputPasswordDark : ""}
                    `}>
              <input
                value={formLogin.password}
                onChange={(e) => setFormLogin({ ...formLogin, password: e.target.value })}
                className={`form-control ${styles.inputPassword} `}
                placeholder="Password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                required
                aria-label="password"
              />
              <div
                onClick={() => setPasswordVisible(!passwordVisible)}
                className={`${styles.icon}`}>
                {
                  passwordVisible ? 
                  <BsFillEyeFill size={20} color={"black"} /> : 
                  <BsFillEyeSlashFill color={"black"} size={20} />
                }
              </div>
            </div>
            <button className="btn btn-primary" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
      {
        errorForm ?
            <div className={`
                  alert 
                  alert-danger 
                  d-flex 
                  align-items-center
                  alert-dismissible 
                  fade 
                  show
                  ${styles.alertErroForm}
                  `}
                  role="alert">
              <div>
              {errorForm}
              </div>
              <button 
                type="button" 
                className="btn-close" 
                data-bs-dismiss="alert" 
                aria-label="Close"
                onClick={cleanSetErrorForm}
                ></button>
            </div> :
          null
      }
    </>
  );
};

export default LoginForm;
