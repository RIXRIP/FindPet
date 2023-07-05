import {NavLink} from "react-router-dom";
import styles from "./Footer.module.scss";
import vk from "../../assets/img/vk.png";
import git from "../../assets/img/git.png";
import tg from "../../assets/img/telegram.png";


const Footer = (props) => {
    return <footer>
            <div>
               <NavLink className={styles.logo} to="/"><h4> Find Your Pet</h4></NavLink>
               <div> <NavLink className={styles.navFooter} to={"/"}>Главная</NavLink></div>
               <div> <NavLink className={styles.navFooter} to={"/personal"}>Личный кабинет</NavLink></div>
               <div> <NavLink className={styles.navFooter} to={"/catalog"}>Каталог</NavLink></div>

                <div className={styles.social}>
                    <a href={"https://vk.com/id457654419"}><img className={styles.photo} alt={""} src={vk}/></a>
                    <a href={"https://github.com/RIXRIP"}><img className={styles.photo} alt={""} src={git}/></a>
                    <a href={"https://vk.com/id457654419"}><img className={styles.photo} alt={""} src={tg}/></a>
                </div>
                <div className={styles.copyright}> © 2023 «FindPets». Все права защищены.</div>
            </div>
        </footer>
}
export default Footer;