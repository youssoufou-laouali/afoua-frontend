import React, {useState, useEffect} from 'react'
import Header1 from '../Header1'
import {useSelector, useDispatch} from 'react-redux'
import './style.css'
import axios from 'axios'
import { loadingTrue, loadingFalse } from "../../../redux/LogIn/action";

const Infirmiere = ({idPatient, printIF, closeIF, namePatient, lastNamePatient, dateDeNaissance, handleData }) => {

    const dispatch = useDispatch()

    //Agent
    const agent = useSelector(state => state.login)
    const nameAgent = agent.currentUser.name
    const lastNameAgent = agent.currentUser.lastName

    //Date
    const [date, setDate] = useState(new Date())
    const initialAdd= {
        labbel:'', j1matin: false, j1midi: false, j1soir: false,
        j2matin: false, j2midi: false, j2soir: false,
        j3matin: false, j3midi: false, j3soir: false,
        j4matin: false, j4midi: false, j4soir: false,
        j5matin: false, j5midi: false, j5soir: false,
        j6matin: false, j6midi: false, j6soir: false,
    }
    const [add, setAdd] = useState(initialAdd)
    const [data, setData] = useState({
        sexe: '', poids: '', chambre: ''
    })
    const handleChange=(e)=>{
        setData({...data, [e.target.id]: e.target.value})
    }
  

    //Submit
    const handleSubmit=()=>{
       
        dispatch(loadingTrue())
        axios.post('/infirmiere/add', {patient: idPatient, ...data, traitement, ...T, examensComplementaires})
        .then(res=> {
            console.log(res);
            dispatch(loadingFalse())
            handleData(res.data)
            closeIF()
            printIF()
           
        })
        .catch(err=> {
            dispatch(loadingFalse())
            console.log(err)
        })
    }

    const handleChangeTraitement=(e)=>{
        if(e.target.id=='labbel'){
            setAdd({...add, [e.target.id]: e.target.value})
        }else{
            setAdd({...add, [e.target.id]: e.target.checked})
        }
        
    }
    const [traitement, setTraitement] = useState([])

    const handleAjout=()=>{
        setTraitement([...traitement, add])
        setAdd(initialAdd)
    }

    const handleDeleteAdd=(i)=>{
        if(window.confirm('Vous voulez supprimer définitivement cette information ?'))
        setTraitement(traitement.filter((el, index)=> i!==index))
    }

    const [T, setT] = useState({
        t42:0, t41:0, t40: 0, t39:0, t38:0, t37:0, t36:0, t35:0,
    })
    const AddTemp=(e)=>{
        
        const id= e.target.id
        setT({...T, [id]: (T[id] + 1) })
    }
    const DelTemp=(e)=>{
        const id= e.target.id
        if(T[id]==0){
            return
        }
        setT({...T, [id]: (T[id] - 1) })
    }

    const retX=(i)=>{
        let results=[]
        for(let a=0; a<i; a++){
            results.push(i)
        }
        return results
    }
   
    const [examen, setExamen] = useState('')
    const [examensComplementaires, setExamensComplementaires] = useState([])
    const valueExamen=(e)=>{
        setExamen(e.target.value)
    }
    const addValueExamen=()=>{
        setExamensComplementaires([...examensComplementaires, examen])
    }
    const RemoveValueExamen=(i)=>{
      setExamensComplementaires(examensComplementaires.filter((el, index)=> index !=i))
    }

    const modify=(field, index) => {
        let traitementCopy = [...traitement];
        traitementCopy[index][field]= !traitementCopy[index][field];
        setTraitement(traitementCopy);
    }
    const modifyTemp=(temp, jour) => {
        
    }
    
    return (
        <div className="A4 A4Infirmiere">
            <Header1 date={date} />
            <div>
                Nom et Prénom: <strong>{` ${namePatient} ${lastNamePatient}`} </strong> 
                age: <strong>{date.getFullYear()-parseInt(dateDeNaissance)}</strong>
                Sexe:
                <div className="inputAnimated" >
                 <input type="text" value={data.sexe} onChange={(e)=> handleChange(e)} id='sexe'/>
                 </div> <br/>
                Poid:
                <div className="inputAnimated" >
                 <input type="text" value={data.poids} onChange={(e)=> handleChange(e)} id='poids'/>
                 </div> Kg
                Chambre N°
                <div className="inputAnimated" >
                 <input type="text" value={data.chambre} onChange={(e)=> handleChange(e)} id='chambre'/>
                 </div>
                <br/>
                
                    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', backgroundColor: 'rgba(0,0,0,0.1)', padding:10}}>
                        <div className="inputAnimated" >
                            
                            <input type="text" value={add.labbel} onChange={(e)=> handleChangeTraitement(e)} id='labbel'/>
                            <label>Traitement</label>
                        </div>
                        <div>
                            <strong>J1: </strong>
                            <label>M </label>
                            <input type="checkbox" checked={add.j1matin} onChange={(e)=> handleChangeTraitement(e)} id='j1matin' />
                            <label>M </label>
                            <input type="checkbox" checked={add.j1midi} onChange={(e)=> handleChangeTraitement(e)} id='j1midi' />
                            <label>S </label>
                            <input type="checkbox" checked={add.j1soir} onChange={(e)=> handleChangeTraitement(e)} id='j1soir' />
                        </div>
                        <div>
                            <strong>J2: </strong>
                            <label>M </label>
                            <input type="checkbox" checked={add.j2matin} onChange={(e)=> handleChangeTraitement(e)} id='j2matin' />
                            <label>M </label>
                            <input type="checkbox" checked={add.j2midi} onChange={(e)=> handleChangeTraitement(e)} id='j2midi' />
                            <label>S </label>
                            <input type="checkbox" checked={add.j2soir} onChange={(e)=> handleChangeTraitement(e)} id='j2soir' />
                        </div>
                        <div>
                            <strong>J3: </strong>
                            <label>M </label>
                            <input type="checkbox" checked={add.j3matin} onChange={(e)=> handleChangeTraitement(e)} id='j3matin' />
                            <label>M </label>
                            <input type="checkbox" checked={add.j3midi} onChange={(e)=> handleChangeTraitement(e)} id='j3midi' />
                            <label>S </label>
                            <input type="checkbox" checked={add.j3soir} onChange={(e)=> handleChangeTraitement(e)} id='j3soir' />
                        </div>
                        <div>
                            <strong>J4: </strong>
                            <label>M </label>
                            <input type="checkbox" checked={add.j4matin} onChange={(e)=> handleChangeTraitement(e)} id='j4matin' />
                            <label>M </label>
                            <input type="checkbox" checked={add.j4midi} onChange={(e)=> handleChangeTraitement(e)} id='j4midi' />
                            <label>S </label>
                            <input type="checkbox" checked={add.j4soir} onChange={(e)=> handleChangeTraitement(e)} id='j4soir' />
                        </div>
                        <div>
                            <strong>J5: </strong>
                            <label>M </label>
                            <input type="checkbox" checked={add.j5matin} onChange={(e)=> handleChangeTraitement(e)} id='j5matin' />
                            <label>M </label>
                            <input type="checkbox" checked={add.j5midi} onChange={(e)=> handleChangeTraitement(e)} id='j5midi' />
                            <label>S </label>
                            <input type="checkbox" checked={add.j5soir} onChange={(e)=> handleChangeTraitement(e)} id='j5soir' />
                        </div>
                        <div>
                            <strong>J6: </strong>
                            <label>M </label>
                            <input type="checkbox" checked={add.j6matin} onChange={(e)=> handleChangeTraitement(e)} id='j6matin' />
                            <label>M </label>
                            <input type="checkbox" checked={add.j6midi} onChange={(e)=> handleChangeTraitement(e)} id='j6midi' />
                            <label>S </label>
                            <input type="checkbox" checked={add.j6soir} onChange={(e)=> handleChangeTraitement(e)} id='j6soir' />
                        </div>
                        <button style={{backgroundColor: 'gray', cursor: 'pointer', borderRadius: 5, padding: '5px 10px'}} onClick={()=>handleAjout()}>Ajouter</button>

                    </div>
                

                <table style={{borderSpacing: 0, padding: 5, textAlign: 'center'}}>
                    <tr>
                        <th style={{width: 250}}>
                            TRAITEMENT
                        </th>
                        <th>
                            J1 <br/>
                            <tr>
                                <td>M</td>
                                <td>M</td>
                                <td>S</td>
                            </tr>
                        </th>
                        <th>
                            J2 <br/>
                            <tr>
                                <td>M</td>
                                <td>M</td>
                                <td>S</td>
                            </tr>
                        </th>
                        <th>
                            J3 
                            <tr>
                                <td>M</td>
                                <td>M</td>
                                <td>S</td>
                            </tr>
                        </th>
                        <th>
                            J4 <br/>
                            <tr>
                                <td>M</td>
                                <td>M</td>
                                <td>S</td>
                            </tr>
                        </th>
                        <th>
                            J5 <br/>
                            <tr>
                                <td>M</td>
                                <td>M</td>
                                <td>S</td>
                            </tr>
                        </th>
                        <th>
                            J6 <br/>
                            <tr>
                                <td>M</td>
                                <td>M</td>
                                <td>S</td>
                            </tr>
                        </th>
                    </tr>
                    {
                        traitement.map((el, index)=>{
                            console.log(el, index);
                            return (
                                <tr key={index}>
                                    <td>{el.labbel}</td>
                                    <td>
                                        <tr>
                                            <td>
                                            <input type="checkbox" onChange={(e)=> modify('j1matin', index)} checked={el.j1matin} />
                                            </td>
                                            <td>
                                            <input type="checkbox" onChange={(e)=> modify('j1midi', index)} checked={el.j1midi} />
                                            </td>
                                            <td>
                                            <input type="checkbox" onChange={(e)=> modify('j1soir', index)} checked={el.j1soir} />
                                            </td>
                                            
                                        </tr>
                                    </td>
                                    <td>
                                        <tr>
                                            <td>
                                            <input type="checkbox" onChange={(e)=> modify('j2matin', index)} checked={el.j2matin} />
                                            </td>
                                            <td>
                                            <input type="checkbox" onChange={(e)=> modify('j2midi', index)} checked={el.j2midi} />
                                            </td>
                                            <td>
                                            <input type="checkbox" onChange={(e)=> modify('j2soir', index)} checked={el.j2soir} />
                                            </td>
                                            
                                        </tr>
                                    </td>
                                    <td>
                                        <tr>
                                            <td>
                                            <input type="checkbox" onChange={(e)=> modify('j3matin', index)} checked={el.j3matin} />
                                            </td>
                                            <td>
                                            <input type="checkbox"  onChange={(e)=> modify('j3midi', index)} checked={el.j3midi} />
                                            </td>
                                            <td>
                                            <input type="checkbox" onChange={(e)=> modify('j3soir', index)} checked={el.j3soir} />
                                            </td>
                                            
                                        </tr>
                                    </td>
                                    <td>
                                        <tr>
                                            <td>
                                            <input type="checkbox" onChange={(e)=> modify('j4matin', index)} checked={el.j4matin} />
                                            </td>
                                            <td>
                                            <input type="checkbox"  onChange={(e)=> modify('j4midi', index)} checked={el.j4midi} />
                                            </td>
                                            <td>
                                            <input type="checkbox" onChange={(e)=> modify('j4soir', index)} checked={el.j4soir} />
                                            </td>
                                            
                                        </tr>
                                    </td>
                                    <td>
                                        <tr>
                                            <td>
                                            <input type="checkbox" onChange={(e)=> modify('j5matin', index)} checked={el.j5matin} />
                                            </td>
                                            <td>
                                            <input type="checkbox"  onChange={(e)=> modify('j5midi', index)} checked={el.j5midi} />
                                            </td>
                                            <td>
                                            <input type="checkbox" onChange={(e)=> modify('j5soir', index)} checked={el.j5soir} />
                                            </td>
                                            
                                        </tr>
                                    </td>
                                    <td>
                                        <tr>
                                            <td>
                                            <input type="checkbox" onChange={(e)=> modify('j6matin', index)} checked={el.j6matin} />
                                            </td>
                                            <td>
                                            <input type="checkbox"  onChange={(e)=> modify('j6midi', index)} checked={el.j6midi} />
                                            </td>
                                            <td>
                                            <input type="checkbox" onChange={(e)=> modify('j6soir', index)} checked={el.j6soir} />
                                            </td>
                                            
                                        </tr>
                                    </td>
                                    <button style={{cursor: 'pointer', backgroundColor: 'rgb(200,0,0)', border: 'none'}} onClick={()=>handleDeleteAdd(index)}>X</button>
                                </tr>
                            )
                        })
                    }
                    <tr style={{height: 20}}> 
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    </tr>
                    <tr>
                        <th>
                            <td>FR</td>
                            <td>Ur cc</td>
                            <td>Pouls</td>
                            <td>TA</td>
                            <td>T°</td>
                        </th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <td>
                            <td></td>
                            <td>3500</td>
                            <td>180</td>
                            <td></td>
                            <td>42°</td>
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t42', 'j1')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t42', 'j2')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t42', 'j3')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t42', 'j4')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t42', 'j5')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t42', 'j6')} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <td></td>
                            <td>3000</td>
                            <td>160</td>
                            <td></td>
                            <td>41°</td>
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t41', 'j1')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t41', 'j2')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t41', 'j3')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t41', 'j4')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t41', 'j5')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t41', 'j6')} />
                        </td>
                        
                    </tr>
                    <tr>
                        <td>
                            <td>50</td>
                            <td>2500</td>
                            <td>140</td>
                            <td>25</td>
                            <td>40°</td>
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t40', 'j1')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t40', 'j2')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t40', 'j3')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t40', 'j4')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t40', 'j5')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t40', 'j6')} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <td>40</td>
                            <td>2000</td>
                            <td>120</td>
                            <td>20</td>
                            <td>39°</td>
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t39', 'j1')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t39', 'j2')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t39', 'j3')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t39', 'j4')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t39', 'j5')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t39', 'j6')} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <td>30</td>
                            <td>1500</td>
                            <td>100</td>
                            <td>15</td>
                            <td>38°</td>
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t38', 'j1')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t38', 'j2')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t38', 'j3')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t38', 'j4')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t38', 'j5')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t38', 'j6')} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <td>20</td>
                            <td>1000</td>
                            <td>80</td>
                            <td>10</td>
                            <td>37°</td>
                        </td>
                        {retX(T.t37).map((el, index)=> <td key={index}>X</td>)}
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t37', 'j1')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t37', 'j2')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t37', 'j3')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t37', 'j4')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t37', 'j5')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t37', 'j6')} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <td>10</td>
                            <td>500</td>
                            <td>60</td>
                            <td>5</td>
                            <td>36°</td>
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t36', 'j1')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t36', 'j2')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t36', 'j3')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t36', 'j4')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t36', 'j5')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t36', 'j6')} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <td></td>
                            <td>0</td>
                            <td>40</td>
                            <td></td>
                            <td>35°</td>
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t35', 'j1')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t35', 'j2')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t35', 'j3')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t35', 'j4')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t35', 'j5')} />
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=> modifyTemp('t35', 'j6')} />
                        </td>
                    </tr>
                    <tr>
                        <th rowSpan={6}>EXAMENS COMPLEMENTAIRES</th>
                        <th colSpan={6}>
                            <tr>
                                <div className="inputAnimated" >
                                    <input type="text" value={examen} onChange={(e)=> valueExamen(e)} id='examen'/>
                                    <button onClick={()=> addValueExamen()}>+</button>
                                    
                                </div>
                            </tr>
                            {
                                examensComplementaires.map((el, index)=>{
                                    return (
                                      <>  <tr key={index}>{el} <button onClick={()=> RemoveValueExamen(index)}>-</button> </tr></>
                                    )
                                })
                            }
                        </th>
                    </tr>
                </table>

                <button className="submitA4" onClick={()=>handleSubmit()}>Envoyer</button>

            </div>  
        </div>
    )
}

export default Infirmiere
