import { csrfFetch } from "./csrf"

const GET_SPOTS = 'spots/GET_SPOTS'
const GET_SPOT_DETAILS = 'spots/GET_SPOT_DETAILS'
const CREATE_SPOT = 'spots/CREATE_SPOT'



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

export function createSpot(spot) {
    return {
        type: CREATE_SPOT,
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

export const retrieveCurrentSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots/current')

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

export const createNewSpot = spot => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(spot)
    }) // promise all? Would still need to retrieve spot id tho
    // or have my errors separate from my fetches

    const data = await response.json()
    dispatch(createSpot(data))

    return data
}

const initialState = {}

export default function spotReducer(state = initialState, action) {
    switch(action.type) {
        case GET_SPOTS:
            return { ...action.payload.Spots }
            case GET_SPOT_DETAILS:
                const currSpot = action.payload
                return { ...state, [currSpot.id]: currSpot}
        default: return state
    }
}
