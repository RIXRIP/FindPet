import React, {useEffect} from "react";
import {connect, useSelector} from "react-redux";
import Personal from "./Personal";
import {authTC} from "../../../redux/auth-reducer";
import {deleteAnimalTC, getCurrentAnimalTC} from "../../../redux/new-animal-reducer";
import {useParams} from "react-router-dom";
import {editProfileTC, getCurrentUserTC, setIsOwner} from "../../../redux/user-reducer";

const PersonalContainer = (props) => {
    const {id} = useParams();
    let personal = window.location.href.split('/').pop()
    let isAdmin = false;
    let isOwner;
    let pets = [];
    let userData = null;
    let isPersonal = false;
    useEffect(() => {
        if (id === undefined) {
            props.setIsOwner(true)
        }
    }, [])

    useEffect(() => {
        if (id !== undefined) {
            props.getCurrentUserTC(id)
            props.setIsOwner(false)
        }
    }, [id])

    const deleteAnimal = (id) => {
        props.deleteAnimalTC(id)
    }

    if (props.personal.roles.length > 0) {
        for (let i = 0; i < props.personal.roles.length; i++) {
            if (props.personal.roles[i] === "admin") {
                isAdmin = true;
                break;
            }
            if (isAdmin === true) {
                break;
            }
        }
    }
    if (personal === "personal") {
        userData = props.personal
        pets = props.personal.pets
        isOwner = true
        isPersonal = true
    } else {
        isPersonal = false
        userData = props.currentUser
        if (isAdmin === true) {
            pets = props.currentUser.pets
            isOwner = true;
        } else {
            pets = props.currentUser.pets
            isOwner = false;
        }
    }
    return <Personal {...props} deleteAnimal={deleteAnimal} isAdmin={isAdmin} isOwner={isOwner} pets={pets}
                     userData={userData} isPersonal={isPersonal}/>

}

let mapStateToProps = (state) => ({
    personal: state.auth.personal.user,
    currentUser: state.usersData.currentUser.user,
    isAuth: state.auth.isAuth,
    location: state.map.location
})


export default connect(mapStateToProps, {
    authTC,
    deleteAnimalTC,
    getCurrentAnimalTC,
    getCurrentUserTC,
    editProfileTC,
    setIsOwner
})(PersonalContainer);
