import React, { Component } from 'react'
import Header1 from '../Header1'

class PrintCertificatDeVisiteEtContreVisiteMedicale extends Component {

    constructor(props){
        super(props)

        this.state={
            
        }
    }

    date= new Date();

    render() {

        const { namePatient, lastNamePatient, dateDeNaissance, lieuDeNaissance, idPatient, module, nameAgent, lastNameAgent, AgentNames, changeAgent2, agent2}= this.props

        
        const date = new Date()
        const naissance = dateDeNaissance !== '' ? new Date(dateDeNaissance) : ''

        return (
            <div className="A4">
            
            <Header1 date={date} />
            <div>
            <h3>CERTIFICAT DE VISITE MEDICALE</h3>

            En exécution des règlements en vigueur, nous soussigné 
            <div className="inputAnimated" >
                <input type="text" value={`${nameAgent} ${lastNameAgent}`} />
            </div> <br/>
            Certifions que le (la) nommé (e):
            <div className="inputAnimated" >
                <input type="text" value={`${namePatient} ${lastNamePatient}`} />
            </div> <br/>
            Né (e) à: 
            <div className="inputAnimated" >
                <input type="text" value={`${lieuDeNaissance}`} />
            </div> le :
            <div className="inputAnimated" >
                <input type="text" value={naissance !='' ? `${naissance.getDate()}/${naissance.getMonth()+1}/${naissance.getFullYear()}`: ''} />
            </div> <br/>

            N'est atteint (e) d'aucun signe de maladie contagieuse ou chronique contre indiquant son aptitude au travail <br/>
            <br/>
            En conséquence, le (la) susnommé (e) est apte <br/>

            <div className="right">
                Fait à Niamey, le  
                <div className="inputAnimated" >
                    <input type="text" value={`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}` }/>
                </div> <br/> <br/>
                Le Médecin: 
            </div>
            <hr/>


            <h3>CERTIFICAT DE CONTRE VISITE MEDICALE</h3>

            En exécution des règlements en vigueur, nous soussigné 
            <div className="inputAnimated" >
               <input type="text" value={agent2} />
            </div> <br/>
            Certifions que le (la) nommé (e):
            <div className="inputAnimated" >
                <input type="text" value={`${namePatient} ${lastNamePatient}`} />
            </div> <br/>
            Né (e) à: 
            <div className="inputAnimated" >
                <input type="text" value={`${lieuDeNaissance}`} />
            </div> le :
            <div className="inputAnimated" >
                <input type="text" value={naissance !='' ? `${naissance.getDate()}/${naissance.getMonth()+1}/${naissance.getFullYear()}`: ''} />
            </div> <br/>

            N'est atteint (e) d'aucun signe de maladie contagieuse ou chronique contre indiquant son aptitude au travail <br/>
            <br/>
            En conséquence, le (la) susnommé (e) est apte <br/>

            <div className="right">
                Fait à Niamey, le  
                <div className="inputAnimated" >
                    <input type="text" value={`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}` }/>
                </div> <br/> <br/>
                Le Médecin: 
            </div>

            </div>
        </div>
            )
    }
}

export default PrintCertificatDeVisiteEtContreVisiteMedicale
