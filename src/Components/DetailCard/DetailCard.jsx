import { useContext } from "react";
import { useEffect } from "react";
import ScheduleFormModal from "../ScheduleFormModal/ScheduleFormModal";
import styles from "./DetailCard.module.css";
import { LoginContext } from "../../Providers/ProviderLogin";
import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../../Services/api";

const DetailCard = () => {
  const { useToken } = useContext(LoginContext);
  const [dentista, setDentista] = useState({});
  const { id } = useParams()

  useEffect(() => {
    //Nesse useEffect, você vai fazer um fetch na api passando o 
    //id do dentista que está vindo do react-router e carregar os dados em algum estado
    trasDentistaDetalhes();
  }, []);

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

  return (
    //As instruções que estão com {''} precisam ser 
    //substituídas com as informações que vem da api
    <>
      <h1>Detail about Dentist { dentista.nome } </h1>
      <section className="card col-sm-12 col-lg-6 container">
        {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
        <div
          className={`card-body row`}
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
              <li className="list-group-item">Nome: { dentista.nome }</li>
              <li className="list-group-item">
                Sobrenome: { dentista.sobrenome }
              </li>
              <li className="list-group-item">
                Usuário: { dentista.usuario?.username }
              </li>
            </ul>
            <div className="text-center">
              {/* //Na linha seguinte deverá ser feito um teste se a aplicação
              // está em dark mode e deverá utilizado o css correto */}
              <button
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className={`btn btn-light ${styles.button
                  }`}
              >
                Marcar consulta
              </button>
            </div>
          </div>
        </div>
      </section>
      <ScheduleFormModal />
    </>
  );
};

export default DetailCard;
