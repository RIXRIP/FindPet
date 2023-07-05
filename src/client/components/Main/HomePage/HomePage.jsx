import React, {useEffect, useState} from "react";
import Modal from "../../../Reusable/Modal/Modal";
import styles from "./HomePage.module.scss"
import NewAnimalMapContainer from "../../Map/NewAnimalMap/NewAnimalMapContainer";
import dog from "../../../assets/img/dog.png"

const HomePage = (props) => {
    const [modalAddAnimal, setModalAddAnimal] = useState(false);
    const [status, setStatus] = useState("Статус");
    const [name, setName] = useState("");
    const [species, setSpecies] = useState("");
    const [breed, setBreed] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState("");
    const [notFilled, setNotFiled] = useState(true)
    useEffect(() => {
        if (status !== "Статус") {
            setNotFiled(false)
        }
    }, [status])

    let dataAdd = (e) => {
        e.preventDefault()

        props.NewAnimal(name, species, breed, description, photo, status);

        setName("")
        setDescription("")
        setPhoto("")
        setBreed("")
        setSpecies("")
        setStatus("")
        setModalAddAnimal(false)
    }

    return <div>
        <h5 className={styles.title}>Помощь в поиске питомцев</h5>
        <div className={styles.aboutWrapper}>
            <div className={styles.text}>
                Наш сайт по поиску пропавших домашних животных - это
                сервис, который помогает владельцам найти своих пропавших
                любимцев.
                Мы понимаем, как трудно потерять домашнего
                питомца, и делаем все возможное, чтобы помочь владельцам в
                этой ситуации.
                <div className={styles.announcement}>
                    <div className={styles.announcementText}>
                        <div>Оставьте заявку о пропаже или нахождении питомца</div>
                        <button onClick={() => !props.isAuth ? alert("Вы не авторизоованы") : setModalAddAnimal(true)}
                                className={styles.btn}>
                            Оставить заявку
                        </button>
                    </div>
                </div>
            </div>
            <img src={dog}/>
        </div>
        {/*Модальное окно создания объявлений*/}
        <Modal active={modalAddAnimal} setActive={setModalAddAnimal}>
            <div className={styles.container}>
                <form onSubmit={dataAdd}>

                    Создать объявление
                    <div className={styles.modalContent}>

                        <input minLength="3" required onChange={e => setName(e.target.value)}
                               value={name}
                               placeholder="Имя/кличка питомца"/>
                        <input minLength="3" required onChange={e => setSpecies(e.target.value)}
                               value={species}
                               placeholder="Какое животное(собака/кошка/...)"/>
                        <input required onChange={e => setBreed(e.target.value)} value={breed}
                               placeholder="Порода вашего питомца"/>
                        <div>
                            Выберите фото вашего питомца, это повысит шансы на его нахождение:
                            <br/> <input accept={"image/*"} id={"awf"} type={"file"}
                                         onChange={e => setPhoto(e.target.files[0])}/>
                        </div>

                    </div>
                    <div>Если нет фотографии, опишите подробнее как выглядит питомец</div>
                    А также где вы или кто-либо другой его в последний раз видели.
                    <div><textarea value={description} className={styles.description}
                                   onChange={e => setDescription(e.target.value)}
                                   placeholder="Описание..."/>
                        <div>Выберите тип заявки</div>
                        <select value={status} required onChange={e => setStatus(e.target.value)}>
                            <option disabled>Статус</option>
                            <option>Потерялся</option>
                            <option>Нашёлся</option>
                        </select>
                        {status === "Статус" ? <div className={styles.status}>Выберите тип заявки!</div> : null}
                    </div>

                    {!notFilled ? <button className={styles.btn} type={"submit"}>Создать</button> :
                        <button disabled className={styles.btn} type={"submit"}>Создать</button>}
                </form>
                <NewAnimalMapContainer/>
            </div>
        </Modal>
    </div>

}
export default HomePage;