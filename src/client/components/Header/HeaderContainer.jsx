import React from "react";
import {connect} from "react-redux";
import Header from "./Header";
import { loginTC, logout, authTC} from "../../redux/auth-reducer";
import {compose} from "redux";
import {setIsOwner} from "../../redux/user-reducer";


const HeaderContainer = (props) => {

    return <Header {...props} />
}

let mapStateToProps = (state) => ({
    auth: state.auth.data
})
export default compose(
    connect(mapStateToProps, {authTC, loginTC, logout, setIsOwner}),
)(HeaderContainer);
