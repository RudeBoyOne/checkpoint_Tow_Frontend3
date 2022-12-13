import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../Providers/ProviderLogin";
import api from "../../Services/api"
import styles from "./ScheduleForm.module.css";

const ScheduleForm = () => {
  const [dentistas, setDentistas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [inputsForm, setInputsForm] = useState({ paciente: {}, dentista: {}, dataHoraAgen: "" })
  const { useToken } = useContext(LoginContext);
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
  }

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
  }

  const handleSubmit = (e) => {
    //Nesse handlesubmit você deverá usar o preventDefault
    e.preventDefault();
    //obter os dados do formulário e enviá-los no corpo da requisição 
    //para a rota da api que marca a consulta
    //lembre-se que essa rota precisa de um Bearer Token para funcionar.
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro
    agendConsulta();
  };


  const agendConsulta = async () => {
    try {
      // let dentistaJson = dentistas.find((dentista) => dentista.matricula === inputsForm.dentista);
      // let pacienteJson = pacientes.find((paciente) => paciente.matricula === inputsForm.paciente);

      // dentistaJson = JSON.stringify(dentistaJson).replaceAll(/[\"]/g, '');
      // pacienteJson = JSON.stringify(pacienteJson).replaceAll(/[\"]/g, '');
      let tokeJson = JSON.stringify(useToken.token).replaceAll(/[\"]/g, '');
      let tipoTokenJson = JSON.stringify(useToken.tipo).replaceAll(/[\"]/g, '');

      let body = {
        paciente: {
          matricula: inputsForm.paciente
        },
        "dentista": {
          matricula: inputsForm.dentista
        },
        dataHoraAgendamento: inputsForm.dataHoraAgen
      };

      const response = await api.post("/consulta", JSON.stringify(body),
        {
          headers: {
            authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBcGkgREggRWNvbW1lcmNlIiwic3ViIjoiZGVudGlzdGFBZG1pbiIsImlhdCI6MTY3MDk1NTE2NywiZXhwIjoxNjcwOTU4NzY3fQ.c5zsD0xY7P6AmMZqK6ZOzdE41QSsa7_Oi5LKEpRi6Is",
            "Content-Type": "application/json"
          }
        }
      )

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center container}`
        }
      >
        <form onSubmit={handleSubmit}>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="dentist" className="form-label">
                Dentist
              </label>
              <select className="form-select" name="dentist" id="dentist" onChange={(e) => setInputsForm({ ...inputsForm, dentista: e.target.value })}>
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
              <label htmlFor="patient" className="form-label">
                Patient
              </label>
              <select className="form-select" name="patient" id="patient" onChange={(e) => setInputsForm({ ...inputsForm, paciente: e.target.value })}>
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
              <label htmlFor="appointmentDate" className="form-label">
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
            {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
            <button
              className={`btn btn-light ${styles.button}`}
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
