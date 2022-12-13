import styles from "./NotFound.module.css";
import imgNotFound from "../../Assets/Imgs/not-found.png"
 

const PageNotFound = () => {
    return(
        <div className={styles.container}>
            <img src={imgNotFound} alt="Número 404, código 404" />
            <h1>Page Not Found</h1>
            <p>We're sorry, the page you request could not be found <br/>
            Please go back to the homepage</p>
        </div>
    );
};

export default PageNotFound;