import React, { Component } from 'react'
import Header1 from '../Header1'

class PrintCertificatGrossesse extends Component {
    constructor(props){
        super(props)
    }

    date= new Date();

    render() {

        const {namePatient, lastNamePatient, nameAgent, lastNameAgent, data}= this.props

         
        return (
            <div className="A4">
            <Header1 date={this.date} />
            <h2>CERTIFICAT DE GROSSESSE</h2>
            <div>
                La Gynécologue-Obstétricien de la clinique Afoua. <br/><br/>
                Soussigné, certifie avoir examiné ce jour <strong> {` ${this.date.getDate()}/${this.date.getMonth()+1}/${this.date.getUTCFullYear()}`} </strong><br/><br/>
                La nommée: <strong>{` ${namePatient} ${lastNamePatient}`} </strong><br/><br/>
                A une Grossesse de 
                <div className="inputAnimated" >
                    <input type="number" value={data.nbreSemaine} id='nbreSemaine'/>                  
                </div> Semaines d'aménorrhé ( 

                <div className="inputAnimated">
                    <input type="number" value={data.nbreMois} id='nbreMois'/>
                                        
                </div> ) <br/><br/>

                L'accouchement est prévu le 
                <div className="inputAnimated">
                    <input type="date" value={data.datePrevu}  id='datePrevu'/>                   
                    
                </div> Sauf complication <br/>
                
                 
                 <br/>

                <div className="right">
                    Fait à Niamey, le  
                    <div className="inputAnimated" >
                        <strong>{this.date.getDate()}/{this.date.getMonth()+1}/{this.date.getFullYear()}</strong>
                       
                    </div> <br/> <br/>
                    Le Gynécologue: 
                    <br/><br/><strong>{nameAgent} {lastNameAgent}</strong>
                    
                </div>
                 
                
            </div>
        </div>
        )
    }
}

export default PrintCertificatGrossesse
