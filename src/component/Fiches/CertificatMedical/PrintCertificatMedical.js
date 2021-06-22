import React, { Component } from 'react'
import Header1 from '../Header1';

export class PrintCertificatMedical extends Component {
    constructor(props) {
        super(props)
    
    }
    
    date= new Date();
    render() {

        const {constat , nameAgent, lastNameAgent ,namePatient, lastNamePatient,}= this.props

        return (
            <div className="A4">
            <Header1 date={this.date} />
            <h2>CERTIFICAT MEDICALE</h2>
            <div>
                Je soussigné 
                <div className="inputAnimated" >
                    <input type="text" value={`${nameAgent} ${lastNameAgent}`}/>                  
                </div> reconnait avoir consulté  <br/> <br/>
                Ce jour {this.date.getDate()}/{this.date.getMonth()+1}/{this.date.getFullYear()}, 
                le (la) patient(e): 
                <div className="inputAnimated">
                    <input type="text" value={`${namePatient} ${lastNamePatient}`} id='namePatient'/>                   
                    
                </div>  
                 <br/> <br/>
                Et constaté <strong>{constat}</strong>
                
                 <br/> <br/>

                 En foi de quoi, le present certificat lui est delivré pour servir et valoir ce que de droit

                <div className="right">
                    <br/> <br/>
                    Le Médecin: <br/> <br/> <br/>
                    {nameAgent} {lastNameAgent}
                    
                </div> 
                
            </div>
        </div>
        )
    }
}

export default PrintCertificatMedical
