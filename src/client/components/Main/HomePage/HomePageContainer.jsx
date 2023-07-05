import {connect} from "react-redux";
import {getAnimalsTC, postAnimalTC, updateText} from "../../../redux/new-animal-reducer";
import HomePage from "./HomePage";

const HomePageContainer = (props) => {

    const NewAnimal = (inputName, inputSpecies, inputBreed, inputDescription, photo,status) => {
        if (photo === undefined)
            photo = "";
        props.postAnimalTC(inputName, inputSpecies, inputBreed, inputDescription, props.userID, photo, props.location, status);
        props.getAnimalsTC(props.currentPage)
    }

    return <HomePage {...props} NewAnimal={NewAnimal}/>
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        newPostText: state.animalsData.newPostText,
        userID: state.auth.personal.user._id,
        currentPage: state.animalsData.currentPage,
        location: state.map.location
    }
}

export default connect(mapStateToProps, {updateText, postAnimalTC, getAnimalsTC})(HomePageContainer);