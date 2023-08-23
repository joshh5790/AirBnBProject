import { csrfFetch } from "./csrf"

const GET_REVIEWS = 'spots/GET_REVIEWS'

// selectors



// action creators

export function getReviews(reviews) {
    return {
        type: GET_REVIEWS,
        payload: reviews
    }
}


// thunks

export const retrieveReviews = spotId => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    
    const data = await response.json()
    dispatch(getReviews(data))
    return response
}


const initialState = {}

export default function reviewReducer(state = initialState, action) {
    switch(action.type) {
        case GET_REVIEWS:
            return { ...action.payload }
        default: return state
    }
}
