import React, { Component } from 'react'
import Header1 from '../Header1'

class PrintBilletDeSortie extends Component {

    constructor(props){
        super(props)
    }

    date= new Date();

    render() {

        const {namePatient, lastNamePatient,dateDeNaissance ,nameAgent, lastNameAgent, data}= this.props

         
        return (
            <div className="A4">
            <Header1 date={this.date} />
            <h2>ECHOGRAPHIE VESICO-PROSTATIQUE</h2>
            <div>
                Nom et Prénom: <strong>{` ${namePatient} ${lastNamePatient}`} </strong> age: <strong>{this.date.getFullYear()-parseInt(dateDeNaissance)}</strong><br/><br/>
                Renseignements cliniques: 
                <div className="inputAnimated" >
                    <input type="text" value={data.renseignementClinique} id='renseignementClinique'/>
                </div> 
                 <br/><br/>

                Date de réalisation <strong>{this.date.getDate()}/{this.date.getMonth()+1}/{this.date.getFullYear()}</strong>
                    <h3>RESULTATS</h3>
                <ul>
                    <li>
                        Prostate: 
                        <textarea value={data.prostate} id='prostate' style={{fontSize:15}} cols="90" rows="3">
                
                        </textarea>
                    </li>
                    <li>
                        Vésicules séminales: 
                        <textarea value={data.vesiculeSeminale} id='vesiculeSeminale' style={{fontSize:15}} cols="90" rows="2">
                
                        </textarea>
                    </li>
                    <li>
                        Véssie: 
                        <textarea value={data.vessie} id='vessie' style={{fontSize:15}} cols="90" rows="2">
                
                        </textarea> <br/>
                        <ul>
                            <li>
                                Volume vésical: 
                                <div className="inputAnimated" >
                                    <input type="text" value={data.volumeVesical} id='volumeVesical'/>
                                </div> 
                            </li>
                            <li>
                                Parois vésicale: 
                                <div className="inputAnimated" >
                                    <input type="text" value={data.paroisVesicale} id='paroisVesicale'/>
                                </div> 
                            </li>
                            <li>
                                Résidu post-mictionnel: 
                                <div className="inputAnimated" >
                                    <input type="text" value={data.residuPostMictionnel} id='residuPostMictionnel'/>
                                </div> 
                            </li>
                        </ul>
                    </li>
                    <li>
                        Reins: 
                        <textarea value={data.reins} id='reins' style={{fontSize:15}} cols="90" rows="2">
            
                        </textarea>
                    </li>
                    <li>
                        Conclusion: 
                        <textarea value={data.conclusion} id='conclusion' style={{fontSize:15}} cols="90" rows="4">
            
                        </textarea>
                    </li>
                    
                </ul>
                 
                
            </div>
        </div>
        )
    }
}

export default PrintBilletDeSortie
