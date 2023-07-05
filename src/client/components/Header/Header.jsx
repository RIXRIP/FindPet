import {NavLink} from "react-router-dom";
import styles from "./Header.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import kitty from "../../assets/img/kotenok.jpg"

const Header = (props) => {
    const isAuth = useSelector(state => state.auth.isAuth)
    const dispatch = useDispatch()

    const profileAuth = () => {
        props.authTC()
        props.setIsOwner(true)
    }
    return (
        <header className={styles.header}>
            <NavLink to="/"><img className={styles.logoImg} alt={""} src={kitty}/></NavLink>
            <NavLink className={styles.logo} to="/"><h4>Find Your Pet</h4></NavLink>
            <div className={styles.personalAuth}>

                <NavLink className={styles.personal} to={"/catalog"}>
                    <p className={styles.auth}>КАТАЛОГ</p>
                </NavLink>
                {isAuth ?
                    <div className={styles.authNav}>
                        <NavLink className={styles.personal} to={"/personal"}>
                            <p onClick={() => profileAuth()} className={styles.auth}>Личный кабинет</p>
                        </NavLink>
                        <div className={styles.personal}>
                            <p className={styles.auth} onClick={() => dispatch(logout())}>Выйти</p></div>
                    </div>
                    :
                    <div className={styles.authNav}>
                        <NavLink className={styles.personal} to={"/login"}>
                            <p className={styles.auth}>Войти</p>
                        </NavLink>
                        <NavLink className={styles.personal} to="/register">
                            <p className={styles.auth}>
                                Регистрация
                            </p>
                        </NavLink>
                    </div>}
            </div>
        </header>
    );
}
export default Header;