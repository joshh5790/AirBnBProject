import { csrfFetch } from "./csrf"

const GET_SPOTS = 'spots/GET_SPOTS'
const GET_SPOT_DETAILS = 'spots/GET_SPOT_DETAILS'
const DELETE_SPOT = 'spots/DELETE_SPOT'
const EDIT_SPOT = '/spots/EDIT_SPOT'


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

export function deleteSpot(spotId) {
    return {
        type: DELETE_SPOT,
        payload: spotId
    }
}

export function editSpot(spot) {
    return {
        type: EDIT_SPOT,
        payload: spot
    }
}

// thunks

export const getAllSpotsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/spots')

    const data = await response.json()
    const dataID = {}
    data.Spots.forEach(spot => {
        dataID[spot.id] = spot
    })
    dispatch(getSpots(dataID))
    return response
}

export const getCurrentSpotsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/spots/current')

    const data = await response.json()
    const dataID = {}
    data.Spots.forEach(spot => {
        dataID[spot.id] = spot
    })
    dispatch(getSpots(dataID))
    return response
}

export const getSpotDetailsThunk = spotId => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`)

    const data = await response.json()
    dispatch(getSpotDetails(data))
    return data
}

export const createSpotThunk = spot => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(spot)
    })

    const data = await response.json()
    dispatch(editSpot(data))
    return data
}

export const deleteSpotThunk = spotId => async dispatch => {
    await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })

    dispatch(deleteSpot(spotId))
}

export const editSpotThunk = spot => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        body: JSON.stringify(spot)
    })

    const data = await response.json()
    dispatch(editSpot(data))
    return response
}

const initialState = {}

export default function spotReducer(state = initialState, action) {
    switch(action.type) {
        case GET_SPOTS:
            return { ...action.payload }
        case GET_SPOT_DETAILS:
            const currSpot = action.payload
            return { ...state, [currSpot.id]: currSpot }
        case DELETE_SPOT:
            const newState = { ...state }
            delete newState[action.payload]
            return newState
        case EDIT_SPOT:
            const editSpot = action.payload
            return { ...state, [editSpot.id]: editSpot }
        default: return state
    }
}
