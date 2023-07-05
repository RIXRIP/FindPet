import axios from "axios";

const SET_CURRENT_USER = "SET_PERSONAL_DATA";
const SET_IS_OWNER = "SET_IS_OWNER"
const SET_USERS = "SET_USERS";
const SET_USERS_CURRENT_PAGE = "SET_USERS_CURRENT_PAGE";
const initialState = {
    usersInfo: {
        users: [],
        totalUsers: 0,
    },
    currentUser: {
        user: {
            _id: null,
            login: "Загрузка",
            pets: [],
            roles: []
        }
    },
    pageSize: 10,
    currentPage:1,
    isOwner: false
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                usersInfo: {
                    users: action.users.users,
                    totalUsers: action.users.totalUsers
                }
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.data,
            }
        case SET_IS_OWNER: {
            return {
                ...state,

                isOwner: action.isOwner
            }
        }
        case SET_USERS_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        default:
            return state
    }

}

export const setUsers = (users) => {
    return {type: SET_USERS, users}
}
export const setCurrentUser = (data) => {
    return {type: SET_CURRENT_USER, data}
}
export const setIsOwner = (isOwner) => {
    return {type: SET_IS_OWNER, isOwner}
}
export const setUsersCurrentPage = (currentPage) => {
    return {type: SET_USERS_CURRENT_PAGE, currentPage}
}
//Thunk
export const getUserTC = (currentPage) => {
    let skipPages = (currentPage - 1) * 10;
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:8000/auth/users?skipPages=${skipPages}`, {})
            dispatch(setUsers(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}
export const getCurrentUserTC = (_id) => {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:8000/auth/user/?_id=${_id}`, {
                headers: {
                    Accept: 'application/json',
                }
            })
            dispatch(setCurrentUser(response.data))
        } catch (e) {
            console.log(e)
        }
    }


}
export const editProfileTC = (name, surname, patronymic, phone, _id) => {

    return async dispatch => {
        const response = await axios.post(`http://localhost:8000/auth/editUser`, {
            name,
            surname,
            patronymic,
            phone,
            _id
        })

    }
}
export default userReducer