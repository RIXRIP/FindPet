import {NavLink} from "react-router-dom"
import React, {useState} from "react";
import styles from "./Pages.module.scss"
import defaultPhoto from "../../../assets/img/default.jpg";
import AnimalPageMapContainer from "../../Map/AnimalPageMap/AnimalPageMapContainer";
import Modal from "../../../Reusable/Modal/Modal";

const AnimalPage = (props) => {
    const animalPhoto = props.currentAnimal.photo !== "" && props.currentAnimal.photo !== undefined ? 'http://localhost:8000/' + props.currentAnimal.photo : defaultPhoto

    const date = new Date(props.currentAnimal.dateRegistration);
    const [modalActive, setModalActive] = useState(false)
    const [phone, setPhone] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState("");
    const isAuth=()=>{
        if(props.isAuth === false){
            return alert("Вы не авторизованы")
        }
        setModalActive(true)
    }

    let dataMessage = (e) => {
        e.preventDefault()
        props.NewMessage(phone, description, photo);
        setPhone("")
        setDescription("")
        setPhoto("")
        setModalActive(false)
    }
    return (
        <div className={styles.container}>
            <div className={styles.containerAnimalPage}>
                <div>
                    <div>
                        <NavLink to="/">
                            <button className={styles.btn}>На главную</button>
                        </NavLink>
                    </div>
                    <img className={styles.photo} src={animalPhoto}/>
                    <div> Статус: {props.currentAnimal.status}</div>
                    <div> Имя питомца: {props.currentAnimal.name}</div>
                    <div> Вид: {props.currentAnimal.species}</div>
                    <div> Порода: {props.currentAnimal.breed}</div>
                    <div> Дата регистрации: {date.toLocaleString()}</div>
                </div>
                <div className={styles.map}>
                    {props.currentAnimal.photo === undefined ? <div>Загрузка</div> : <AnimalPageMapContainer/>}
                </div>
            </div>
            Описание:
            <div
                className={styles.description}>  {props.currentAnimal.description === "" ? "Пока тут пусто..." : props.currentAnimal.description}</div>

            <NavLink to={`/user/${props.currentAnimal.userID}`}>
                <div className={styles.author}>Автор: {props.currentAnimal.userID}</div>
            </NavLink>
            <div className={styles.messageBtn}>
                <button className={styles.btn} onClick={() => isAuth()}>
                    {props.currentAnimal.status === "Потерялся" ? "Я нашёл!" : "Это мой!"}
                </button>
            </div>
            <div>
                Комментарии
                {props.currentAnimal.message !== undefined && props.currentAnimal.message.length !== 0 ? props.currentAnimal.message.map((m, i) =>
                    <div key={i} className={styles.messageContainer}>

                        {m.photo !== "" && m.photo !== undefined ? <img className={styles.photo}
                                                                        src={'http://localhost:8000/' + m.photo}/> :
                            <div></div>}
                        <div>Описание:</div>
                        <div>{m.description}</div>
                        <div>Телефон для связи: {m.phone}</div>
                        <div className={styles.messageAuthor}>
                            <div>Автор: <NavLink to={`/user/${m.userID}`}>
                                {m.userID}
                            </NavLink></div>
                            <div className={styles.date}>Дата: {new Date(m.date).toLocaleString()}</div>
                        </div>

                    </div>
                ) : <div>Пока нет комметариев...</div>}
            </div>


            {/*Модальное окно добавления сообщения*/}
            <Modal active={modalActive} setActive={setModalActive}>
                <form onSubmit={dataMessage}>
                    <div>Описание:</div>
                    <div><textarea value={description} className={styles.description}
                                   onChange={e => setDescription(e.target.value)}
                                   placeholder="Описание..."/>
                    </div>
                    <div>Телефон:</div>
                    <input minLength="11" maxLength="12" required onChange={e => setPhone(e.target.value)}
                           value={phone}
                           placeholder="+7 (999) 999-99-99"
                           type={"tel"}
                    />
                    <div>
                        Если имеется фото, то добавте его: <br/>
                        <input accept={"image/*"} id={"awf"} type={"file"}
                               onChange={e => setPhoto(e.target.files[0])}/>
                    </div>
                    <div>После отправки, автору анкеты прийдет уведомление на почту! </div>
                    <button className={styles.btn} type={"submit"}>Создать</button>
                </form>
            </Modal>


        </div>
    )

}
export default AnimalPage