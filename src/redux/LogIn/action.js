import {LOAD_CONNECTER, CONNECT_SUCCESS, CONNECT_ERRORS, LOG_OUT, LOADING_TRUE, LOADING_FALSE} from './types'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../../utils/setAuthToken'

function loadConnecter(){
    return {
        type : LOAD_CONNECTER,
    }
}

export function connectSuccess(token){
    return {
        type: CONNECT_SUCCESS,
        payload: token
    }
}

export function logOut(){
    return {
        type: LOG_OUT,
    }
}

export function loadingTrue(){
    return {
        type: LOADING_TRUE,
    }
}

export function loadingFalse(){
    return {
        type: LOADING_FALSE,
    }
}

function connectErrors(errors){
    return {
        type: CONNECT_ERRORS,
        payload: errors
    }
}

export const apiLogin = ({phone, password}) =>{
    return dispatch =>{
        dispatch(loadConnecter())
        axios.post('api/agent/login', {phone, password})
        .then(res=> {
            const {token} = res.data
            localStorage.setItem('jwtToken', token)
            setAuthToken(token)
            
            const user= jwt_decode(token)
            dispatch(connectSuccess(user))
        })
        .catch(errors=> {
            dispatch(connectErrors(errors.response.data))
        })
    }
}