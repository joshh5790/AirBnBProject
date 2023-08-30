import { csrfFetch } from "./csrf"

const UPDATE_SPOT_IMAGE = 'spotImages/UPDATE_SPOT_IMAGE'
const DELETE_SPOT_IMAGE = 'spotImages/DELETE_SPOT_IMAGE'

// action creators

export function updateSpotImage(spotImage) {
    return {
        type: UPDATE_SPOT_IMAGE,
        payload: spotImage
    }
}

export function deleteSpotImage(imageId) {
    return {
        type: DELETE_SPOT_IMAGE,
        payload: imageId
    }
}

// thunks

export const createSpotImageThunk = (url, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        body: JSON.stringify({ url })
    })

    const data = await response.json()
    dispatch(updateSpotImage(data))
    return response
}

export const updateSpotImageThunk = (url, spotImageId) => async dispatch => {
    const response = await csrfFetch(`/api/spot-images/${spotImageId}`, {
        method: 'PUT',
        body: JSON.stringify({ url })
    })

    const data = await response.json()
    dispatch(updateSpotImage(data))
    return response
}

export const deleteSpotImageThunk = spotImageId => async dispatch => {
    await csrfFetch(`/api/spot-images/${spotImageId}`, {
        method: 'DELETE'
    })

    dispatch(deleteSpotImage(spotImageId))
}

const initialState = {}

export default function spotImageReducer(state = initialState, action) {
    switch(action.type) {
        case UPDATE_SPOT_IMAGE:
            const newSpotImage = action.payload
            return { ...state, [newSpotImage.id]: newSpotImage }
        case DELETE_SPOT_IMAGE:
            const newState = { ...state }
            delete newState[action.payload]
            return newState
        default: return state
    }
}
