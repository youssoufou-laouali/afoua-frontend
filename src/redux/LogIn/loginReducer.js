import {LOAD_CONNECTER, CONNECT_SUCCESS, CONNECT_ERRORS, LOG_OUT, LOADING_TRUE, LOADING_FALSE} from './types'

const initialStateLogIn = {
    isLoading: false,
    errors: {},
    currentUser: {},
    isAuthenticated: false,
}

const logInReducer = (state=initialStateLogIn, action) =>{
    switch (action.type) {
        case LOAD_CONNECTER:
            return {
                ...state,
                isLoading: true,
                errors: {},
                currentUser: {},
                isAuthenticated: false,
        }
        case CONNECT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: action.payload,
                isAuthenticated: true,
                errors: {}
            }
        case CONNECT_ERRORS:
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
                isAuthenticated: false,
                currentUser: {}
            }

        case LOG_OUT:{
            return initialStateLogIn
        }

        case LOADING_TRUE:{
            return {
                ...state,
                isLoading: true
            }
        }
        case LOADING_FALSE:{
            return {
                ...state,
                isLoading: false
            }
        }
    
        default: return state
    }
}

export default logInReducer