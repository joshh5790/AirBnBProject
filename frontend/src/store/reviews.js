import { csrfFetch } from "./csrf"

const GET_REVIEWS = 'spots/GET_REVIEWS'
const CREATE_REVIEW = 'reviews/CREATE_REVIEW'

// selectors



// action creators

export function getReviews(reviews) {
    return {
        type: GET_REVIEWS,
        payload: reviews
    }
}

export function createReview(review) {
    return {
        type: CREATE_REVIEW,
        payload: review
    }
}

// thunks

export const retrieveReviews = spotId => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    const data = await response.json()
    dispatch(getReviews(data))
    return response
}

export const createNewReview = (review, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(review)
    })

    const data = await response.json()
    dispatch(createReview(data))
    return response
}


const initialState = {}

export default function reviewReducer(state = initialState, action) {
    switch(action.type) {
        case GET_REVIEWS:
            return { ...action.payload }
        case CREATE_REVIEW:
            const newReview = action.payload
            return { ...state, [newReview.id]: newReview }
        default: return state
    }
}
