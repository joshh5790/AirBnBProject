import { csrfFetch } from "./csrf"

const GET_SPOTS = 'spots/GET_SPOTS'

// selectors



// action creators

export function getSpots(spots) {
    return {
        type: GET_SPOTS,
        payload: spots
    }
}

// thunks

export const retrieveAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots')

    const data = await response.json()
    console.log(data)
    dispatch(getSpots(data))
    return response
}

const initialState = {}

export default function spotReducer(state = initialState, action) {
    switch(action.type) {
        case GET_SPOTS:
            return { ...action.payload.spots }
        default: return state
    }
}
