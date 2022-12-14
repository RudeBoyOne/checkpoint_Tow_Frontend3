import ScheduleForm from '../ScheduleForm/ScheduleForm';
import { ThemeContext } from "../../Providers/ProviderTheme"
import styles from "./ScheduleFormModal.module.css";
import { useContext } from 'react';

const ScheduleFormModal = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`modal fade`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className={`
                modal-content
                ${ theme  ? styles.darkModal : ""}
              `}>
          <div className="modal-header">
            <h1 id="exampleModalLabel" 
                className={`
                  fs-5
                  modal-title
                  ${ theme ? styles.textDark : ""} 
                  `}
                  >
                  Selecione o dentista, paciente e a data e hora</h1>
            <button 
                type="button" 
                className={`
                  btn-close
                  ${ theme ? styles.closeButtonDark : ""}
                  ${styles.buttonCustom}
                  `} 
                data-bs-dismiss="modal" 
                aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <ScheduleForm />
          </div>
        </div>
      </div>
    </div >

  );
};

export default ScheduleFormModal;