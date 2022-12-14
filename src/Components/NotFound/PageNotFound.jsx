import styles from "./NotFound.module.css";
import imgNotFound from "../../Assets/Imgs/not-found.png"
import { Link } from "react-router-dom";


const PageNotFound = () => {
    return (
        <div className={styles.container}>
            <img src={imgNotFound} alt="Número 404, código 404" />
            <h1>Page Not Found</h1>
            <p>We're sorry, the page you request could not be found <br />
                <Link to={"/home"}
                    className={` 
                    ${styles.linkGoBack} 
                    `} >
                    Please go back to the homepage</Link></p>
        </div>
    );
};

export default PageNotFound;