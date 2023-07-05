import styles from "./Login.module.scss"
import {useNavigate} from "react-router-dom";

const Login = (props) => {

    const navigate = useNavigate()
    const loginUser = (e) => {
        e.preventDefault()
        props.login(e.target[0].value, e.target[1].value);
        if(props.isActivated)
        if(localStorage.length !== 0){
            alert("Авторизация не выполнена")
        }
        else {
            navigate("/")
        }

    }
    return (
        <div className={styles.content}>
            <form className={styles.form} onSubmit={loginUser}>
                Ваш логин:
                <div><input autoFocus={true} required placeholder={"Введите ваш email"} type={"email"}/></div>
                Пароль:
                <div><input minLength="6" required placeholder={"Введите ваш пароль"} type={"password"}/></div>
                <button>Войти</button>
            </form>
        </div>
    )
}
export default Login