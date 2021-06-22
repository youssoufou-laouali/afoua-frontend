import React, {useState, useEffect} from 'react'
import Header1 from '../Header1'
import {useSelector, useDispatch} from 'react-redux'
import './style.css'
import axios from 'axios'
import { loadingTrue, loadingFalse } from "../../../redux/LogIn/action";

const CerificatDeVisiteMedicale = ({idPatient, print, justification, justificationCVM, namePatient, module, lastNamePatient, lieuDeNaissance, dateDeNaissance, close}) => {

    const dispatch = useDispatch()

    //Agent
    const agent = useSelector(state => state.login)
    const nameAgent = agent.currentUser.name
    const lastNameAgent = agent.currentUser.lastName

    //Date
    const [date, setDate] = useState(new Date())

    //Change:
    
    
    useEffect(() => {
        justificationCVM(justification)
    }, [])

    //Submit
    const handleSubmit=()=>{
        dispatch(loadingTrue())
        axios.post('/certificatvisitemedicale/add', {patient: idPatient, justification})
        .then(certificat=> {
            
            axios.post('/module/update', {
                certificatVisiteMedicale: certificat.data.certificatVisiteMedicale._id,
                module: module
            })
            .then(response=>{
                
                dispatch(loadingFalse())
                close()
                print()
            })
            .catch(err=> {
                dispatch(loadingFalse())
                console.log(err)
            })
        })
        .catch(err=> {
            dispatch(loadingFalse())
            console.log(err)
        })
    }

   
    
    return (
        <div className="A4">
            <Header1 date={date} />
            <h2>CERTIFICAT DE VISITE MEDICALE</h2>
            <div>
                En exécution des règlements en vigueur, nous soussigné 
                <div className="inputAnimated" >
                    <input type="text" value={`${nameAgent} ${lastNameAgent}`} id='nameAgent'/>
                   
                    <label htmlFor='nameAgent'>nom de l'agent</label> 
                  
                </div> <br/>
                Certifions que le(la) nommé(e): 
                <div className="inputAnimated">
                    <input type="text" value={namePatient} id='namePatient'/>
                    
                    <label htmlFor='namePaient'>Prénom du patient</label> 
                   
                    
                </div> 
                <div className="inputAnimated">
                    <input type="text" value={lastNamePatient} id='lastNamePatient'/>
                    
                    <label htmlFor='lastNamePatient'>Nom de famille du patient</label>
                   
                    
                </div> <br/>
                Né(e) à 
                 <div className="inputAnimated" >
                    <input value={lieuDeNaissance} type="text" id='lieuNaissance'/>
                   
                    <label htmlFor='lieuNaissance'>lieu de naissance</label>
                    
                    
                </div> le : 
                <div className="inputAnimated" >
                    <input value={ dateDeNaissance} type="text" id='dateNaissance'/>
                    
                    <label  htmlFor='dateNaissance'>date de Naissance</label>
                    
                    
                </div> <br/> <br/>
                <textarea value={justification} style={{fontSize:15}} onChange={e=>justificationCVM(e.target.value)} cols="90" rows="5">
                
                </textarea>
                 <br/>

                <div className="right">
                    Fait à Niamey, le  
                    <div className="inputAnimated" >
                        <input type="text" value={`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`} id='text'/>
                       
                        <label htmlFor='date'>date</label>
                       
                        
                    </div> <br/> <br/>
                    Le Médecin: 
                    
                </div>
                
                        <button className="submitA4" onClick={()=>handleSubmit()}>Envoyer</button>
 
                
            </div>
        </div>
    )
}

export default CerificatDeVisiteMedicale
