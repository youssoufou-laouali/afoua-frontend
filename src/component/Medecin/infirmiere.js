import React,{useState, useEffect, useRef} from 'react'
import axios from 'axios'
import { loadingTrue, loadingFalse } from "../../redux/LogIn/action";
import {useDispatch} from 'react-redux'
import ListMedecin from './ListMedecin'
import './style.css'
import Infirmiere from '../Fiches/Infirmiere';
import PrintInfirmiere from '../Fiches/Infirmiere/PrintInfirmiere'
import DossierMedical from '../Fiches/DossierMedical'
import PrintDossier from '../Fiches/DossierMedical/PrintDossier'
import Modal from '../Modal'
import {toast} from 'react-toastify'
import ReactToPrint from "react-to-print";
import {useSelector} from 'react-redux'
import {socket} from '../Header'
import { logOut } from '../../redux/LogIn/action'
import {useHistory} from 'react-router-dom'


const Medecin = () => {
    const [data, setData] = useState([])
    const [close, setClose] = useState(false)
    const [patientSelect, setPatientSelect] = useState({})
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
    }, [])


    useEffect(() => {
        if(!currentUser.isAuthenticated){
            history.push('/signin')
        }
    }, [currentUser, history])

    //patient
    const [updatePatient, setUpdatePatient] = useState(false)
    const [patient, setPatient] = useState({
        name:'', lastName: '',
        phone: 0, dateDeNaissance:'',
        lieuDeNaissance: '', adresse: '', id: ''
    })
    const updatingPatient=()=>{
        setUpdatePatient(!updatePatient)
    }

    const handleChange= (e)=>{
        e.target.id=='phone' ? setPatient({...patient, [e.target.id]: parseInt(e.target.value)}):
        setPatient({...patient, [e.target.id]: e.target.value})
        
    }

    const [DossierMedicals, setDossierMedical] = useState([])
    const loadDossierMedical= (id)=>{
        axios.post('/dossier', {id: id})
        .then(res=>{
            setDossierMedical(res.data)
            console.log(res.data);
        })
        .catch(errors=> console.log(errors))
    }

    const patchPatient= (e)=>{
        e.preventDefault()
        dispatch(loadingTrue())
        axios.post('/api/patient/update', patient)
            .then(res=>{
                dispatch(loadingFalse())

                toast("Le profil du patient est mis à jour", {
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
            })
            .catch(err=>{
                dispatch(loadingFalse())
                console.log(err);
            })
    }
    //Agent
    const agent = useSelector(state => state.login)
    const nameAgent = agent.currentUser.name
    const lastNameAgent = agent.currentUser.lastName

    const closing=()=>{
        setClose(!close)
    }
    //Infirmiere
    const refIF= useRef()
    const [closeIF, setCloseIF] = useState(false)
    const [IF, setPrintIF] = useState(false)
    const closingIF=()=>{
        setCloseIF(!closeIF)
    }
    const printIF=()=>{
        setPrintIF(!IF)
    } 
    const [dataIF, setDataIF] = useState({})
    const handleDataIF=(data)=>{
        setDataIF(data)
    }

    //Dossier Medical
    const refDM= useRef()
    const [closeDM, setCloseDM] = useState(false)
    const [DM, setPrintDM] = useState(false)
    const closingDM=()=>{
        setCloseDM(!closeDM)
    }
    const printDM=()=>{
        setPrintDM(!DM)
    } 
    const [dataDM, setDataDM] = useState({})
    const handleChangeDM=(e)=>{
        setDataDM({...dataDM, [e.target.id]: e.target.value})
    }
    const [ExamenDM, setExamenDM] = useState([])
    const handleExamenDM= (data)=>{
        setExamenDM(data)
    }

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


    const handlePatient=({idGeant, demande, patientName, patientLastName, adresse, patientPhone, patientId, module, dateDeNaissance, lieuDeNaissance})=>{
        setPatientSelect({idGeant, demande, patientName, patientLastName, adresse, patientPhone, patientId, module, dateDeNaissance, lieuDeNaissance})
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
        loadDossierMedical(patientId)
    }

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
                            />
                           )
                        )
                    }
                </div>
                <div>
                    { patientSelect.idGeant &&(
                    <div className="buttonAddContainer">
                        <div className="buttonAdd">+</div>
                        <ul>
                            <li onClick={()=>closingIF()}>Infirmiere</li>
                        </ul>
                    </div>)
                    }
                </div>
            </div>
            <div style={{textAlign: 'center', minWidth:'60vw'}}>

                    <div style={{width: '100%', height: '520px', overflow: 'scroll'}}>
                        {
                            DossierMedicals.length !== 0 && (
                                <div style={{backgroundColor: 'black'}}>
                                    <PrintDossier
                                        namePatient={patient.name}
                                        lastNamePatient= {patient.lastName}
                                        dateDeNaissance={patient.dateDeNaissance}
                                        data={DossierMedicals[0]}
                                        nameAgent={nameAgent}
                                        lastNameAgent={lastNameAgent}
                                        Examens={DossierMedicals[0].examensUlterieurs}
                                    />
                                </div>)
                            }
                    </div>


                {
                    closeIF &&(
                        <Modal close={closingIF}>
                            <Infirmiere 
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                idPatient={patient.id}
                                dateDeNaissance= {patient.dateDeNaissance}
                                closeIF={closingIF}
                                printIF={printIF}
                                handleData={handleDataIF}
                            />
                        </Modal>)
                }
                {
                    IF && (
                        <Modal close={printIF}>
                            <ReactToPrint
                                trigger={() => <button className="printBoutton">Imprimer</button>}
                                content={() => refIF.current}
                            />

                            <PrintInfirmiere
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                dateDeNaissance={patient.dateDeNaissance}
                                data={dataIF}
                                nameAgent={nameAgent}
                                lastNameAgent={lastNameAgent}
                                ref={refIF}
                            />
                        </Modal>
                    )
                }
            </div>
        </div>
    )
}

export default Medecin
