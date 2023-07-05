import React from "react";
import {connect} from "react-redux";
import Register from "./Register";
import {registerUserTC} from "../../../redux/auth-reducer";
import {compose} from "redux";


const RegisterContainer = (props) => {
    const register = (login, password) => {
        props.registerUserTC({login, password})
    }

    return <Register {...props} register={register}/>
}

let mapStateToProps = (state) => ({
})

export default compose(
    connect(mapStateToProps, {registerUserTC}),

)(RegisterContainer)
