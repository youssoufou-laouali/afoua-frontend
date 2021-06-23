import React, { Component } from 'react'
import Header1 from '../Header1'

class PrintAvisHospitalisation extends Component {

    constructor(props){
        super(props)
    }

    date= new Date();

    render() {

        const {namePatient, lastNamePatient, data}= this.props

         
        return (
            <div className="A4">
            <Header1 date={this.date} />
            <strong>A :</strong> 
            <div className="inputAnimated" >
                <input type="text" value={data.assurance}  id='assurance'/>
            </div>
            <h2>AVIS HOSPITALISATION</h2>
            <div className="avh">
               <strong>Patient</strong> 
                <div className="inputAnimated" >
                    <input type="text"  value={`${namePatient} ${lastNamePatient}`}/>
                </div> <br/> <br/>
                <strong>Numéro d'assuré </strong>
                <div className="inputAnimated">
                    <input type="text" value={data.numAssure}  id='numAssure'/>   
                </div> <br/> <br/>
                <strong>Nom de l'assuré</strong>
                <div className="inputAnimated">
                    <input type="text" value={data.nomAssure}  id='nomAssure'/>
                </div> <br/> <br/>
                <strong>Société :</strong>
                 <div className="inputAnimated" >
                    <input value={data.societe} type="text"  id='societe'/>
                </div><br/> <br/>
                <strong>Diagnostic clinique d'entrée</strong>
                <div className="inputAnimated" >
                    <input value={ data.diagnostic} type="text"  id='diagnostic'/> 
                </div> <br/> <br/>
                <strong>Date et Heure d'Hospitalisation</strong>
                <div className="inputAnimated" >
                    <input value={ data.dateHospitalisation}  type="date" id='dateHospitalisation'/> 
                </div>
                <div className="inputAnimated" >
                    <input value={ data.timeHospitalisation}  type="time" id='timeHospitalisation'/> 
                </div>
                 <br/> <br/>
                 <strong>Durée d'Hospitalisation</strong>
                <div className="inputAnimated" >
                    <input value={ data.dureeHospitalisation}   type="number" id='dureeHospitalisation'/> 
                </div>
            </div>
            
            </div>
        )
    }
}

export default PrintAvisHospitalisation
