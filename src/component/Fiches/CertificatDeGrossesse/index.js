import React, {useState} from 'react'
import Header1 from '../Header1'
import {useSelector, useDispatch} from 'react-redux'
import './style.css'
import axios from 'axios'
import { loadingTrue, loadingFalse } from "../../../redux/LogIn/action";

const CerificatDeGrossesse = ({idPatient, printCG, closeCG, namePatient, lastNamePatient, data, handleChange }) => {

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
        axios.post('/certificatgrossesse/add', {patient: idPatient, ...data})
        .then(certificat=> {
  
            dispatch(loadingFalse())
            closeCG()
            printCG()
        })
        .catch(err=> {
            dispatch(loadingFalse())
            console.log(err)
        })
    }

   
    
    return (
        <div className="A4">
            <Header1 date={date} />
            <h2>CERTIFICAT DE GROSSESSE</h2>
            <div>
                La Gynécologue-Obstétricien de la clinique Afoua. <br/><br/>
                Soussigné, certifie avoir examiné ce jour <strong> {` ${date.getDate()}/${date.getMonth()+1}/${date.getUTCFullYear()}`} </strong><br/><br/>
                La nommée: <strong>{` ${namePatient} ${lastNamePatient}`} </strong><br/><br/>
                A une Grossesse de 
                <div className="inputAnimated" >
                    <input type="number" value={data.nbreSemaine} onChange={(e)=> handleChange(e)} id='nbreSemaine'/>
                   
                    <label htmlFor='nbreSemaine'>nombre de semaines</label> 
                  
                </div> Semaines d'aménorrhé ( 

                <div className="inputAnimated">
                    <input type="number" value={data.nbreMois} onChange={(e)=> handleChange(e)} id='nbreMois'/>
                    
                    <label htmlFor='nbreMois'>nombre de mois</label> 
                   
                    
                </div> ) <br/><br/>

                L'accouchement est prévu le 
                <div className="inputAnimated">
                    <input type="date" value={data.datePrevu} onChange={(e)=> handleChange(e)} id='datePrevu'/>
                    
                    <label htmlFor='datePrevu'>Date prévu</label>
                   
                    
                </div> Sauf complication <br/>
                
                 
                 <br/>

                <div className="right">
                    Fait à Niamey, le  
                    <div className="inputAnimated" >
                        <strong>{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</strong>
                       
                    </div> <br/> <br/>
                    Le Gynécologue: 
                    <br/><br/><strong>{nameAgent} {lastNameAgent}</strong>
                    
                </div>
                
                <button className="submitA4" onClick={()=>handleSubmit()}>Envoyer</button>
 
                
            </div>
        </div>
    )
}

export default CerificatDeGrossesse
