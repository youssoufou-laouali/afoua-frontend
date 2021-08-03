import React,{useState, useEffect, useRef} from 'react'
import axios from 'axios'
import { loadingTrue, loadingFalse } from "../../redux/LogIn/action";
import {useDispatch} from 'react-redux'
import ListMedecin from './ListMedecin'
import './style.css'
import BilletinExamen from '../Fiches/BilletinExamen';
import {toast} from 'react-toastify'
import ReactToPrint from "react-to-print";
import {useSelector} from 'react-redux'
import {socket} from '../Header'
import { logOut } from '../../redux/LogIn/action'
import {useHistory} from 'react-router-dom'


const Medecin = () => {
    const [data, setData] = useState([])
    const [close, setClose] = useState(false)
    const [patientSelect, setPatientSelect] = useState({demande: []})
    const dispatch = useDispatch()
    const history = useHistory()
    const currentUser = useSelector(state => state.login)
    const handleLogOut= ()=>{
        localStorage.removeItem('jwtToken')
        dispatch(logOut())
    }
    useEffect(() => {
        if(currentUser.currentUser.exp*1000 <= Date.now()){
            handleLogOut()
        }
        if(currentUser.currentUser.post != 'laboratoire' && currentUser.currentUser.post != 'superAdmin'){
            history.push('/')
        }
    }, [])


    useEffect(() => {
        if(!currentUser.isAuthenticated){
            history.push('/signin')
        }
    }, [currentUser, history])

    const [Examen, setExamen] = useState([])
    const loadExamen= (id)=>{
        axios.post('/bulletinexamen', {id})
        .then(res=>{
            setExamen(res.data)
        })
        .catch(errors=> console.log(errors))
    }

    const skipToLabo= async ()=> {
        axios.post('api/accueil/infirmiere', {id: patientSelect.accueil, post:'laboratoire'})
        .then(res=>{
            setExamen([])
            getGeant()
        })
        .catch(errors=> console.log(errors))
    }
    //Agent
    const agent = useSelector(state => state.login)
    const nameAgent = agent.currentUser.name
    const lastNameAgent = agent.currentUser.lastName

    //filtrer les accées des medecins
    const getGeant=()=>{
        axios.get('/api/geant')
        .then(res=>{
            let y = res.data.accueil.filter(el=> el.geant.post==agent.currentUser.post || agent.currentUser.post=='superAdmin')
            setData(y);
            console.log(res.data.accueil);
        })
        .catch(err=>{
            console.log(err.response);
        })
    }

    useEffect(() => {
        getGeant()
    }, [])

    const [AgentNames, setAgentNames] = useState([])
    useEffect(() => {
       axios.get('/api/agent')
       .then(agents=>{
            let agentnames = agents.data.agent.map(el=> {
              return  {id: el._id, name: el.name + ' ' + el.lastName}
            })
            setAgentNames(agentnames)
       })
       .catch(err=> console.log(err))
    }, [])

    useEffect(() => {
        socket.on('murgeant', data=>{
            getGeant()
        })
    }, [])

    const searchFiche=()=>{
        axios.post('/bulletinexamen', {id: patientSelect.patientId})
        .then(response=> {
            console.log(response);
        })
        .catch(err=> {
            console.log(err);
        })
    }

    useEffect(() => {
        setProductsExam(patientSelect.demande);
        searchFiche()
    }, [patientSelect])

    const [updatePatient, setUpdatePatient] = useState(false)
    const [patient, setPatient] = useState({
        name:'', lastName: '',
        phone: 0, dateDeNaissance:'',
        lieuDeNaissance: '', adresse: '', id: ''
    })
    const updatingPatient=()=>{
        setUpdatePatient(!updatePatient)
    }

    const handlePatient=({idGeant, demande, accueil, patientName, patientLastName, adresse, patientPhone, patientId, module, dateDeNaissance, lieuDeNaissance})=>{
        setPatientSelect({idGeant, demande, accueil, patientName, patientLastName, adresse, patientPhone, patientId, module, dateDeNaissance, lieuDeNaissance})
        const date= new Date(dateDeNaissance)
        let j = date.getDate()
        let m= date.getMonth()+1
        const a= date.getFullYear()
        
        j= j<10 ? '0'+j : j+''
        m= m<10 ? '0'+m : m+''
        const naissanceDate =a + '-'+m+'-'+j;
        setPatient({name: patientName, lastName: patientLastName, id: patientId, phone: patientPhone, dateDeNaissance: naissanceDate , lieuDeNaissance, adresse})
        toast(`${patientName} ${patientLastName} est seletionné`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            pauseOnHover: true,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            type: 'success'
            })
        updatingPatient()
        loadExamen(patientId)
    }

    const [productsExam, setProductsExam] = useState(patientSelect.demande)
    const handleProductsExam=(e)=>{
        console.log(e);
        const tab = productsExam.map((el, index)=> {
           return (index == e.index) ? {...el, response: e.response} : el
        })
        setProductsExam(tab)
        console.log(tab);
    }
    /*
    const handleDeleteExam= (i)=>{
        let a = productsExam.filter((el, index)=> index !==i )
        setProductsExam(a)
    }*/

    return (
        <div style={{display: 'flex'}}>
            <div>
                <div className="listMedecinContainer">
                    {
                        data !==[] && (
                            data.map(el=>
                            <ListMedecin 
                                handlePatient={handlePatient}
                                patientName={el.geant.patient.name}
                                patientLastName={el.geant.patient.lastName}
                                patientPhone={el.geant.patient.phone}
                                patientId={el.geant.patient._id}
                                demande={el.geant.demande}
                                post={el.geant.post}
                                idGeant={el._id}
                                adresse={el.geant.patient.adresse? el.geant.patient.adresse : '' }
                                module={el.geant.module}
                                dateDeNaissance={el.geant.patient.dateDeNaissance ? el.geant.patient.dateDeNaissance : ''}
                                lieuDeNaissance={el.geant.patient.lieuDeNaissance ? el.geant.patient.lieuDeNaissance : ''}
                                accueil={el.geant._id}
                            />
                           )
                        )
                    }
                </div>
            </div>
            <div style={{textAlign: 'center', minWidth:'60vw'}}>
                    <h3>{patient.name + ' ' + patient.lastName}</h3>
                        <h4>Bulletin d'Examen</h4>
                    <div>
                        {
                            (patientSelect.demande.length !== 0) && (
                                <div style={{backgroundColor: 'black'}}>
                                    <BilletinExamen
                                        namePatient={patient.name}
                                        lastNamePatient= {patient.lastName}
                                        dateDeNaissance={patient.dateDeNaissance}
                                        idPatient={patient.id}
                                        productsExam={productsExam}
                                        nameAgent={nameAgent}
                                        lastNameAgent={lastNameAgent}
                                        handleProductsExam={handleProductsExam}
                                    />
                                </div>)
                            }
                    </div>
                    {
                        Examen.length > 0 && (
                        <div className="envoyerBTN" onClick={()=> skipToLabo()}>
                            <h5>Envoyer au Laboratoire</h5>
                        </div>)
                    }
            </div>
        </div>
    )
}

export default Medecin
