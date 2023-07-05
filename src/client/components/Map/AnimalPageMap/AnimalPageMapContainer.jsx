import React, {useEffect} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {setCoordinate, setSize} from "../../../redux/map-reducer";
import AnimalPageMap from "./AnimalPageMap";
import {getAllLocations} from "../../../redux/new-animal-reducer";


const AnimalPageMapContainer = (props) => {
    let first = 58.6
    let second = 49.6
    if (props.coordinate !== null) {
        first = props.coordinate[0]
        second = props.coordinate[1]
    }

    return <AnimalPageMap  {...props} first={first} second={second}/>
}

let mapStateToProps = (state) => ({
    size: state.animalsData.currentAnimal.location.size,
    coordinate: state.animalsData.currentAnimal.location.coordinate,
    found: state.animalsData.found,
    animalStatus: state.animalsData.currentAnimal.status
})
export default compose(
    connect(mapStateToProps, {getAllLocations}))
(AnimalPageMapContainer);
