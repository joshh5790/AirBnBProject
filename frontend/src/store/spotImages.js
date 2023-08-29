import { csrfFetch } from "./csrf"

const MODIFY_SPOT_IMAGE = 'spotImages/MODIFY_SPOT_IMAGE'
const DELETE_SPOT_IMAGE = 'spotImages/DELETE_SPOT_IMAGE'

// action creators

export function modifySpotImage(spotImage) {
    return {
        type: MODIFY_SPOT_IMAGE,
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

export const generateSpotImage = (url, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        body: JSON.stringify({ url })
    })

    const data = await response.json()
    dispatch(modifySpotImage(data))
    return response
}

export const editSpotImage = (url, spotImageId) => async dispatch => {
    const response = await csrfFetch(`/api/spot-images/${spotImageId}`, {
        method: 'PUT',
        body: JSON.stringify({ url })
    })

    const data = await response.json()
    dispatch(modifySpotImage(data))
    return response
}

export const removeSpotImage = spotImageId => async dispatch => {
    await csrfFetch(`/api/spot-images/${spotImageId}`, {
        method: 'DELETE'
    })

    dispatch(deleteSpotImage(spotImageId))
}

const initialState = {}

export default function spotImageReducer(state = initialState, action) {
    switch(action.type) {
        case MODIFY_SPOT_IMAGE:
            const newSpotImage = action.payload
            return { ...state, [newSpotImage.id]: newSpotImage }
        case DELETE_SPOT_IMAGE:
            const newState = { ...state }
            delete newState[action.payload]
            return newState
        default: return state
    }
}
