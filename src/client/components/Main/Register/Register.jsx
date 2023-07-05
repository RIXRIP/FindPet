import {useState} from "react";
import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import styles from "./Register.module.scss"


const Register = (props) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState(false)

    const registerUser = (e) => {
        e.preventDefault()
            props.register(email, password)
            navigate('/')
    }

    return (
        <div className={styles.content}>
            <form className={styles.form} onSubmit={registerUser}>

                Ваша почта:
                <div>
                    <input
                        autoFocus={true}
                        required value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type={"email"}
                        placeholder="Введите email"
                    />
                </div>
                <div>
                    <input value={password}
                           onChange={e => setPassword(e.target.value)}
                           minLength="6" autoFocus={true}
                           required type={"password"}
                           placeholder="Введите пароль"
                    />
                </div>
                <button type={"submit"}> Зарегистрироваться</button>
                <div><NavLink className={styles.moveTo} to="/login">Уже есть аккаунт?</NavLink></div>
            </form>
        </div>
    )
}
export default Register