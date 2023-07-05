import {NavLink} from 'react-router-dom'
import styles from './AnimalsItem.module.scss'
import defaultPhoto from "../../../assets/img/default.jpg"
const AnimalsItem = (props) => {

    const photo = props.photo !== "" ? 'http://localhost:8000/' + props.photo : defaultPhoto
    return (
        <NavLink  to={"/animal/" + props._id}>
            <button className={styles.animalButtons} >
                <div><img className={styles.animalPhoto} src={photo}/></div>
                {props.name}
            </button>
        </NavLink>
    )
}

export default AnimalsItem