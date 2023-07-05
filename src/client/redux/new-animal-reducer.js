import axios from "axios";
import {deleteProfileAnimal} from "./auth-reducer";

const NEW_ADS_TEXT = "NEW_ADS_TEXT";
const SET_ANIMALS = "SET_ANIMALS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_CURRENT_ANIMAL = "SET_CURRENT_ANIMAL";
const DELETE_ANIMAL = "DELETE_ANIMAL";
const ALL_LOCATIONS = "ALL_LOCATIONS";

const initialState = {
    animals: [],
    newPostText: {
        name: "Name",
        species: "species",
        breed: "breed",
        animalPhoto: "",
        description: ""
    },
    pageSize: 15,
    totalAnimals: 0,
    currentPage: 1,
    currentAnimal: {
        location: {
            size: null,
            coordinate: null
        }
    },
    found: []

}
const animalsDataReducer = (state = initialState, action) => {

    switch (action.type) {

        case NEW_ADS_TEXT:
            return {
                ...state,
                newPostText: {
                    name: action.newText,
                    species: action.newSpeciesText,
                    breed: action.newBreedText,
                }

            }
        case SET_ANIMALS: {
            return {
                ...state,
                animals: action.animals.animals,
                totalAnimals: action.animals.totalAnimals
            }
        }

        case DELETE_ANIMAL: {
            return {
                ...state,
                animals: state.animals.filter(animal => animal._id !== action.payload),

            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case SET_CURRENT_ANIMAL: {
            return {
                ...state,
                currentAnimal: action.currentAnimal,
            }
        }
        case ALL_LOCATIONS: {
            return {
                ...state,
                found: action.found
            }
        }
        default:
            return state
    }

}
export const updateText = (newText, newSpeciesText, newBreedText, newDescription) => {
    return {type: NEW_ADS_TEXT, newText, newSpeciesText, newBreedText, newDescription}
}
export const setAnimals = (animals) => {
    return {type: SET_ANIMALS, animals}
}
export const setCurrentPage = (currentPage) => {
    return {type: SET_CURRENT_PAGE, currentPage}
}

export const setCurrentAnimal = (currentAnimal, photo) => {
    return {type: SET_CURRENT_ANIMAL, currentAnimal, photo}
}
export const deleteAnimal = (animal) => {
    return {type: DELETE_ANIMAL, payload: animal._id}
}
export const allLocations = (found) => {
    return {type: ALL_LOCATIONS, found}
}

export const postAnimalTC = (name, species, breed, description, userID, file, location, status) => {

    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('name', name)
            formData.append('species', species)
            formData.append('breed', breed)
            formData.append('description', description)
            formData.append('userID', userID)
            formData.append('status', status)
            formData.append('_location', JSON.stringify(location))
            const response = await axios.post("http://localhost:8000/animals", formData)
        } catch (e) {
            alert("Ошибка при создании заявки")
        }

    }
}
export const postMessage = (phone, description, userID, file, _id) => {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('description', description)
            formData.append('userID', userID)
            formData.append('phone', phone)
            const response = await axios.post(`http://localhost:8000/animals/message?_id=${_id}`, formData)
        } catch (e) {
            console.log("Ошибка при отправке сообщения: ", e)
        }

    }
}
export const getAnimalsTC = (currentPage,status) => {
    return async dispatch => {
        try {
            let skipPages = (currentPage - 1) * 15;
            const response = await axios.get(`http://localhost:8000/animals/?skipPages=${skipPages}&status=${status}`)
            dispatch(setAnimals(response.data));
        } catch (e) {
            console.log("Ошибка при получении питомцев: ", e)
        }
    }
}
export const getCurrentAnimalTC = (_id) => {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:8000/animals/animal/?_id=${_id}`)
            dispatch(setCurrentAnimal(response.data));
        } catch
            (e) {
            console.log("Ошибка при получении питомца: ", e)
        }
    }
}
export const getAllLocations = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:8000/animals/location`)
            dispatch(allLocations(response.data));
        } catch
            (e) {
            console.log("Ошибка при получении питомца: ", e)
        }
    }
}
export const deleteAnimalTC = (animal) => {

    return async dispatch => {
        try {
            const response = await axios.delete(`http://localhost:8000/animals/animal?_id=${animal._id}`)
            dispatch(deleteAnimal(animal))
            dispatch(deleteProfileAnimal(animal))
            alert("Данные о питомце удалены")
        } catch (e) {
            console.log("Ошибка при удалении питомца: ", e)
        }

    }
}
export const changePhotoTC = (file, _id) => {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('_id', _id)
            const response = await axios.post(`http://localhost:8000/animals/photo`, formData)
            alert("Загружено успешно")
        } catch (e) {
            console.log("Произошла ошибка, фото не загружено. ", e)
        }

    }
}
export const editAnimal = (name, breed, species, description, _id, status,location) => {

    return async dispatch => {
        try {
            const response = await axios.post(`http://localhost:8000/animals/edit`, {
                name,
                breed,
                species,
                description,
                _id,
                status,
                location
            })
            alert("Загружено успешно")
        } catch (e) {
            console.log("Произошла ошибка, фото не загружено. ", e)
        }

    }
}
export default animalsDataReducer