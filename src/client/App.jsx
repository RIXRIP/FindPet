import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {authTC} from "./redux/auth-reducer";
import styles from "./App.module.css"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HeaderContainer from "./Reusable/Header/HeaderContainer";
import HomePageContainer from "./components/Main/HomePage/HomePageContainer";
import PersonalContainer from "./components/Main/Personal/PersonalContainer";
import AnimalPageContainer from "./components/Main/AnimalPage/AnimalPageContainer";
import LoginContainer from "./components/Main/Login/LoginContainer";
import RegisterContainer from "./components/Main/Register/RegisterContainer";
import Footer from "./Reusable/Footer/Footer";
import CatalogContainer from "./components/Main/Catalog/Pets/CatalogContainer";

const App = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authTC())
    }, [])

    return <div>
        <Router>
            <div className={styles.mainContainer}>

                    <HeaderContainer/>
                    <Routes>
                        <Route exact path="/" element={<HomePageContainer/>}></Route>
                        <Route path={"/user/:id"} element={<PersonalContainer/>}></Route>
                        <Route path={"/personal"} element={<PersonalContainer/>}></Route>
                        <Route path={"/animal/:id"} element={<AnimalPageContainer/>}></Route>
                        <Route path="/login" element={<LoginContainer/>}></Route>
                        <Route path="/register" element={<RegisterContainer/>}></Route>
                        <Route path="/catalog" element={<CatalogContainer/>}></Route>

                    </Routes>
            </div>
            <Footer/>
        </Router>
    </div>
}

export default App;
