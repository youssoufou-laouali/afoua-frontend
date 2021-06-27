import React, { Component } from 'react'
import Header1 from '../Header1'

class PrintEchographieAbdominal extends Component {

    constructor(props){
        super(props)
    }

    date= new Date();

    render() {

        const {namePatient, lastNamePatient,dateDeNaissance, nameAgent, lastNameAgent, data}= this.props

         
        return (
            <div className="A4">
            <Header1 date={this.date} />
            <h2>Echographie Abdominale</h2>
            <div>
            Nom et prénom: 
                Soussigné, certifie avoir examiné ce jour <strong>{` ${namePatient} ${lastNamePatient}`} </strong> Age : <strong>{parseInt(this.date.getFullYear())-parseInt(dateDeNaissance)}</strong><br/><br/>
                Indications: {data.indications}
                <br/>
                <strong>RESULTATS</strong><br/>
                <ul>
                    <li>
                        Foie: 
                        <ul>
                            <li>
                                Taille: <br/>
                                - Lobe droit mesure {data.lobeDroit}
                                mm en avant du rein droit <br/>
                                - Lobe gauche mesure {data.lobeGauche}
                                mm en avant de l'aorte <br/>
                                - <br/>
                                Flèche hépatique mesure {data.flecheHepatique} 
                            </li>
                            <li>
                                Echostructure: {data.echostructure}
                              
                            </li>
                            <li>
                                Contours: {data.contours}
                              
                            </li>
                            <li>
                                Autres: {data.autres} 
                            
                            </li>
                        </ul>
                        </li>

                        <li>
                            Tronc porte et veines hépatique:
                            <textarea value={data.tpvh} id='tpvh' style={{fontSize:13}}  cols="90" rows="2">
                
                            </textarea>
                        </li>
                        <li>
                            Vésicule biliaire:
                            <textarea value={data.vesiculeBiliaire} id='vesiculeBiliaire' style={{fontSize:13}} cols="90" rows="2">
                
                            </textarea>
                        </li>
                        <li>
                            Pancréas : <br/>
                            <ul>
                                <li>Taille: {data.taillePancreas}
                                   mm Echostructure:{data.echostructurePancreas}
                                    
                                </li>
                                <li>
                                    Contours: {data.contoursPancreas}
                                   
                                </li>
                                <li>
                                    Autres: {data.autresPancreas}
                                    
                                </li>
                            </ul>
                        </li>
                        <li>
                            Rate : <br/>
                            <ul>
                                <li>Taille: {data.tailleRate}
                                    mm, Echostructure: {data.echostructureRate}
                                    
                                </li>
                                <li>
                                    Contours: {data.contoursRate}
                                    
                                </li>
                                <li>
                                    Autres: {data.autresRate}
                                    
                                </li>
                            </ul>
                        </li>
                        <li>
                            Reins: <br/>
                            - Droit: 
                            Taille: {data.tailleDroitReins}
                                    mm, Echostructure: {data.echostructureDroitReins}
                                    <br/> Cavités pyélocalicielles {data.cavitePyelocalicielleDroit} 
                                     <br/> <br/>
                            - Gauche: 
                            Taille: {data.tailleGaucheReins}
                                    mm, Echostructure: {data.echostructureGaucheReins}
                                    <br/> Cavités pyélocalicielles {data.cavitePyelocalicielleGauche}
                                     <br/>
                        </li>

                        <li>
                            Vessie: 
                            <ul>
                                <li>
                                    contours: {data.contoursVessie}
                                    
                                </li>
                                <li>
                                    contenu: {data.contenuVessie}
                                    
                                </li>
                                <li>
                                    parois: {data.paroisVessie}
                                     et mesure : <strong>{data.mesureParoisVessie}</strong>mm
                                </li>
                            </ul>
                        </li>
                </ul>
                Conclusion: {data.conclusion}
                
               
            </div>
        </div>
        )
    }
}

export default PrintEchographieAbdominal
