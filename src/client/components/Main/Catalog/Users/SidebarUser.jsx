import {NavLink} from "react-router-dom"
import React, {useState} from "react"
import styles from "../Sidebar.module.scss"


const SidebarUser = (props) => {

    let pagesCount = Math.ceil(props.totalUsers / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let currentPage = props.currentPage;

    let portionCount = Math.ceil(pagesCount / 3);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * 3 + 1;
    let rightPortionPageNumber = portionNumber * 3

    return <div className={styles.container}>
        <div className={styles.locationPagination}>

            {portionNumber > 1 &&
                <button className={styles.btn} onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}>Назад</button>}

            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p, i) => <span key={i} className={styles.pagination}>
                            <div>
                    <button className={currentPage === p ? (styles.selectedPage) : (styles.noSelectedPage)}
                            onClick={(e) => props.onPageChanged(p)}>{p}</button></div></span>)}

            {portionCount > portionNumber &&
                <button className={styles.btn} onClick={() => {
                    setPortionNumber(portionNumber + 1)
                }}>Вперед</button>}</div>
        <div>
            {props.us.map((u, i) => <div key={i}>
                <NavLink onClick={() => props.setIsOwner(false)}
                         to={u._id === props.user ? "/personal" : ("/user/" + u._id)}>
                    <button className={styles.sidebarButtons}>
                        <div>{u.name}</div>
                        {u.login}
                    </button>
                </NavLink>
            </div>)}
        </div>
    </div>


}

export default SidebarUser