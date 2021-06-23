import React, {useState, useEffect} from 'react'
import Header1 from '../Header1'
import {useSelector, useDispatch} from 'react-redux'
import './style.css'
import axios from 'axios'
import { loadingTrue, loadingFalse } from "../../../redux/LogIn/action";

const CompteRenduAccouchement = ({idPatient, printCRA, closeCRA, namePatient, lastNamePatient, data, handleChange}) => {

    const dispatch = useDispatch()

    //Agent
    const agent = useSelector(state => state.login)
    const nameAgent = agent.currentUser.name
    const lastNameAgent = agent.currentUser.lastName

    //Date
    const [date, setDate] = useState(new Date())

   

    //Submit
    const handleSubmit=()=>{
        dispatch(loadingTrue())
        axios.post('api/cra/add', {patient: idPatient, ...data })
        .then(res=> {
            dispatch(loadingFalse())
            closeCRA()
            printCRA()
            console.log(res);
        })
        .catch(err=> {
            dispatch(loadingFalse())
            console.log(err)
        })
    }

   
    
    return (
        <div className="A4">
            <Header1 date={date} />

            <h2>COMPTE RENDU ACCOUCHEMENT</h2>
            <div className="avh">

                <textarea value={data.cra} id='cra' style={{fontSize:15}} onChange={e=>handleChange(e)} cols="90" rows="25">
                
                </textarea>
                <button className="submitA4" onClick={()=>handleSubmit()}>Envoyer</button>

            </div>
        </div>
    )
}

export default CompteRenduAccouchement
