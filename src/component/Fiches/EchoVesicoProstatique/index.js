import React, {useState, useEffect} from 'react'
import Header1 from '../Header1'
import {useSelector, useDispatch} from 'react-redux'
import './style.css'
import axios from 'axios'
import { loadingTrue, loadingFalse } from "../../../redux/LogIn/action";

const EchoVesicoProstatique = ({idPatient, printEVP, closeEVP, namePatient, lastNamePatient, dateDeNaissance, data, handleChange }) => {

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
        axios.post('/echovesicoprostatique/add', {patient: idPatient, ...data})
        .then(certificat=> {
  
            dispatch(loadingFalse())
            closeEVP()
            printEVP()
        })
        .catch(err=> {
            dispatch(loadingFalse())
            console.log(err)
        })
    }

   
    
    return (
        <div className="A4">
            <Header1 date={date} />
            <h2>ECHOGRAPHIE VESICO-PROSTATIQUE</h2>
            <div>
                Nom et Prénom: <strong>{` ${namePatient} ${lastNamePatient}`} </strong> age: <strong>{date.getFullYear()-parseInt(dateDeNaissance)}</strong><br/><br/>
                Renseignements cliniques: 
                <div className="inputAnimated" >
                    <input type="text" value={data.renseignementClinique} onChange={(e)=> handleChange(e)} id='renseignementClinique'/>
                </div> 
                 <br/><br/>

                Date de réalisation <strong>{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</strong>
                    <h3>RESULTATS</h3>
                <ul>
                    <li>
                        Prostate: 
                        <textarea value={data.prostate} id='prostate' style={{fontSize:15}} onChange={e=>handleChange(e)} cols="90" rows="3">
                
                        </textarea>
                    </li>
                    <li>
                        Vésicules séminales: 
                        <textarea value={data.vesiculeSeminale} id='vesiculeSeminale' style={{fontSize:15}} onChange={e=>handleChange(e)} cols="90" rows="2">
                
                        </textarea>
                    </li>
                    <li>
                        Véssie: 
                        <textarea value={data.vessie} id='vessie' style={{fontSize:15}} onChange={e=>handleChange(e)} cols="90" rows="2">
                
                        </textarea> <br/>
                        <ul>
                            <li>
                                Volume vésical: 
                                <div className="inputAnimated" >
                                    <input type="text" value={data.volumeVesical} onChange={(e)=> handleChange(e)} id='volumeVesical'/>
                                </div> 
                            </li>
                            <li>
                                Parois vésicale: 
                                <div className="inputAnimated" >
                                    <input type="text" value={data.paroisVesicale} onChange={(e)=> handleChange(e)} id='paroisVesicale'/>
                                </div> 
                            </li>
                            <li>
                                Résidu post-mictionnel: 
                                <div className="inputAnimated" >
                                    <input type="text" value={data.residuPostMictionnel} onChange={(e)=> handleChange(e)} id='residuPostMictionnel'/>
                                </div> 
                            </li>
                        </ul>
                    </li>
                    <li>
                        Reins: 
                        <textarea value={data.reins} id='reins' style={{fontSize:15}} onChange={e=>handleChange(e)} cols="90" rows="2">
            
                        </textarea>
                    </li>
                    <li>
                        Conclusion: 
                        <textarea value={data.conclusion} id='conclusion' style={{fontSize:15}} onChange={e=>handleChange(e)} cols="90" rows="4">
            
                        </textarea>
                    </li>
                    
                </ul>
                
                <button className="submitA4" onClick={()=>handleSubmit()}>Envoyer</button>
 
                
            </div>
        </div>
    )
}

export default EchoVesicoProstatique
