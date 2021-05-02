import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { loadingTrue, loadingFalse } from "../../redux/LogIn/action";
import {useDispatch} from 'react-redux'
import Agent from './Agent'

const ListAgent = () => {

    const [data, setData] = useState([])
    const dispatch = useDispatch()

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
