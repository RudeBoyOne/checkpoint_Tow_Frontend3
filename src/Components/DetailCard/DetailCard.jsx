import { useContext } from "react";
import { useEffect } from "react";
import ScheduleFormModal from "../ScheduleFormModal/ScheduleFormModal";
import styles from "./DetailCard.module.css";
import { LoginContext } from "../../Providers/ProviderLogin";
import { ThemeContext } from "../../Providers/ProviderTheme"
import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../../Services/api";

const DetailCard = () => {
  const { useToken } = useContext(LoginContext);
  const { theme } = useContext(ThemeContext);
  const [response, setResponse] = useState("");
  const [dentista, setDentista] = useState({});
  const { id } = useParams()

  useEffect(() => { trasDentistaDetalhes(); }, []);

  const trasDentistaDetalhes = async () => {
    try {
      const response = await api.get(`/dentista?matricula=${id}`, {
        headers: {
          token: `${useToken.tipo} ${useToken.token}`
        }
      })
      setDentista(response.data);
    } catch (error) {
      console.error(error)
    }
  }

  const handleResponse = (mensagem) => {
    setResponse(mensagem);
    console.log(response)
  };

  return (
    <>

      <h1>Detail about Dentist {dentista.nome} </h1>
      <section className="card col-sm-12 col-lg-6 container">

        {
          response ?
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
               {response}
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div> :
          null
        }

        <div
          className={`
            card-body 
            row
            ${theme ? styles.cardDark : ""}
            `}
        >
          <div className="col-sm-12 col-lg-6">
            <img
              className="card-img-top"
              src="/images/doctor.jpg"
              alt="doctor placeholder"
            />
          </div>
          <div className="col-sm-12 col-lg-6">
            <ul className="list-group">
              <li className="list-group-item">Nome: {dentista.nome}</li>
              <li className="list-group-item">
                Sobrenome: {dentista.sobrenome}
              </li>
              <li className="list-group-item">
                Usu??rio: {dentista.usuario?.username}
              </li>
            </ul>
            <div className="text-center">
              <button
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className={`
                btn 
                ${theme ? "btn-dark" : "btn-light"}  
                ${styles.button}
                `}>
                Marcar consulta
              </button>
            </div>
          </div>
        </div>
      </section>
      <ScheduleFormModal handleResponse={handleResponse} />



    </>
  );
};

export default DetailCard;
