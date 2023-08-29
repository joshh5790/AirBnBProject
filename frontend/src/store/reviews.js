import { csrfFetch } from "./csrf"

const GET_REVIEWS = 'spots/GET_REVIEWS'
const MODIFY_REVIEW = 'reviews/MODIFY_REVIEW'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

// selectors

export const allSpotReviews = state => {
    const allReviews = Object.values(state.reviews)
    allReviews.sort((a,b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
    })
    return allReviews
}

// action creators

export function getReviews(reviews) {
    return {
        type: GET_REVIEWS,
        payload: reviews
    }
}

export function modifyReview(review) {
    return {
        type: MODIFY_REVIEW,
        payload: review
    }
}

export function removeReview(reviewId) {
    return {
        type: DELETE_REVIEW,
        payload: reviewId
    }
}


// thunks

export const retrieveReviews = spotId => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    const data = await response.json()
    const dataID = {}
    data.forEach(review => {
        dataID[review.id] = review
    })
    dispatch(getReviews(dataID))
    return response
}

export const createNewReview = (review, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(review)
    })

    const data = await response.json()
    dispatch(modifyReview(data))
    return response
}

export const deleteReview = reviewId => async dispatch => {
    await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    dispatch(removeReview(reviewId))
}

export const editReview = review => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        body: JSON.stringify(review)
    })

    const data = await response.json()
    dispatch(modifyReview(data))
    return response
}


const initialState = {}

export default function reviewReducer(state = initialState, action) {
    switch(action.type) {
        case GET_REVIEWS:
            return { ...action.payload }
        case MODIFY_REVIEW:
            return { ...state, [action.payload.id]: action.payload }
        case DELETE_REVIEW:
            const newState = { ...state }
            delete newState[action.payload]
            return newState
        default: return state
    }
}
