const SET_SIZE = "SET_SIZE"
const SET_COORDINATE = "SET_COORDINATE"
const initialState = {
    location: {
        size: 2500,
        coordinate: [58.6, 49.6]
    }
}
const mapReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_SIZE: {
            return {
                ...state,
                location: {
                    size: action.size,
                    coordinate: state.location.coordinate
                }

            }
        }
        case SET_COORDINATE: {
            return {
                ...state,
                location: {
                    size: state.location.size,
                    coordinate: action.coordinate
                }

            }
        }

        default:
            return state
    }

}

export const setSize = (size) => {
    return {type: SET_SIZE, size}
}
export const setCoordinate = (coordinate) => {
    return {type: SET_COORDINATE, coordinate}
}

///thunks
export default mapReducer


