import React, { Component } from 'react'
import Header1 from '../Header1'

class PrintEchographieAbdominal extends Component {

    constructor(props){
        super(props)
    }

    date= new Date();

    render() {

        const {namePatient, lastNamePatient,dateDeNaissance ,nameAgent, lastNameAgent, data, Examens}= this.props

         
        return (
            <div className="A4 A4CRH">
            <Header1 date={this.date} />
            <h2>Dossier Médicale</h2>

            <div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                Nom et Prénom: <strong>{namePatient} {lastNamePatient}</strong>  <br/> Age: {parseInt(this.date.getFullYear())-parseInt(dateDeNaissance)} <br/>
                Sexe
                <div className="inputAnimated">
                    <select id='sexe' value={data.sexe}>
                        <option value="" key="" >Aucun</option>
                        <option value="M" key="M">Masculin</option>
                        <option value="F" key="F">Feminin</option>
                    </select>
                    
                </div> <br/>

                <label>Adresse:</label>
                <div className="inputAnimated">
                    <input id='adresse' value={data.adresse} type="text" />
                </div> <br/>
                Observation prise par: Dr <strong>{nameAgent} {lastNameAgent} </strong>
                </div>
                <div>
                    <h4>Type d'Assurance</h4>
                    Nom et Prénom Assuré: 
                    <div className="inputAnimated">
                        <input id='assure' value={data.assure} type="text" />
                    </div> <br/>
                    N°Police: 
                    <div className="inputAnimated">
                        <input id='numPolice' value={data.numPolice} type="text" />
                    </div> <br/>
                    N° assuré:
                    <div className="inputAnimated">
                        <input id='numAssure' value={data.numAssure} type="text" />
                    </div>
                </div>
                </div>
                Entrée le: 
                <div className="inputAnimated">
                    <input id='entree' value={data.entree} type="date" />
                </div>
                Sortie le:
                <div className="inputAnimated">
                    <input id='sortie' value={data.sortie} type="date" />
                </div>
                Chambre: 
                <div className="inputAnimated">
                    <input id='chambre' value={data.chambre} type="text" />
                </div>
                Motif de Consultation:
                <div className="inputAnimated">
                    <input id='motifConsultation' value={data.motifConsultation} type="text" />
                </div> <br/>
                Histoire de la maladie:
                <textarea id='histoireMaladie' value={data.histoireMaladie} style={{fontSize: 15}} cols="90" rows="4">
                    
                </textarea>

                <div>
                    <div>ATCD </div>
                    <div>
                        Personnels: 
                        <label>Médicale: </label> : 
                        <div className="inputAnimated">
                            <input id='medicale' value={data.medicale} type="text" />
                        </div> 
                        <label>Chirurgical: </label> : 
                        <div className="inputAnimated">
                            <input id='chirurgical' value={data.chirurgical} type="text" />
                        </div> <br/>
                        <label>Gynéco-obstétrique: </label> : 
                        <div className="inputAnimated">
                            <input id='gynecoObstetrique' value={data.gynecoObstetrique} type="text" />
                        </div> <br/>
                         
                        <label>Familiers: </label> : 
                        <div className="inputAnimated">
                            <input id='familiers' value={data.familiers} type="text" />
                        </div> <br/>
                    </div>
                </div>

                Examens à l'entrée: 
                <div className="inputAnimated">
                    <input id='examenEntree' value={data.examenEntree} type="text" />
                </div> T°
                <div className="inputAnimated">
                    <input id='t' value={data.t} type="text" />
                </div> <br/> TA
                <div className="inputAnimated">
                    <input id='ta' value={data.ta} type="text" />
                </div>Poids
                <div className="inputAnimated">
                    <input id='poids' value={data.poids} type="text" />
                </div> <br/> Taille
                <div className="inputAnimated">
                    <input id='taille' value={data.taille} type="text" />
                </div> 
                Etat Général: 
                <div className="inputAnimated">
                    <input id='etatGeneral' value={data.etatGeneral} type="text" />
                </div><br/>
                Coeur: 
                <div className="inputAnimated">
                    <input id='coeur' value={data.coeur} type="text" />
                </div> 
                Poumons:
                <div className="inputAnimated">
                    <input id='poumons' value={data.poumons} type="text" />
                </div> <br/>
                ABD:
                <div className="inputAnimated">
                    <input id='abd' value={data.abd} type="text" />
                </div> 
                ORL: 
                <div className="inputAnimated">
                    <input id='orl' value={data.orl} type="text" />
                </div> <br/>
                Autres app:
                <div className="inputAnimated">
                    <input id='autresApp' value={data.autresApp} type="text" />
                </div>
                <br/>
                <br/>
                RESUME:
                <textarea id='resume' value={data.resume} style={{fontSize: 15}} cols="90" rows="3">
                    
                </textarea>

                Examens demandés:
                <textarea id='examenDemandes' value={data.examenDemandes} style={{fontSize: 15}} cols="90" rows="3">
                    
                </textarea>
                Diagnostic Retenu:
                <textarea id='diagnosticRetenu' value={data.diagnosticRetenu} style={{fontSize: 15}} cols="90" rows="2">

                </textarea>
                Conduite à Ténir:
                <textarea id='conduiteTenir' value={data.conduiteTenir} style={{fontSize: 15}} cols="90" rows="3">

                </textarea>
                
            </div>

            <div>
                <h1>Examens Ultérieurs</h1>
                <table>
                    <tr>
                        <th>Dates Heures Médecins:</th>
                        <th>Compte Rendu: Examen clinique - Para clinique:</th>
                        <th>Modification Thérapeutiques Actes:</th>
                    </tr>
                    {
                        Examens && (
                            Examens.map((el, index)=> {
                            return(
                                <tr key={index}>
                                    <td> {el.date}---{el.heure} </td>
                                    <td>{el.compteRendu}</td>
                                    <td>{el.modifications} </td>
                                </tr>
                            )
                        }))
                    }
                    <tr>
                        <td colSpan={3}>
                            <strong>Observation</strong>
                            <textarea id='observations' value={data.observations} style={{fontSize: 15}} cols="90" rows="1">

                            </textarea>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        )
    }
}

export default PrintEchographieAbdominal
