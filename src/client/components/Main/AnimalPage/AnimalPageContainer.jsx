import {connect} from "react-redux"
import AnimalPage from "./AnimalPage"
import {useEffect} from "react";
import {changePhotoTC, getAllLocations, getCurrentAnimalTC, postMessage} from "../../../redux/new-animal-reducer";
import {useParams} from "react-router-dom";

const AnimalPageContainer = (props) => {

    const {id} = useParams();
    useEffect(() => {
        props.getAllLocations()
    }, [])
    useEffect(() => {
        props.getCurrentAnimalTC(id)
    }, [id])
    const NewMessage = ( phone,description, photo) => {
        debugger
        if (photo === undefined)
            photo = "";
        props.postMessage(phone,description, props.userID, photo,id);
    }

    return <AnimalPage {...props} NewMessage={NewMessage}/>
}

const mapStateToProps = (state) => ({
    currentAnimal: state.animalsData.currentAnimal,
    userID: state.auth.personal.user._id,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {changePhotoTC, getCurrentAnimalTC, getAllLocations,postMessage})(AnimalPageContainer);
