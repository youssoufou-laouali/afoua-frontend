import React from 'react'
import axios from 'axios'
import Header1 from '../Header1'

const BilletDeSortie = () => {

    const date= Date.now()

    const handleSubmit= (e)=>{

    }

    return (
        <div className="A4">
            <Header1 date={date} />
            <h2>BILLET DE SORTIE</h2>

            <div> Nom du malade: 
                <div className="inputAnimated">
                    <input type="text" />
                    <label>name</label>
                </div> <br/>
                Age: 
                <div className="inputAnimated">
                    <input type="text" />
                    <label>age</label>
                </div> <br/>
                Motif d'hospitalisation: 
                <div className="inputAnimated">
                    <input type="text" />
                    <label>motif d'hospitalisation</label>
                </div> <br/>

                Periode: du  
                <div className="inputAnimated">
                    <input type="text" />
                    <label>name</label>
                </div> au  <div className="inputAnimated">
                                <input type="text" />
                                <label>name</label>
                            </div> <br/>
                Durée d'hospitalisation:
                <div className="inputAnimated">
                    <input type="text" />
                    <label>name</label>
                </div> jours <br/> 

                Diagnostic Retenu: 
                <div className="inputAnimated">
                    <input type="text" />
                    <label>name</label>
                </div> <br/>

                Date de sortie: 
                <div className="inputAnimated">
                    <input type="text" />
                    <label>name</label>
                </div> <br/>

                <span>Ordonnance de sortie: </span> <br/>
                - 
                <div className="inputAnimated">
                    <input type="text" />
                    <label>name</label>
                </div> <br/>
                -
                <div className="inputAnimated">
                    <input type="text" />
                    <label>name</label>
                </div> <br/>
                -
                <div className="inputAnimated">
                    <input type="text" />
                    <label>name</label>
                </div> <br/>

                Visite retour: 
                <div className="inputAnimated">
                    <input type="text" />
                    <label>name</label>
                </div> <br/>

                <div>
                    <div>Le malade (ou son repondant) </div>
                    <div>Le médecin</div>
                </div>
            </div>
        </div>
    )
}

export default BilletDeSortie
