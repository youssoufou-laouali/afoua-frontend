import React, { Component } from 'react'
import Header1 from '../Header1'

class PrintCertificatDeVisiteMedical extends Component {

    constructor(props){
        super(props)
    }

    date= new Date();

    render() {

        const {namePatient, lastNamePatient, nameAgent, lieuDeNaissance, dateDeNaissance, lastNameAgent, justification}= this.props

         
        return (
            <div className="A4">
            <Header1 date={this.date} />
            <h2>CERTIFICAT DE VISITE MEDICALE</h2>
            <div>
                En exécution des règlements en vigueur, nous soussigné 
                <div className="inputAnimated" >
                    <input type="text" value={`${nameAgent} ${lastNameAgent}`} id='nameAgent'/>
                   
                    <label htmlFor='nameAgent'>nom de l'agent</label> 
                  
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
                    <input value={lieuDeNaissance} type="text" id='lieuNaissance'/>
                </div> le : 
                <div className="inputAnimated" >
                    <input value={ dateDeNaissance} type="text" id='dateNaissance'/>
                </div> <br/> <br/>
                <textarea value={justification} style={{fontSize:15}} cols="90" rows="5">
                
                </textarea>
                 <br/>

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
