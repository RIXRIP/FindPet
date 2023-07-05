import styles from '../Sidebar.module.scss'
import React, {useState} from "react";
import AnimalsItem from "../../AnimalItem/AnimalItem";
import SidebarUser from "../Users/SidebarUserContainer";

const Catalog = (props) => {

    let pagesCount = Math.ceil(props.totalAnimals / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let currentPage = props.currentPage;

    let portionCount = Math.ceil(pagesCount / 5);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * 5 + 1;
    let rightPortionPageNumber = portionNumber * 5

    return <div>
        <div className={styles.wrapper}>

            <SidebarUser/>
            <div>
                <div className={styles.pagination}>
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
                        }}>Вперед</button>}
                </div>
                <select className={styles.choseStatus} onChange={e => props.newStatus(e.target.value)}>
                    <option>Все</option>
                    <option>Потерялся</option>
                    <option>Нашёлся</option>
                </select>
                <div className={styles.items}>
                    {props.animals.map((a, i) => <div key={i} className={styles.item}>
                            <AnimalsItem
                                _id={a._id}
                                name={a.name}
                                photo={a.photo}
                            />
                        </div>
                    )}</div>
            </div>
        </div>


    </div>
}
export default Catalog