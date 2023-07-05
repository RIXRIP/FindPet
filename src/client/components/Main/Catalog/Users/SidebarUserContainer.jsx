import {connect} from "react-redux";
import {getUserTC, setIsOwner, setUsersCurrentPage} from "../../../../redux/user-reducer";
import SidebarUser from "./SidebarUser";
import React, {useEffect} from "react";


const SidebarUserContainer = (props) => {

    useEffect(() => {
        props.getUserTC();
    }, [])
    useEffect(() => {
        props.getUserTC(props.currentPage)
    }, [props.currentPage])

    const onPageChanged = (pageNumber) => {
        props.setUsersCurrentPage(pageNumber)
    }
    return <SidebarUser {...props} onPageChanged={onPageChanged}/>

}

const mapStateToProps = (state) => {
    return {
        us: state.usersData.usersInfo.users,
        pageSize: state.usersData.pageSize,
        currentPage: state.usersData.currentPage,
        totalUsers: state.usersData.usersInfo.totalUsers
    }
}
export default connect(mapStateToProps, {getUserTC,setIsOwner,setUsersCurrentPage})(SidebarUserContainer);