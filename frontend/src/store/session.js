import { csrfFetch } from './csrf'

const SET_USER = 'session/setUser'
const REMOVE_USER = 'session/removeUser'

// action creators

export function setUser(user) {
    return {
        type: SET_USER,
        payload: user
    }
}

export function removeUser() {
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

    const currUser = await response.json()
    dispatch(setUser(currUser))
    return currUser
}

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session')
    const sessionUser = await response.json()
    dispatch(setUser(sessionUser))
    return sessionUser
}

// reducer

const initialState = { user: null }

export default function sessionReducer(state = initialState, action) {
    switch(action.type) {
        case SET_USER:
            return { ...state, user: action.payload.user  }
        case REMOVE_USER:
            return initialState
        default:
            return state
    }
}
