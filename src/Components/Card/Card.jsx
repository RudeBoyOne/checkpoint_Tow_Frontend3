import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import api from "../../Services/api"
import { useState } from "react";
import { LoginContext } from "../../Providers/ProviderLogin";
import { ThemeContext } from "../../Providers/ProviderTheme"
import { useContext } from "react";

const Card = () => {
  const { useToken } = useContext(LoginContext);
  const [dentistas, setDentistas] = useState([]);
  const { theme } = useContext(ThemeContext);


  useEffect(() => {
    trasDentistas();
  }, []);


  const trasDentistas = async () => {
    try {
      const response = await api.get("/dentista", {
        headers: {
          token: `${useToken.tipo} ${useToken.token}`
        }
      })
      setDentistas(response.data);
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <>
      {/*1. Na linha seguinte deverá ser feito um teste se a aplicação
          está em dark mode e deverá utilizar o css correto */}
      {/* 2. Na linha seguinte o link deverá utilizar a matricula, nome e sobrenome do dentista
            que vem da API */}

        {
          dentistas.map((dentista) => (
            <Link key={dentista.matricula} to={`/dentista/${dentista.matricula}`}>
              <div className={`
                card
                ${ theme ? styles.cardDark : ""}
                `}>
                <img
                  className="card-img-top"
                  src="/images/doctor.jpg"
                  alt="doctor placeholder"
                />
                <div className={`card-body ${styles.CardBody}`}>
                  <h5 className={`card-title ${styles.title}`}> {dentista.nome} {dentista.sobrenome} {dentista.id}</h5>
                  <h6>{dentista.usuario?.username}</h6>
                </div>
              </div>
            </Link>

          ))
        }
    </>
  );
};

export default Card;
