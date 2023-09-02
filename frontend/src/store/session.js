import { csrfFetch } from './csrf'

const SET_USER = 'session/SET_USER'
const DELETE_USER = 'session/DELETE_USER'

// action creators

export function setUser(user) {
    return {
        type: SET_USER,
        payload: user
    }
}

export function deleteUser() {
    return { type: DELETE_USER }
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

export const editUserThunk = user => async dispatch => {
    const response = await csrfFetch(`/api/users/${user.id}`, {
        method: 'PUT',
        body: JSON.stringify(user)
    })

    const data = await response.json()
    dispatch(setUser(data))
    return response
}

export const deleteUserThunk = userId => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}`, {
        method: 'DELETE'
    })

    dispatch(deleteUser(userId))
    return response
}

// reducer

const initialState = { user: null }

export default function sessionReducer(state = initialState, action) {
    switch(action.type) {
        case SET_USER:
            return { user: action.payload }
        case DELETE_USER:
            return initialState
        default:
            return state
    }
}
