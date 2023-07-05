import React from "react";
import {connect} from "react-redux";
import Login from "./Login";
import {loginTC} from "../../../redux/auth-reducer";
import {compose} from "redux";


const LoginContainer = (props) => {

    const login = (email, pass) => {
        props.loginTC(email, pass);
    }

    return <Login {...props} login={login}/>
}

let mapStateToProps = (state) => ({
    register: state.auth.data
})


export default compose(
    connect(mapStateToProps, {loginTC}),
)(LoginContainer)

