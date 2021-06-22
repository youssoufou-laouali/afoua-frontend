import React, {useState, useEffect} from 'react'
import Header1 from '../Header1'
import {useSelector, useDispatch} from 'react-redux'
import './style.css'
import axios from 'axios'
import { loadingTrue, loadingFalse } from "../../../redux/LogIn/action";

const CerificatAccouchement = ({idPatient, printCA, closeCA, namePatient, lastNamePatient, data, handleChange }) => {

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
        axios.post('/certificataccouchement/add', {patient: idPatient, ...data})
        .then(certificat=> {
            console.log(certificat);
            dispatch(loadingFalse())
            closeCA()
            printCA()
        })
        .catch(err=> {
            dispatch(loadingFalse())
            console.log(err)
        })
    }

   
    
    return (
        <div className="A4">
            <Header1 date={date} />
            <h2>CERTIFICAT D'ACCOUCHEMENT'</h2>
            <div>
                La Nommée: <strong>{` ${namePatient} ${lastNamePatient}`} </strong><br/><br/>
                Profession
                <div className="inputAnimated" >
                    <input type="text" value={data.profession} onChange={(e)=> handleChange(e)} id='profession'/>
                   
                    <label htmlFor='profession'>Profession</label> 
                  
                </div> MLE 
                <div className="inputAnimated" >
                    <input type="text" value={data.mle} onChange={(e)=> handleChange(e)} id='mle'/>
                   
                    <label htmlFor='mle'>MLE</label> 
                  
                </div> <br/><br/>

                A accouché le
                <div className="inputAnimated">
                    <input type="date" value={data.dateAccouchement} onChange={(e)=> handleChange(e)} id='dateAccouchement'/>
                    
                    <label htmlFor='dateAccouchement'>Date d'Accouchement</label>
                   
                    
                </div> D'UN ENFANT DE SEXE  
                <div className="inputAnimated">
                    <input type="text" value={data.sexe} onChange={(e)=> handleChange(e)} id='sexe'/>
                    
                    <label htmlFor='sexe'>Sexe</label>
                   
                    
                </div>
                <br/>
                <br/>

                Et qui à reçu le Prénom de :
                <div className="inputAnimated">
                    <input type="text" value={data.prenom} onChange={(e)=> handleChange(e)} id='prenom'/>
                    <label htmlFor='prenom'>Prénom</label>
                </div> <br/> <br/>
                Dont le Père est 
                <div className="inputAnimated">
                    <input type="text" value={data.pere} onChange={(e)=> handleChange(e)} id='pere'/>
                    <label htmlFor='pere'>Nom du père</label>
                </div><br/> <br/>
                La Mère est 
                <div className="inputAnimated">
                    <input type="text" value={`${namePatient} ${lastNamePatient}`} />
                </div><br/> <br/>

                <div className="right">

                    La Sage Femme: 
                    <br/><br/><strong>{nameAgent} {lastNameAgent}</strong>
                    
                </div>
                
                <button className="submitA4" onClick={()=>handleSubmit()}>Envoyer</button>
 
                
            </div>
        </div>
    )
}

export default CerificatAccouchement
