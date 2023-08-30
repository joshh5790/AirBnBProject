import { csrfFetch } from './csrf'

const SET_USER = 'session/SET_USER'
const REMOVE_USER = 'session/REMOVE_USER'

// action creators

export function setUser(user) {
    return {
        type: SET_USER,
        payload: user
    }
}

export function deleteUser() { // needs to remove the cookie too
    return { type: REMOVE_USER }
}

// thunks

export const demoLoginThunk = () => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential: 'Demo',
            password: 'password'
        })
    })

    const data = await response.json()
    dispatch(setUser(data.user))
    return response
}

export const loginThunk = user => async dispatch => {
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

export const restoreUserThunk = () => async dispatch => {
    const response = await csrfFetch('/api/session')
    const data = await response.json()
    dispatch(setUser(data.user))
    return response
}

export const signupThunk = user => async dispatch => {
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

export const logout = () => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
      });
      dispatch(deleteUser());
      return response;
}

// reducer

const initialState = { user: null }

export default function sessionReducer(state = initialState, action) {
    switch(action.type) {
        case SET_USER:
            return { ...state, user: action.payload }
        case REMOVE_USER:
            return initialState
        default:
            return state
    }
}
