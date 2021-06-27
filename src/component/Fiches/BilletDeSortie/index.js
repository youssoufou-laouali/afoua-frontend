import React, {useState, useEffect} from 'react'
import Header1 from '../Header1'
import {useSelector, useDispatch} from 'react-redux'
import './style.css'
import axios from 'axios'
import { loadingTrue, loadingFalse } from "../../../redux/LogIn/action";

const BilletDeSortie = ({idPatient, printBS, closeBS, namePatient, lastNamePatient, dateDeNaissance, data, handleChange }) => {


    const dispatch = useDispatch()

    //Agent
    const agent = useSelector(state => state.login)
    const nameAgent = agent.currentUser.name
    const lastNameAgent = agent.currentUser.lastName

    //Date
    const [date, setDate] = useState(new Date())

  

    //Submit
    const handleSubmit=()=>{
       console.log(idPatient);
        dispatch(loadingTrue())
        axios.post('/billetsortie/add', {patient: idPatient, ...data})
        .then(res=> {
            console.log(res);
            dispatch(loadingFalse())
            closeBS()
            printBS()
        })
        .catch(err=> {
            dispatch(loadingFalse())
            console.log(err)
        })
    }


    return (
        <div className="A4">
            <Header1 date={date} />
            <h2>BILLET DE SORTIE</h2>

            <div> 
            Nom du malade: <strong>{` ${namePatient} ${lastNamePatient}`} </strong> age: <strong>{date.getFullYear()-parseInt(dateDeNaissance)}</strong><br/><br/>

                Motif d'hospitalisation: 
                <textarea value={data.motifHospitalisation} id='motifHospitalisation' style={{fontSize:15}} onChange={e=>handleChange(e)} cols="90" rows="2">
            
                </textarea>

                Periode: du  
                <div className="inputAnimated" >
                    <input type="date" value={data.debutPeriode} onChange={(e)=> handleChange(e)} id='debutPeriode'/>
                </div> 
                 au  
                 <div className="inputAnimated" >
                    <input type="date" value={data.finPeriode} onChange={(e)=> handleChange(e)} id='finPeriode'/>
                </div>
                  <br/>
                Durée d'hospitalisation:
                <div className="inputAnimated">
                    <input type="number" value={data.dureeHospitalisation} onChange={(e)=> handleChange(e)} id='dureeHospitalisation' />
                </div> jours <br/> 

                Diagnostic Retenu: 
                <textarea value={data.diagnosticRetenu} id='diagnosticRetenu' style={{fontSize:15}} onChange={e=>handleChange(e)} cols="90" rows="2">
            
                </textarea>
                 <br/>

                Date de sortie: 
                 
                 <div className="inputAnimated" >
                    <input type="date" value={data.dateSortie} onChange={(e)=> handleChange(e)} id='dateSortie'/>
                </div> <br/>

                <span>Ordonnance de sortie: </span> <br/>
                - 
                <textarea value={data.ordonnanceSortie1} id='ordonnanceSortie1' style={{fontSize:15}} onChange={e=>handleChange(e)} cols="90" rows="1">
            
                </textarea><br/>
                -
                <textarea value={data.ordonnanceSortie2} id='ordonnanceSortie2' style={{fontSize:15}} onChange={e=>handleChange(e)} cols="90" rows="1">
            
                </textarea><br/>
                -
                <textarea value={data.ordonnanceSortie3} id='ordonnanceSortie3' style={{fontSize:15}} onChange={e=>handleChange(e)} cols="90" rows="1">
            
                </textarea><br/>

                Visite retour: 
                <div className="inputAnimated" >
                    <input type="date" value={data.visiteRetour} onChange={(e)=> handleChange(e)} id='visiteRetour'/>
                </div> <br/>

                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>Le malade (ou son repondant) </div>
                    <div>Le médecin</div>
                </div>
            </div>
            <button className="submitA4" onClick={()=>handleSubmit()}>Envoyer</button>

        </div>
    )
}

export default BilletDeSortie
