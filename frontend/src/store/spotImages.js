import { csrfFetch } from "./csrf"

const MODIFY_SPOT_IMAGE = 'spotImages/MODIFY_SPOT_IMAGE'

// action creators

export function createSpotImage(spotImage) {
    return {
        type: MODIFY_SPOT_IMAGE,
        payload: spotImage
    }
}

// thunks

export const generateSpotImage = (url, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        body: JSON.stringify({ url })
    })

    const data = await response.json()
    dispatch(createSpotImage(data))
    return data
}

export const modifySpotImage = (url, spotId) => async dispatch => {
    
}

const initialState = {}

export default function spotImageReducer(state = initialState, action) {
    switch(action.type) {
        case MODIFY_SPOT_IMAGE:
            const newSpotImage = action.payload
            return { ...state, [newSpotImage.id]: newSpotImage }
        default: return state
    }
}
