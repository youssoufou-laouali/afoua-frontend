import React, { Component } from 'react'
import Header1 from '../Header1'

class PrintEchographieAbdominal extends Component {

    constructor(props){
        super(props)
    }

    date= new Date();

    render() {

        const {namePatient, lastNamePatient,dateDeNaissance ,nameAgent, lastNameAgent, data}= this.props

         
        return (
            <div className="A4">
            <Header1 date={this.date} />
            <h2>BILLET DE SORTIE</h2>

            <div> 
            Nom du malade: <strong>{` ${namePatient} ${lastNamePatient}`} </strong> age: <strong>{this.date.getFullYear()-parseInt(dateDeNaissance)}</strong><br/><br/>

                Motif d'hospitalisation: 
                <textarea value={data.motifHospitalisation} id='motifHospitalisation' style={{fontSize:15}} cols="90" rows="2">
            
                </textarea>

                Periode: du  
                <div className="inputAnimated" >
                    <input type="date" value={data.debutPeriode} id='debutPeriode'/>
                </div> 
                 au  
                 <div className="inputAnimated" >
                    <input type="date" value={data.finPeriode} id='finPeriode'/>
                </div>
                  <br/>
                Durée d'hospitalisation:
                <div className="inputAnimated">
                    <input type="string" value={data.dureeHospitalisation} id='dureeHospitalisation' />
                </div> jours <br/> 

                Diagnostic Retenu: 
                <textarea value={data.diagnosticRetenu} id='diagnosticRetenu' style={{fontSize:15}} cols="90" rows="2">
            
                </textarea>
                 <br/>

                Date de sortie: 
                 
                 <div className="inputAnimated" >
                    <input type="date" value={data.dateSortie} id='dateSortie'/>
                </div> <br/>

                <span>Ordonnance de sortie: </span> <br/>
                - 
                <textarea value={data.ordonnanceSortie1} id='ordonnanceSortie1' style={{fontSize:15}} cols="90" rows="1">
            
                </textarea><br/>
                -
                <textarea value={data.ordonnanceSortie2} id='ordonnanceSortie2' style={{fontSize:15}} cols="90" rows="1">
            
                </textarea><br/>
                -
                <textarea value={data.ordonnanceSortie3} id='ordonnanceSortie3' style={{fontSize:15}} cols="90" rows="1">
            
                </textarea><br/>

                Visite retour: 
                <div className="inputAnimated" >
                    <input type="date" value={data.visiteRetour} id='visiteRetour'/>
                </div> <br/>

                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>Le malade (ou son repondant) </div>
                    <div>Le médecin</div>
                </div>
            </div>
        </div>
        )
    }
}

export default PrintEchographieAbdominal
