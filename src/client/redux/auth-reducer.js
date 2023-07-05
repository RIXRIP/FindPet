import axios from "axios";

const LOGOUT = "LOGOUT"
const DELETE_PROFILE_ANIMAL = "DELETE_PROFILE_ANIMAL"
const SET_IS_AUTH = "SET_IS_AUTH"
const SET_PERSONAL = "SET_PERSONAL"

const initialState = {
    userCurrentAnimals: [],
    isAuth: false,
    personal: {
        user: {
            _id: null,
            name:"Загрузка",
            patronymic: "Загрузка",
            phone: "Загрузка",
            surname: "Загрузка",
            login: "Загрузка",
            pets: [],

            roles: []
        }
    }
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                personal: {
                    user: {
                        _id: null,
                        login: "Загрузка",
                        pets: [],
                        roles: []
                    }
                },
                isAuth: false
            }
        case DELETE_PROFILE_ANIMAL: {
            return {
                ...state,
                personal: {
                    user: {
                        name:state.personal.user.name,
                        patronymic: state.personal.user.patronymic,
                        phone: state.personal.user.phone,
                        surname: state.personal.user.surname,
                        login: state.personal.user.login,
                        pets: [...state.personal.user.pets.filter(animal => animal._id !== action.payload)],
                        _id: state.personal.user._id,
                        roles: [state.personal.user.roles]
                    },
                }
            }
        }

        case SET_IS_AUTH: {
            return {
                ...state,
                isAuth: action.isAuth,

            }
        }
        case SET_PERSONAL: {
            return {
                ...state,
                personal: action.personalData,

            }
        }
        default:
            return state
    }

}

export const logout = () => {
    return {type: LOGOUT}
}
export const deleteProfileAnimal = (animal) => {
    return {type: DELETE_PROFILE_ANIMAL, payload: animal._id}
}
export const setIsAuth = (isAuth) => {
    return {type: SET_IS_AUTH, isAuth}
}
export const setPersonal = (personalData) => {
    return {type: SET_PERSONAL, personalData}
}
///thunks
export const loginTC = (login, password) => {

    return async dispatch => {
        try {
            const response = await axios.post("http://localhost:8000/auth/login", {login, password})
            if (response.data.user.isActivated === true) {
                dispatch(setPersonal(response.data))
                dispatch(setIsAuth(true))
                localStorage.setItem('token', response.data.token)
                window.location.href = "/"
            } else {
                alert("Ваш аккаунт не активирован. Письмо с подверждением отправлено вам на почту")
            }
        } catch (e) {
            alert(e.response.data.message)
            console.log(e.response.data)
        }

    }
}
export const authTC = () => {
    return async dispatch => {
        try {
            if (localStorage.length === 0) {
                return console.log('Вы не авторизованы!')
            }
            const response = await axios.get("http://localhost:8000/auth/auth", {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            dispatch(setPersonal(response.data))
            dispatch(setIsAuth(true))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            localStorage.removeItem('token')
        }

    }
}
export const registerUserTC = ({login, password}) => {
    return async dispatch => {
        try{
            const response = await axios.post("http://localhost:8000/auth/registration", {login, password})
            alert("Ссылка с подтверждением аккаунта отпавлена вам на почту!")
        } catch (e){
            alert(e.response.data.message)
            console.log(e.response.data.message)
        }


    }
}
export default authReducer