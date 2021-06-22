import React, { Component } from 'react'
import Header1 from '../Header1';

export class PrintSoinsUrgence extends Component {
    constructor(props) {
        super(props)
    
    }
    
    date= new Date();
    render() {

        const { nameAgent, lastNameAgent ,namePatient, lastNamePatient, dateDeNaissance, products}= this.props

        return (
            <div className="A4">
                <Header1 date={this.date} />
                <br/>
                <br/>
                <div>
                    <div>
                        NOM: {namePatient}
                    </div> <br/>
                    <div>
                        PRENOM: {lastNamePatient}
                    </div> <br/>
                    <div>
                        AGE: {parseInt(this.date.getFullYear())-parseInt(dateDeNaissance)}
                    </div>
                </div>
                    
                <h2>SOINS EN URGENCE</h2>

                <div>
                    <div>
                        <table style={{margin: 'auto'}} className="tSEU">
                            <tr>
                                <th style={{width: 400}}>DESIGNATION DES PRODUITS</th>
                                <th>QUANTITE</th>
                                
                            </tr>
                            {
                                products.map((el, index)=> {
                                
                                    return (
                                        <tr key={index} id={index}>
                                            <td>
                                                {
                                                    el.label
                                                }
                                            </td>
                                            <td>
                                                {
                                                    el.nbr
                                                }
                                            </td>
                                            
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
                    <br/> <br/> <br/> <br/>
                  <strong>  Médecin: <br/> <br/>{nameAgent} {lastNameAgent}</strong>
                </div>
            </div>
        )
    }
}

export default PrintSoinsUrgence
