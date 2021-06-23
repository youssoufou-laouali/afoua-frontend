import React, {useState, useEffect} from 'react'
import Header1 from '../Header1'
import {useSelector, useDispatch} from 'react-redux'
import './style.css'
import axios from 'axios'
import { loadingTrue, loadingFalse } from "../../../redux/LogIn/action";

const AvisHospitalisation = ({idPatient, printAH, closeAH, namePatient, lastNamePatient, data, handleChange}) => {

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
        axios.post('/avishospitalisation/add', {patient: idPatient, ...data })
        .then(res=> {
            dispatch(loadingFalse())
            closeAH()
            printAH()
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

            <strong>A :</strong> 
            <div className="inputAnimated" >
                <input type="text" value={data.assurance} onChange={(e)=>handleChange(e)} id='assurance'/>
            </div>
            <h2>AVIS HOSPITALISATION</h2>
            <div className="avh">
               <strong>Patient</strong> 
                <div className="inputAnimated" >
                    <input type="text" onChange={(e)=>handleChange(e)} value={`${namePatient} ${lastNamePatient}`}/>
                </div> <br/> <br/>
                <strong>Numéro d'assuré </strong>
                <div className="inputAnimated">
                    <input type="text" value={data.numAssure} onChange={(e)=>handleChange(e)} id='numAssure'/>   
                </div> <br/> <br/>
                <strong>Nom de l'assuré</strong>
                <div className="inputAnimated">
                    <input type="text" value={data.nomAssure} onChange={(e)=>handleChange(e)} id='nomAssure'/>
                </div> <br/> <br/>
                <strong>Société :</strong>
                 <div className="inputAnimated" >
                    <input value={data.societe} type="text" onChange={(e)=>handleChange(e)} id='societe'/>
                </div><br/> <br/>
                <strong>Diagnostic clinique d'entrée</strong>
                <div className="inputAnimated" >
                    <input value={ data.diagnostic} type="text" onChange={(e)=>handleChange(e)} id='diagnostic'/> 
                </div> <br/> <br/>
                <strong>Date et Heure d'Hospitalisation</strong>
                <div className="inputAnimated" >
                    <input value={ data.dateHospitalisation} onChange={(e)=>handleChange(e)} type="date" id='dateHospitalisation'/> 
                </div>
                <div className="inputAnimated" >
                    <input value={ data.timeHospitalisation} onChange={(e)=>handleChange(e)} type="time" id='timeHospitalisation'/> 
                </div>
                 <br/> <br/>
                 <strong>Durée d'Hospitalisation</strong>
                <div className="inputAnimated" >
                    <input value={ data.dureeHospitalisation} onChange={(e)=>handleChange(e)}  type="number" id='dureeHospitalisation'/> 
                </div>

                        <button className="submitA4" onClick={()=>handleSubmit()}>Envoyer</button>
 
                
            </div>
        </div>
    )
}

export default AvisHospitalisation
