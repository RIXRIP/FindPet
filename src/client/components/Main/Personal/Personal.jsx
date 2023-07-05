import styles from "../AnimalPage/Pages.module.scss";
import React, {useState} from "react";
import {Navigate, NavLink} from "react-router-dom";
import AnimalsItem from "../AnimalItem/AnimalItem";
import Modal from "../../../Reusable/Modal/Modal";
import {useDispatch} from "react-redux";
import {editProfileTC} from "../../../redux/user-reducer";
import NewAnimalMapContainer from "../../Map/NewAnimalMap/NewAnimalMapContainer";
import {changePhotoTC, editAnimal} from "../../../redux/new-animal-reducer";

const Personal = (props) => {

    let isOwner = props.isOwner;
    const dispatch = useDispatch()

    const pets = props.pets
    const [status, setStatus] = useState("Статус");
    const [modalEditProfile, setModalEditProfile] = useState(false)
    const [modalEditAnimal, setModalEditAnimal] = useState(false)
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [patronymic, setPatronymic] = useState("")
    const [phone, setPhone] = useState("")

    const [nameAnimal, setNameAnimal] = useState("")
    const [breed, setBreed] = useState("")
    const [species, setSpecies] = useState("")
    const [description, setDescription] = useState("")
    const [animalID, setAnimalID] = useState("")
    const [file, setFile] = useState("")
    const editProfile = (e) => {
        e.preventDefault()
        dispatch(editProfileTC(name, surname, patronymic, phone, props.personal._id))
        setName("")
        setSurname("")
        setPatronymic("")
        setPhone("")
        setModalEditProfile(false)
    }

    function newPhoto(e) {
        setFile(e.target.files[0])
    }

    const editPet = (e) => {
        e.preventDefault()
        dispatch(editAnimal(nameAnimal, breed, species, description, animalID, status,props.location))
        dispatch(changePhotoTC(file, animalID))
        setNameAnimal("")
        setBreed("")
        setSpecies("")
        setDescription("")
        setStatus("")
        setModalEditProfile(false)
    }

    if (localStorage.getItem('token') === null && props.isAuth === false) return <Navigate to='/login'/>

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <NavLink to={"/"}>
                        <button className={styles.btn}>На главную</button>
                    </NavLink>
                </div>
                <h4 className={styles.title}>Профиль</h4>
                {isOwner ?
                    <div className={styles.edit}>
                        <button onClick={() => setModalEditProfile(true)}
                                className={styles.btn}>
                            Редактировать

                        </button>
                    </div>
                    :
                    <span/>}
            </header>
            <div className={styles.info}>
                <p>Фамилия:{props.userData.surname}</p>
                <p>Имя: {props.userData.name}</p>
                <p>Отчество: {props.userData.patronymic}</p>
                <p>Почта: {props.userData.login}</p>
                <p>Телефон: {props.userData.phone}</p>
            </div>

            <div className={styles.allItems}>
                {pets.map((a, i) => <div key={i} className={styles.animalWrapper}>
                        <div className={styles.containerItems}>
                            <div>
                                <AnimalsItem
                                    _id={a._id}
                                    name={a.name}
                                    photo={a.photo}
                                />

                                {isOwner ?
                                    <div className={styles.btnPanel}>
                                        <button className={styles.btnDelete}
                                                onClick={() => props.deleteAnimal(a)}>
                                            Удалить
                                        </button>
                                        <button className={styles.btnEdit}
                                                onClick={() => {
                                                    setAnimalID(a._id)
                                                    setPhone(a.phone)
                                                    setBreed(a.breed)
                                                    setSpecies(a.species)
                                                    setStatus(a.status)
                                                    setNameAnimal(a.name)
                                                    setDescription(a.description)
                                                    setModalEditAnimal(true)
                                                }
                                                }>
                                            Изменить
                                        </button>
                                    </div> : null}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/*Модальное окно изменения профиля*/}
            <Modal active={modalEditProfile} setActive={setModalEditProfile}>

                    <div>
                        <form onSubmit={editProfile}>
                            Редактировать профиль
                            <div className={styles.modalContent}>
                                <input value={surname} onChange={e => setSurname(e.target.value)} minLength="3"
                                       placeholder="Фамилия"/>
                                <input value={name} onChange={e => setName(e.target.value)} minLength="3"
                                       placeholder="Имя"/>
                                <input value={patronymic} onChange={e => setPatronymic(e.target.value)} minLength="3"
                                       placeholder="Отчество"/>
                                <input value={phone} onChange={e => setPhone(e.target.value)} minLength="11" maxLength="12"
                                       placeholder="+7 (999) 999-99-99"/>
                            </div>
                            <button className={styles.btn} type={"submit"}>Изменить</button>
                        </form>
                    </div>

            </Modal>
            {/*Модальное окно изменения питомца*/}
            <Modal active={modalEditAnimal} setActive={setModalEditAnimal}>
                <div className={styles.modalContainer}>
                    <form onSubmit={editPet}>
                        Редактировать питомца
                        <div className={styles.modalContent}>
                            <input value={nameAnimal} onChange={e => setNameAnimal(e.target.value)} minLength="3"
                                   placeholder="Имя"/>
                            <input value={species} onChange={e => setSpecies(e.target.value)} minLength="3"
                                   placeholder="Вид"/>
                            <input value={breed} onChange={e => setBreed(e.target.value)} minLength="3"
                                   placeholder="Порода"/>
                            <input accept={"image/*"} type={"file"} onChange={e => newPhoto(e)}/>
                            <textarea className={styles.description} value={description}
                                      onChange={e => setDescription(e.target.value)} minLength="3"
                                      placeholder="Описание"/>
                            <select value={status} required onChange={e => setStatus(e.target.value)}>
                                <option disabled>Статус</option>
                                <option>Потерялся</option>
                                <option>Нашёлся</option>
                            </select>
                        </div>

                        <button className={styles.btn} type={"submit"}>Изменить</button>
                    </form>
                    <NewAnimalMapContainer/>
                </div>
            </Modal>
        </div>
    )
}
export default Personal