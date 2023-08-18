import { csrfFetch } from './csrf'

const SET_USER = 'session/setUser'
const REMOVE_USER = 'session/removeUser'

// action creators

export function setUser(user) {
    console.log("SETUSER", user)
    return {
        type: SET_USER,
        payload: user
    }
}

export function removeUser() { // needs to remove the cookie too
    return { type: REMOVE_USER }
}

// thunks

export const login = user => async dispatch => {
    const { credential, password } = user
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    })

    const data = await response.json()
    dispatch(setUser(data.user))
    return response
}

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session')
    const data = await response.json()
    dispatch(setUser(data.user))
    return response
}

export const signup = user => async dispatch => {
    const { username, firstName, lastName, email, password } = user
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            username,
            firstName,
            lastName,
            email,
            password
        })
    })
    const data = await response.json()
    dispatch(setUser(data.user))
    return response
}

// reducer

const initialState = { user: null }

export default function sessionReducer(state = initialState, action) {
    switch(action.type) {
        case SET_USER:
            console.log(state)
            return { ...state, user: action.payload }
        case REMOVE_USER:
            return initialState
        default:
            return state
    }
}
