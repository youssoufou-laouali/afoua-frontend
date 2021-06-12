import React, { Component } from 'react'

import './style.css'

class Recu extends Component {

    constructor(props){
        super(props)
    }

     
    date= new Date();

    render() {
        const { product, montantTotal, patient, agent } = this.props
                 console.log(agent);
        return (
            <div className="A4 A4M">
            
                <div>
                    <h2>CLINIQUE MEDICALE AFOUA</h2>
                    Médecine Générale-Analyses Médicales <br/>
                    Autres Consultations Specialisées <br/>
                    Compte SONIBANK N° 0025110063931/88 <br/>
                    NIF 1333 * B.P.: 11454 * Tél: 20 75 34 39 <br/>
                    Niamey-République du NIGER
                </div>
                <div className="flex m">
                    <div className="bg-grey">
                    <strong>TIERS-PAYEUR </strong><span>{patient.assurencePriseEnCharge ? patient.assurencePriseEnCharge + ' ' + patient.pourcentagePriseEnCharge + '%' : patient.name +' '+ patient.lastName}</span>
                    </div>
                    <div>
                    <strong>Date:</strong> {this.date.getDate()+'/'+ (parseInt(this.date.getMonth())+1) +'/' +this.date.getFullYear()}
                    </div>
                    <div>
                    <strong>HEURE:</strong> {this.date.getHours()+ ':' + this.date.getMinutes() + ':' + this.date.getSeconds()}
                    </div>
                </div>

                <div className="flex">
                    <div className="bg-grey">
                        <strong> Nom Patient</strong> <span>{patient.name + ' ' + patient.lastName}</span>
                    </div>
                    <div>
                        <div><strong>N° PC:</strong> {patient.numPC && patient.numPC} </div>
                        <div><strong>POLICE: </strong>{patient.police && patient.police} </div>
                    </div>
                    <div>
                    <strong>Docteur: </strong>{agent.name + ' '+ agent.lastName}
                    </div>
                </div>

                <div>
                    <table style={{margin:'50px 0'}}>
                        <tr>
                            <th className="bg-grey p">Acte Médical</th>
                            <th className="bg-grey p">Tarif</th>
                            <th className="bg-grey p">Nbr</th>
                            <th className="bg-grey p">TxPC</th>
                            <th className="bg-grey p">Montant Net</th>
                        </tr>
                        <tr >
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        
                        {
                            product.map(el=>{
                                return (
                                    <tr key={el.acteMedicale}>
                                        <td>{el.acteMedicale}</td>
                                        <td style={{textAlign: 'center'}}>{el.tarif}</td>
                                        <td style={{textAlign: 'center'}}>{el.nbr}</td>
                                        <td style={{textAlign: 'center'}}>{el.txpc}%</td>
                                        <td style={{textAlign: 'center'}}>{el.montant}</td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
                <div className="m ">
                    CAISSIERE: {}
                    <div style={{display: 'flex', justifyContent:'flex-end'}}>
                        <div>
                            TOTAL PAYE: {montantTotal}
                        </div>
                    </div>

                    <div>
                       <h3> BONNE GUERISON</h3>
                    </div>

                    <div style={{fontSize: 11, fontWeight: 'bold'}}>
                        VALIDITE DU RECU: 7 JRS <br/>
                        NB: SAUF ECHO
                    </div>
                </div>
     
            </div>
        )
    }
}

export default Recu
