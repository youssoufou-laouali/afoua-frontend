import React, { Component } from 'react'
import Header1 from '../Header1'

class PrintCertificatDeVisiteMedical extends Component {

    constructor(props){
        super(props)

        this.state={
            
        }
    }

    date= new Date();

    render() {

        const {namePatient, lastNamePatient, lieuNaissancePatient, dateNaissancePatient, nameAgent, lastNameAgent}= this.props

        const dateNaissancePatientPrint = dateNaissancePatient !== '' ? new Date(dateNaissancePatient) : ''
         
        return (
            <div className="A4">
            <Header1 date={this.date} />
            <h2>CERTIFICAT DE VISITE MEDICALE</h2>
            <div>
                En exécution des règlements en vigueur, nous soussigné 
                <div className="inputAnimated" >
                    <input type="text" value={`${nameAgent} ${lastNameAgent}`} id='nameAgent'/>
                </div> <br/>
                Certifions que le(la) nommé(e): 
                <div className="inputAnimated">
                    <input type="text" value={namePatient} id='namePatient'/>
                </div> 
                <div className="inputAnimated">
                    <input type="text" value={lastNamePatient} id='lastNamePatient'/>
                </div> <br/>
                Né(e) à 
                 <div className="inputAnimated" >
                    <input value={lieuNaissancePatient} type="text" id='lieuNaissance'/>
                </div> le : 
                <div className="inputAnimated" >
                    <input value={ dateNaissancePatientPrint !=='' ? `${dateNaissancePatientPrint.getDate()}/${dateNaissancePatientPrint.getMonth()+1}/${dateNaissancePatientPrint.getFullYear()}`: ''} type="text" id='dateNaissance'/>
                    
                </div> <br/>
                N'est atteint (e) d'aucun signe de maladie contagieuse ou chronique contre indiquant son aptitude au travail <br/>
                <br/>
                En conséquence, le (la) susnommé (e) est apte <br/>

                <div className="right">
                    Fait à Niamey, le  
                    <div className="inputAnimated" >
                        <input type="text" value={`${this.date.getDate()}/${this.date.getMonth()+1}/${this.date.getFullYear()}`} id='text'/>
                        
                    </div> <br/> <br/>
                    Le Médecin: 
                    
                </div>
            </div>
        </div>
        )
    }
}

export default PrintCertificatDeVisiteMedical
