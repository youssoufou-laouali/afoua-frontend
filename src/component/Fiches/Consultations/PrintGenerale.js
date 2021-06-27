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
            <h3>Consultation médecine Génerale</h3><br/>

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
                </div> 
                <label>Fonction</label>
                <div className="inputAnimated">
                    <input id='fonction' value={data.fonction} type="text" />
                </div> <br/>

                <label>Motif de Consultation</label>
                <div className="inputAnimated">
                    <input id='motifConsultation' value={data.motifConsultation} type="text" />
                </div> 
            
            <div><br/>
                <strong>- Intérrogatoires   </strong>  
                <strong>  ATCD 
                Personnels:</strong> <br/>
                
                    Medical
                    <div className="inputAnimated">
                        <input id='medical' value={data.medical} type="text" />
                    </div> 
                    chirurgical
                    <div className="inputAnimated">
                        <input id='chirurgical' value={data.chirurgical} type="text" />
                    </div> <br/>
                    gyneco-obstetrique
                    <div className="inputAnimated">
                        <input id='gynecoObstetrique' value={data.gynecoObstetrique} type="text" />
                    </div> <br/>
                    Allergies Medicamenteuse ou alimentation
                    <div className="inputAnimated">
                        <input id='allergies' value={data.allergies} type="text" />
                    </div> <br/>
                    <strong>- ATCDs</strong> <br/>
                    Familiaux: 
                    <div className="inputAnimated">
                        <input id='familiaux' value={data.familiaux} type="text" />
                    </div> <br/>
                    Automédication ou prescription médicale reçu: 
                    <div className="inputAnimated">
                        <input id='automedication' value={data.automedication} type="text" />
                    </div> <br/>
                    Hospitalisation recente pour: 
                    <div className="inputAnimated">
                        <input id='hospitalisationRecente' value={data.hospitalisationRecente} type="text" />
                    </div>  <br/>
                    Constantes: <br/>
                    T°
                    <div className="inputAnimated">
                        <input id='t' value={data.t} type="text" />
                    </div>  
                    FC
                    <div className="inputAnimated">
                        <input id='fc' value={data.fc} type="text" />
                    </div> <br/>
                    SpO2
                    <div className="inputAnimated">
                        <input id='spo2' value={data.spo2} type="text" />
                    </div> 
                    TA 
                    <div className="inputAnimated">
                        <input id='ta' value={data.ta} type="text" />
                    </div>  <br/>
                    Signe Généreaux: 
                    <div className="inputAnimated">
                        <input id='signeGenereaux' value={data.signeGenereaux} type="text" />
                    </div> 
                    Examen Physique 
                    <div className="inputAnimated">
                        <input id='examenPhysique' value={data.examenPhysique} type="text" />
                    </div>  <br/>
                    Soins reçu en urgence à l'admission
                    <div className="inputAnimated">
                        <input id='soinsRecuUrgence' value={data.soinsRecuUrgence} type="text" />
                    </div>  <br/>
                    Examens complementaires et resultats 
                    <div className="inputAnimated">
                        <input id='examenResultat' value={data.examenResultat} type="text" />
                    </div>  <br/>
                    Ordonnance prescrite et/ou hospitalisation
                    <div className="inputAnimated">
                        <input id='ordonnanceHospitalisation' value={data.ordonnanceHospitalisation} type="date" />
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
