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
            <h2>Consultation Pediatrique</h2>
            <div>
                Nom et Prénom: <strong>{namePatient} {lastNamePatient}</strong>   Age: {parseInt(this.date.getFullYear())-parseInt(dateDeNaissance)}
                <label>Sexe</label>
                <div className="inputAnimated">
                    <select id='sexe' value={data.sexe}>
                        <option value="" key="" >Aucun</option>
                        <option value="M" key="M">Masculin</option>
                        <option value="F" key="F">Feminin</option>
                    </select>
                    
                </div> <br/>
                <label>Adresse</label>
                <div className="inputAnimated">
                    <input id='adresse' value={data.adresse} type="text" />
                </div> <br/>
                <label>Maladie Connue</label>
                <div className="inputAnimated">
                    <input id='maladieConnue' value={data.maladieConnue} type="text" />
                </div> <br/>

                <label>Motif de Consultation</label>
                <div className="inputAnimated">
                    <input id='motifConsultation' value={data.motifConsultation} type="text" />
                </div> <br/>
               
               <div>
                   Constante et monsuration: <br/>
                   Poids: 
                   <div className="inputAnimated">
                        <input id='poids' value={data.poids} type="text" />
                    </div>
                    Taille
                    <div className="inputAnimated">
                        <input id='taille' value={data.taille} type="text" />
                    </div> 
                    PC: 
                    <div className="inputAnimated">
                        <input id='pc' value={data.pc} type="text" />
                    </div> 
                    T°
                    <div className="inputAnimated">
                        <input id='t' value={data.t} type="text" />
                    </div> 
                    FR 
                    <div className="inputAnimated">
                        <input id='fr' value={data.fr} type="text" />
                    </div> 
                    FC
                    <div className="inputAnimated">
                        <input id='fc' value={data.fc} type="text" />
                    </div> 
                    SaO2
                    <div className="inputAnimated">
                        <input id='sao2' value={data.sao2} type="text" />
                    </div> 
                    TA 
                    <div className="inputAnimated">
                        <input id='ta' value={data.ta} type="text" />
                    </div>  <br/>
                    Examen Physique 
                    <div className="inputAnimated">
                        <input id='examenPhysique' value={data.examenPhysique} type="text" />
                    </div>  <br/>
                    Bilan resultats 
                    <div className="inputAnimated">
                        <input id='bilanResultats' value={data.bilanResultats} type="text" />
                    </div>  <br/>
                    Diagnostic 
                    <div className="inputAnimated">
                        <input id='diagnostic' value={data.diagnostic} type="text" />
                    </div>  <br/>
                    Traitement 
                    <div className="inputAnimated">
                        <input id='traitement' value={data.traitement} type="text" />
                    </div>  <br/>
                    Rende-vous 
                    <div className="inputAnimated">
                        <input id='rdv' value={data.rdv} type="date" />
                    </div>  <br/>

               </div>
                
            
                <br/>
                <br/>
                <div>
                    <strong>Médecin:</strong> <br/> <br/> {nameAgent} {lastNameAgent}
                </div>
            </div>
           
            </div>
        )
    }
}

export default PrintEchographieAbdominal
