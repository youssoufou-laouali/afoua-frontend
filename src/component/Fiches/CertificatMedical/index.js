import React, {useState, useEffect} from 'react'
import Header1 from '../Header1'
import {useSelector, useDispatch} from 'react-redux'
import './style.css'
import axios from 'axios'
import { loadingTrue, loadingFalse } from "../../../redux/LogIn/action";

const CerificatMedicale = ({idPatient, handleChangeConstat, constat ,closeCM, printCM, namePatient, module, lastNamePatient,}) => {

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
        console.log(idPatient);
        axios.post('/certificatmedical/add', {constat, patient: idPatient})
        .then(certificat=> {
            axios.post('/module/update', {
                certificatMedicale: certificat.data.certificatMedical._id,
                module: module
            })
            .then(response=>{
                
                dispatch(loadingFalse())
                closeCM()
                printCM()
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
            <h2>CERTIFICAT MEDICALE</h2>
            <div>
                Je soussigné 
                <div className="inputAnimated" >
                    <input type="text" value={`${nameAgent} ${lastNameAgent}`}/>
                   
                    <label htmlFor='nameAgent'>nom de l'agent</label> 
                  
                </div> reconnait avoir consulté  <br/>
                Ce jour {date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}, 
                le (la) patient(e): 
                <div className="inputAnimated">
                    <input type="text" value={`${namePatient} ${lastNamePatient}`} id='namePatient'/>
                    
                    <label htmlFor='namePaient'>nom et Prénom du patient</label> 
                   
                    
                </div>  
                 <br/>
                Et constaté 
                
                <textarea value={constat} style={{fontSize:15}} onChange={e=>handleChangeConstat(e)} cols="90" rows="5">
                
                </textarea>
                 <br/>

                 En foi de quoi, le present certificat lui est delivré pour servir et valoir ce que de droit

                <div className="right">
                    <br/> <br/>
                    Le Médecin: <br/> <br/>
                    {nameAgent} {lastNameAgent}
                    
                </div>
                
                        <button className="submitA4" onClick={()=>handleSubmit()}>Envoyer</button>
 
                
            </div>
        </div>
    )
}

export default CerificatMedicale
