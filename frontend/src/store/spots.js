import { csrfFetch } from "./csrf"

const GET_SPOTS = 'spots/GET_SPOTS'
const GET_SPOT_DETAILS = 'spots/GET_SPOT_DETAILS'

// selectors



// action creators

export function getSpots(spots) {
    return {
        type: GET_SPOTS,
        payload: spots
    }
}

export function getSpotDetails(spot) {

    return {
        type: GET_SPOT_DETAILS,
        payload: spot
    }
}

// thunks

export const retrieveAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots')

    const data = await response.json()
    dispatch(getSpots(data))
    return response
}

export const retrieveSpotDetails = spotId => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`)

    const data = await response.json()
    dispatch(getSpotDetails(data))
    return response
}

const initialState = {}

export default function spotReducer(state = initialState, action) {
    switch(action.type) {
        case GET_SPOTS:
            return { ...action.payload.Spots }
            case GET_SPOT_DETAILS:
                const currSpot = action.payload
                console.log(currSpot, "#########################")
                return { ...state, [currSpot.id]: currSpot}
        default: return state
    }
}
