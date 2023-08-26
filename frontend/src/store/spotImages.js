import { csrfFetch } from "./csrf"

const CREATE_SPOT_IMAGE = 'spotImages/CREATE_SPOT_IMAGE'

// action creators

export function createSpotImage(spotImage) {
    return {
        type: CREATE_SPOT_IMAGE,
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

const initialState = {}

export default function spotImageReducer(state = initialState, action) {
    switch(action.type) {
        case CREATE_SPOT_IMAGE:
            console.log(action.payload, "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS")
            const newSpotImage = action.payload
            return { ...state, [newSpotImage.id]: newSpotImage }
        default: return state
    }
}
