import {connect} from "react-redux";
import {getAnimalsTC, setCurrentPage} from "../../../../redux/new-animal-reducer";
import Catalog from "./Catalog";
import React, {useEffect, useState} from "react";

const CatalogContainer = (props) => {
    const [status, setStatus] = useState("Все");

    useEffect(() => {
        if(status !== undefined){
            props.getAnimalsTC(props.currentPage, status)
        }
    }, [status,props.currentPage])

    const onPageChanged = (pageNumber) => {
        props.setCurrentPage(pageNumber)
    }
    const newStatus = (newStatus) => {
        setStatus(newStatus)
    }

    return <Catalog {...props} onPageChanged={onPageChanged} newStatus={newStatus}/>

}

const mapStateToProps = (state) => {
    return {
        animals: state.animalsData.animals,
        pageSize: state.animalsData.pageSize,
        totalAnimals: state.animalsData.totalAnimals,
        currentPage: state.animalsData.currentPage,
    }
}

export default connect(mapStateToProps, {
    setCurrentPage,
    getAnimalsTC,

})(CatalogContainer);
