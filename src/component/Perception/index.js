import React, {useState, useEffect} from 'react'
import { socket } from "../Header";
import axios from 'axios'

const Perception = () => {

    socket.on("muraccueil", data=>{
        console.log(data);
    })

    useEffect(() => {

        axios.get('/api/muraccueil')
        .then(res => console.log(res.data))
        .catch(err=> console.log(err.response.data))
        
    }, [])

    return (
        <div>
            Perception
        </div>
    )
}

export default Perception
