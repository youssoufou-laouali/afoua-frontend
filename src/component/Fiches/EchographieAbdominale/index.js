import React, {useState, useEffect} from 'react'
import Header1 from '../Header1'
import {useSelector, useDispatch} from 'react-redux'
import './style.css'
import axios from 'axios'
import { loadingTrue, loadingFalse } from "../../../redux/LogIn/action";

const EchograhieAbdominale = ({idPatient, printEA, closeEA, namePatient, lastNamePatient, dateDeNaissance, data, handleChange }) => {

    const dispatch = useDispatch()

    //Agent
    const agent = useSelector(state => state.login)
    const nameAgent = agent.currentUser.name
    const lastNameAgent = agent.currentUser.lastName

    //Date
    const [date, setDate] = useState(new Date())

  

    //Submit
    const handleSubmit=()=>{
       
        dispatch(loadingTrue())
        axios.post('/echographieabdominale/add', {patient: idPatient, ...data})
        .then(res=> {
            console.log(res);
            dispatch(loadingFalse())
            closeEA()
            printEA()
        })
        .catch(err=> {
            dispatch(loadingFalse())
            console.log(err)
        })
    }

   
    
    return (
        <div className="A4 A4EA">
            <Header1 date={date} />
            <h2>ECHOGRAPHIE ABDOMINALE</h2>
            <div>
                Nom et prénom: 
                Soussigné, certifie avoir examiné ce jour <strong>{` ${namePatient} ${lastNamePatient}`} </strong> Age : <strong>{parseInt(date.getFullYear())-parseInt(dateDeNaissance)}</strong><br/><br/>
                Indications: 
                <div className="inputAnimated" >
                    <input type="text" value={data.indications} onChange={(e)=> handleChange(e)} id='indications'/>
                    <label htmlFor='indications'>indications</label> 
                </div> <br/>
                <strong>RESULTATS</strong><br/>
                <ul>
                    <li>
                        Foie: 
                        <ul>
                            <li>
                                Taille: <br/>
                                - Lobe droit mesure 
                                <div className="inputAnimated" >
                                    <input type="text" value={data.lobeDroit} onChange={(e)=> handleChange(e)} id='lobeDroit'/>
                                    <label htmlFor='lobeDroit'>Lobe droit</label> 
                                </div>mm en avant du rein droit <br/>
                                - Lobe gauche mesure 
                                <div className="inputAnimated" >
                                    <input type="text" value={data.lobeGauche} onChange={(e)=> handleChange(e)} id='lobeGauche'/>
                                    <label htmlFor='lobeGauche'>Lobe Gauche</label> 
                                </div>mm en avant de l'aorte <br/>
                                - <br/>
                                Flèche hépatique mesure <div className="inputAnimated" >
                                                            <input type="text" value={data.flecheHepatique} onChange={(e)=> handleChange(e)} id='flecheHepatique'/>
                                                            <label htmlFor='flecheHepatique'>Flèche hépatique</label> 
                                                        </div>
                            </li>
                            <li>
                                Echostructure: 
                                <div className="inputAnimated" >
                                    <input type="text" value={data.echostructure} onChange={(e)=> handleChange(e)} id='echostructure'/>
                                    <label htmlFor='echostructure'>Echostructure</label> 
                                </div>
                            </li>
                            <li>
                                Contours: 
                                <div className="inputAnimated" >
                                    <input type="text" value={data.contours} onChange={(e)=> handleChange(e)} id='contours'/>
                                    <label htmlFor='contours'>Contours</label> 
                                </div>
                            </li>
                            <li>
                                Autres: 
                                <div className="inputAnimated" >
                                    <input type="text" value={data.autres} onChange={(e)=> handleChange(e)} id='autres'/>
                                    <label htmlFor='echostructure'>Autres</label> 
                                </div>
                            </li>
                        </ul>
                        </li>

                        <li>
                            Tronc porte et veines hépatique:
                            <textarea value={data.tpvh} id='tpvh' style={{fontSize:15}} onChange={e=>handleChange(e)} cols="90" rows="2">
                
                            </textarea>
                        </li>
                        <li>
                            Vésicule biliaire:
                            <textarea value={data.vesiculeBiliaire} id='vesiculeBiliaire' style={{fontSize:15}} onChange={e=>handleChange(e)} cols="90" rows="2">
                
                            </textarea>
                        </li>
                        <li>
                            Pancréas : <br/>
                            <ul>
                                <li>Taille: 
                                    <div className="inputAnimated" >
                                        <input type="text" value={data.taillePancreas} onChange={(e)=> handleChange(e)} id='taillePancreas'/>
                                        <label htmlFor='echostructure'>taille</label> 
                                    </div>mm Echostructure:
                                    <div className="inputAnimated" >
                                        <input type="text" value={data.echostructurePancreas} onChange={(e)=> handleChange(e)} id='echostructurePancreas'/>
                                        <label htmlFor='echostructurePancreas'>Echostructure</label> 
                                    </div>
                                </li>
                                <li>
                                    Contours: 
                                    <div className="inputAnimated" >
                                        <input type="text" value={data.contoursPancreas} onChange={(e)=> handleChange(e)} id='contoursPancreas'/>
                                        <label htmlFor='contoursPancreas'>Contours </label> 
                                    </div>
                                </li>
                                <li>
                                    Autres: 
                                    <div className="inputAnimated" >
                                        <input type="text" value={data.autresPancreas} onChange={(e)=> handleChange(e)} id='autresPancreas'/>
                                        <label htmlFor='autresPancreas'>autres </label> 
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li>
                            Rate : <br/>
                            <ul>
                                <li>Taille: 
                                    <div className="inputAnimated" >
                                        <input type="text" value={data.tailleRate} onChange={(e)=> handleChange(e)} id='tailleRate'/>
                                        <label htmlFor='tailleRate'>taille</label> 
                                    </div>mm, Echostructure:
                                    <div className="inputAnimated" >
                                        <input type="text" value={data.echostructureRate} onChange={(e)=> handleChange(e)} id='echostructureRate'/>
                                        <label htmlFor='echostructureRate'>Echostructure</label> 
                                    </div>
                                </li>
                                <li>
                                    Contours: 
                                    <div className="inputAnimated" >
                                        <input type="text" value={data.contoursRate} onChange={(e)=> handleChange(e)} id='contoursRate'/>
                                        <label htmlFor='contoursRate'>Contours </label> 
                                    </div>
                                </li>
                                <li>
                                    Autres: 
                                    <div className="inputAnimated" >
                                        <input type="text" value={data.autresRate} onChange={(e)=> handleChange(e)} id='autresRate'/>
                                        <label htmlFor='autresRate'>autres </label> 
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li>
                            Reins: <br/>
                            - Droit: 
                            Taille: 
                                    <div className="inputAnimated" >
                                        <input type="text" value={data.tailleDroitReins} onChange={(e)=> handleChange(e)} id='tailleDroitReins'/>
                                        <label htmlFor='tailleDroitReins'>taille</label> 
                                    </div>mm, Echostructure:
                                    <div className="inputAnimated" >
                                        <input type="text" value={data.echostructureDroitReins} onChange={(e)=> handleChange(e)} id='echostructureDroitReins'/>
                                        <label htmlFor='echostructureDroitReins'>Echostructure</label> 
                                    </div> <br/> Cavités pyélocalicielles
                                    <div className="inputAnimated" >
                                        <input type="text" value={data.cavitePyelocalicielleDroit} onChange={(e)=> handleChange(e)} id='cavitePyelocalicielleDroit'/>
                                        <label htmlFor='echostructureDroitReins'>cavite pyélocalicielle droit</label> 
                                    </div> <br/> <br/>
                            - Gauche: 
                            Taille: 
                                    <div className="inputAnimated" >
                                        <input type="text" value={data.tailleGaucheReins} onChange={(e)=> handleChange(e)} id='tailleGaucheReins'/>
                                        <label htmlFor='tailleGaucheReins'>taille</label> 
                                    </div>mm, Echostructure:
                                    <div className="inputAnimated" >
                                        <input type="text" value={data.echostructureGaucheReins} onChange={(e)=> handleChange(e)} id='echostructureGaucheReins'/>
                                        <label htmlFor='echostructureGaucheReins'>Echostructure</label> 
                                    </div> <br/> Cavités pyélocalicielles
                                    <div className="inputAnimated" >
                                        <input type="text" value={data.cavitePyelocalicielleGauche} onChange={(e)=> handleChange(e)} id='cavitePyelocalicielleGauche'/>
                                        <label htmlFor='cavitePyelocalicielleGauche'>cavite pyélocalicielle droit</label> 
                                    </div> <br/>
                        </li>

                        <li>
                            Vessie: 
                            <ul>
                                <li>
                                    contours: 
                                    <div className="inputAnimated" >
                                        <input type="text" value={data.contoursVessie} onChange={(e)=> handleChange(e)} id='contoursVessie'/>
                                        <label htmlFor='contoursVessie'>Contours</label> 
                                    </div>
                                </li>
                                <li>
                                    contenu: 
                                    <div className="inputAnimated" >
                                        <input type="text" value={data.contenuVessie} onChange={(e)=> handleChange(e)} id='contenuVessie'/>
                                        <label htmlFor='contenuVessie'>contenu</label> 
                                    </div>
                                </li>
                                <li>
                                    parois: 
                                    <div className="inputAnimated" >
                                        <input type="text" value={data.paroisVessie} onChange={(e)=> handleChange(e)} id='paroisVessie'/>
                                        <label htmlFor='paroisVessie'>Parois</label> 
                                    </div> et mesure 
                                    <div className="inputAnimated" >
                                        <input type="text" value={data.mesureParoisVessie} onChange={(e)=> handleChange(e)} id='mesureParoisVessie'/>
                                        <label htmlFor='mesureParoisVessie'>mesure</label> 
                                    </div>mm
                                </li>
                            </ul>
                        </li>
                </ul>
                Conclusion: 
                <div className="inputAnimated">
                    <input type="text" value={data.conclusion} onChange={(e)=> handleChange(e)} id='conclusion'/>
                    
                    <label htmlFor='conclusion'>conclusion</label> 
                   
                    
                </div>
                
                <button className="submitA4" onClick={()=>handleSubmit()}>Envoyer</button>
 
                
            </div>
        </div>
    )
}

export default EchograhieAbdominale
