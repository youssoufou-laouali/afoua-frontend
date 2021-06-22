import React, { Component } from 'react'
import Header1 from '../Header1'
import './style.css'

class PrintCompteRenduHospitalisation extends Component {

    constructor(props){
        super(props)
    }

    date= new Date();

    render() {

        const { nameAgent, lastNameAgent, namePatient, lastNamePatient, handleChange, data, dateDeNaissance }= this.props

         
        return (
            <div className="A4 A4CR">
                <Header1 date={this.date} />
                <h2>COMPTE RENDU D'HOSPITALISATION</h2>

            <div>
                Nom et Prénom: <strong>{namePatient} {lastNamePatient}</strong>   Age: {parseInt(this.date.getFullYear())-parseInt(dateDeNaissance)}
                <strong>Sexe</strong>: {data.sexe} 
                <br/>

                <strong>Motif d'Hospitalisation: </strong> {data.motifHospitalisation}
                 <br/> 
                <strong>Hospitalisé du:</strong> {data.debutHospitalisation}
                
                <strong> au : </strong>{data.finHospitalisation} <strong></strong>
                
                () jours <br/> <br/>

                <div>
                    
                    <div>
                        ATCD
                       <strong> Personnels: </strong> 
                        <strong>Médicale: </strong> : {data.medicale} <br/>
                        
                        <strong>Chirurgical: </strong> : {data.chururgical} 
                         <br/>
                        <strong>Gynéco-obstétrique: </strong> : {data.gynecoObstretrique}
                        <br/>
                         
                        <strong>Familiers: </strong> : {data.familiers}
                        <br/> 
                    </div>
                </div>

                <strong>Examens à l'entrée:</strong> {data.examenEntree} 
                 <strong> T°: </strong> {data.t} 
                  <strong>TA: </strong> {data.ta} 
                  <strong>Poids: </strong> {data.poids}
                  <strong> Taille:</strong> {data.taille}
                <br/>
                
                <strong>Etat Général:</strong> {data.etatGeneral}
                <br/>
                <strong>Coeur:</strong> {data.coeur}
                <br/>
                <strong>Poumons:</strong> {data.poumons}
               <br/>
                <strong>ABD:  </strong>{data.abd}
                <br/>
                <strong>ORL: </strong> {data.orl}
                <br/>
                <strong>Autres app:  </strong>{data.autresApp}
               
                <br/><br/>

                <strong>Examens demandés: </strong> {data.examenDemandes}
                <br/>
                <strong>Diagnostic Retenu: </strong>{data.diagnosticRetenu}
                <br/>
                <strong>Conduite à Ténir:</strong> {data.conduiteTenir}
                <br/>
                <strong>Evolution:</strong> {data.evolution}
                
                <br/>
                <br/>
                <br/>
                <div>
                    <strong>Médecin:</strong>  <br/> {nameAgent} {lastNameAgent}
                </div>
            </div>
            </div>
        )
    }
}

export default PrintCompteRenduHospitalisation
