import {YMaps, Map, Circle, Placemark} from '@pbe/react-yandex-maps';
import styles from "../Map.module.scss"
import {useState} from "react";
import Modal from "../../../Reusable/Modal/Modal";
import {NavLink} from "react-router-dom";
import defaultPhoto from "../../../assets/img/default.jpg";

const AnimalPageMap = (props) => {
    const [photo, setPhoto] = useState("")
    const animalPhoto = photo !== "" ? 'http://localhost:8000/' + photo : defaultPhoto
    let dist = 0;
    let currentCoordinate = props.coordinate
    let closePoints = []
    let allAnimalsLocation = []

    for (let i = 0; i < props.found.length; i++) {
        allAnimalsLocation.push(props.found[i].location.coordinate)
    }
    let animals = props.found
    const [infoModal, setInfoModal] = useState(false)

    const [animalID, setAnimalID] = useState("")

    function distance(coord1, coord2) {

        const R = 6371; // Радиус Земли в км
        const dLat = (coord2[0] - coord1[0]) * (Math.PI / 180); // Разница широты в радианах
        const dLon = (coord2[1] - coord1[1]) * (Math.PI / 180); // Разница долготы в радианах

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(coord1[0] * (Math.PI / 180)) *
            Math.cos(coord1[0] * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        dist = R * c; // Расстояние в км
    }

    for (let i = 0; i < allAnimalsLocation.length; i++) {
        if (JSON.stringify(currentCoordinate) !== JSON.stringify(allAnimalsLocation[i])) {
            distance(currentCoordinate, allAnimalsLocation[i])
            if (dist <= (props.size / 1000)) {
                closePoints.push(currentCoordinate, allAnimalsLocation[i])
            }
        }
    }

    const animal = (points) => {
        for (let i = 0; i < animals.length; i++) {
            if (animals[i].location.coordinate === points) {
                setPhoto(animals[i].photo)
                setAnimalID(animals[i]._id)
            }
        }
    }

    return <div>
        <YMaps query={{apikey: 'e1ae090b-c5a1-4bdc-b741-e4dc34388928'}}>
            <div>
                <Map className={styles.map} defaultState={{
                    center: [props.first, props.second], zoom: 11,
                    controls: []
                }}
                >


                    <Circle
                        geometry={[props.coordinate, props.size]}
                        options={{
                            draggable: false,
                            fillColor: "#DB709377",
                            strokeColor: "#990066",
                            strokeOpacity: 0.8,
                            strokeWidth: 5,
                        }}
                    />
                    {props.animalStatus === "Потерялся" ?
                        closePoints.map((points, i) =>
                            JSON.stringify(currentCoordinate) !== JSON.stringify(points) ?
                                <Placemark
                                    key={i}
                                    geometry={points}
                                    options={{
                                        draggable: false,
                                    }}
                                    onClick={() => {
                                        animal(points)
                                        setInfoModal(true)
                                    }}
                                /> : null
                        ) : null
                    }

                </Map>
            </div>
        </YMaps>
        <Modal active={infoModal} setActive={setInfoModal}>
            <img className={styles.photo} src={animalPhoto}/>
            <NavLink to={`/animal/${animalID}`} onClick={() => {
                setInfoModal(false)
            }}>
                <div>Страница питомца: {animalID}</div>
            </NavLink>

        </Modal>

    </div>
};

export default AnimalPageMap;