import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { loadingTrue, loadingFalse } from "../../redux/LogIn/action";
import {useDispatch, useSelector} from 'react-redux'
import socketClient  from "socket.io-client";
import Agent from './Agent'
import { logOut } from '../../redux/LogIn/action'
import {useHistory} from 'react-router-dom'

const ListAgent = () => {

    const [data, setData] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()
    const currentUser = useSelector(state => state.login)
    const handleLogOut= ()=>{
        localStorage.removeItem('jwtToken')
        dispatch(logOut())
    }
    useEffect(() => {
        if(currentUser.currentUser.exp*1000 <= Date.now()){
            handleLogOut()
        }
        if(currentUser.currentUser.post !== 'admin' && currentUser.currentUser.post !== 'superAdmin'){
            history.push('/')
        }
    }, [])


    useEffect(() => {
        if(!currentUser.isAuthenticated){
            history.push('/signin')
        }
    }, [currentUser, history])

    useEffect(() => {
        dispatch(loadingTrue())
        axios.get('/api/agent')
        .then(response=>{
            dispatch(loadingFalse())
            setData(response.data.agent)
        })
        .catch(errors=>{
            dispatch(loadingFalse())
            console.log(errors) 
        })
    }, [])

    return (
        <div>
            {
                data.map((el)=>(
                    <Agent 
                        id={el._id}
                        name={el.name} 
                        lastName={el.lastName} 
                        phone={el.phone}
                        email={el.email}
                        post={el.post}
                    />
                    )
                )
            }
            
        </div>
    )
}

export default ListAgent
