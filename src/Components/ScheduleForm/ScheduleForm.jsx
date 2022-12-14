import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../Providers/ProviderLogin";
import { ThemeContext } from "../../Providers/ProviderTheme"
import api from "../../Services/api"
import styles from "./ScheduleForm.module.css";

const ScheduleForm = () => {
  const [dentistas, setDentistas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [inputsForm, setInputsForm] = useState({ paciente: {}, dentista: {}, dataHoraAgen: "" });
  const [errorForm, setErrorForm] = useState("");
  const { useToken } = useContext(LoginContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    trasDentistas();
    trasPacientes();
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
  };

  const trasPacientes = async () => {
    try {
      const response = await api.get("/paciente", {
        headers: {
          token: `${useToken.tipo} ${useToken.token}`
        }
      })
      setPacientes(response.data?.body)
    } catch (error) {
      console.error(error)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    agendConsulta();
    e.target.reset();
  };


  const agendConsulta = async () => {

    const body = {
      paciente: {
        matricula: inputsForm.paciente
      },
      dentista: {
        matricula: inputsForm.dentista
      },
      dataHoraAgendamento: inputsForm.dataHoraAgen
    };
    console.log(body)

    const header = `${useToken.tipo} ${useToken.token}`;

    console.log(header);
    try {
      const response = await api.post("/consulta", body, {
        headers: {
          authorization: header
        }
      })
      console.log(response.data)
      alert("Consulta agendada com sucesso!")
    } catch (error) {
      console.error(error.message);
      console.error(error.response?.data);
      alert(error.response?.data)
      console.log(errorForm)
    }
  };

  return (
    <>
      <div
        className={`
          container
          text-center 
          ${theme ? styles.cardDark : ""}
        `}
      >
        <form onSubmit={handleSubmit}>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-sm-12 col-lg-6">
              <label
                htmlFor="dentist"
                className={`
                    form-label
                    ${theme ? styles.textDark : ""}
                    `}>
                Dentist
              </label>
              <select className="form-select" name="dentist" id="dentist" onChange={(e) => setInputsForm({ ...inputsForm, dentista: e.target.value })}>
                <option></option>
                {
                  dentistas.map((dentista) =>
                    <option key={dentista.matricula} value={dentista.matricula} >
                      {dentista.nome}
                    </option>
                  )
                }
              </select>
            </div>
            <div className="col-sm-12 col-lg-6">
              <label
                htmlFor="patient"
                className={`
                form-label
                ${theme ? styles.textDark : ""}
                `}>
                Patient
              </label>
              <select className="form-select" name="patient" id="patient" onChange={(e) => setInputsForm({ ...inputsForm, paciente: e.target.value })}>
                <option></option>
                {
                  pacientes.map((paciente) =>
                    <option key={paciente.matricula} value={paciente.matricula}>
                      {paciente.nome} {paciente.sobrenome}
                    </option>
                  )
                }
              </select>
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-12">
              <label
                htmlFor="appointmentDate"
                className={`
                form-label
                ${theme ? styles.textDark : ""}
                `}>
                Date
              </label>
              <input
                className="form-control"
                id="appointmentDate"
                name="appointmentDate"
                type="datetime-local"
                onChange={(e) => setInputsForm({ ...inputsForm, dataHoraAgen: e.target.value })}
              />
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            <button
              className={`
                btn 
                ${theme ? "btn-dark" : "btn-light"}  
                ${styles.button}
                `}
              type="submit"
            >
              Schedule
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ScheduleForm;
