import { useState } from "react";
import styles from "./Form.module.css";
import api from "../../Services/api"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../../Providers/ProviderLogin"
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";

const LoginForm = () => {
  const [formLogin, setFormLogin] = useState({ login: "", password: "" })
  const [errorForm, setErrorForm] = useState ("");
  const [passwordVisible, setPasswordVisible] = useState(false)
  const { preencherTokenState } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    authlogin();
  };

  const authlogin = async () => {
    try {

      if(!formLogin.login.trim() || formLogin.login.length < 5 || formLogin.password.length < 5){
        setErrorForm("Por favor, verifique os dados inseridos no formulário")
      }else{
        setErrorForm("")
        const response = await api.post("/auth", {
          username: formLogin.login,
          password: formLogin.password
        });
        preencherTokenState({ token: response.data.token, tipo: response.data.tipo })
        localStorage.setItem("token", JSON.stringify(response.data));
        navigate("/home")
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div className={`${styles.boxFormLogin}`}>
       <h1>Login</h1>
        <div
          className={`text-center card container ${styles.card}`}
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
              />
              <div className={` ${styles.boxInputPassword} ${styles.inputSpacing}`}>
                <input
                  value={formLogin.password}
                  onChange={(e) => setFormLogin({ ...formLogin, password: e.target.value })}
                  className={`form-control ${styles.inputPassword} `}
                  placeholder="Password"
                  name="password"
                  type={ passwordVisible ? "text" : "password" }
                  required
                />
                <div 
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className={`${styles.icon}`}>
                  {passwordVisible ? <BsFillEyeFill size={20}/> : <BsFillEyeSlashFill size={20} />} 
                </div>
              </div>
              <button className="btn btn-primary" type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
          {
            errorForm.length > 0  ? <p> {errorForm} </p> : null
          }
      </div>
    </>
  );
};

export default LoginForm;
