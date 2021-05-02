import React,{useState} from 'react'
import axios from 'axios'

const Accueil = () => {

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')


    const handleSubmit= (e)=>{
        e.preventDefault()
        axios.post('/api/patient/verify', {name, lastName})
        .then(patients=> console.log(patients))
        .catch(errors=> console.log(errors))
    }

    return (
        <div>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <input type="text" id="name" value={name} onChange={(e)=> setName(e.target.value)} />
                <input type="text" id="lastName" value={lastName} onChange={(e)=> setLastName(e.target.value)} />
            </form>
        </div>
    )
}

export default Accueil
