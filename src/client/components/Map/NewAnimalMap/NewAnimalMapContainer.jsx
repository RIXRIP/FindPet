import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import NewAnimalMap from "./NewAnimalMap";
import {setCoordinate, setSize} from "../../../redux/map-reducer";



const NewAnimalMapContainer = (props) => {

    const [size, setSize] = useState(props.size)
    const [coordinate, setCoordinate] = useState(props.coordinate)

    useEffect(() => {
        setSize(props.size)
        setCoordinate(props.coordinate)
    }, [props.size, props.coordinate])

   const setNewCoordinate=(coordinate)=>{
       props.setCoordinate(coordinate)
    }

    const circleSize = (e) => {
        let size = props.size + Number(e.target.value)

        if (size < 250) {
            alert("Радиус поиска не может быть меньше 250")
            return props.setSize(Number(250))
        } else if (size > 10000) {
            alert("Радиус поиска не может быть больше 10000")
            return props.setSize(Number(10000))
        }
        props.setSize(Number(size))
    }
    const inputSize = (e) => {

        let inputSize = Number(e.target.value)

        if (inputSize <= 0) {
            alert("Радиус поиска не может быть меньше 250")
            return props.setSize(Number(250))
        } else if (inputSize >= 10000) {
            let overflow = window.confirm("Радиус поиска не может быть больше 10000. Желайте сбросить значение?");
            if (overflow === true) {
                return props.setSize(Number(2500))
            }
            return props.setSize(Number(10000))
        }
        props.setSize(Number(inputSize))
    }

    return <NewAnimalMap {...props} inputSize={inputSize} setNewCoordinate ={setNewCoordinate} circleSize={circleSize} size={size} coordinate={coordinate}/>
}

let mapStateToProps = (state) => ({
    size: state.map.location.size,
    coordinate: state.map.location.coordinate
})
export default compose(
    connect(mapStateToProps, {setSize, setCoordinate}))
(NewAnimalMapContainer);
