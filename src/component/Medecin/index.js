import React,{useState, useEffect, useRef} from 'react'
import axios from 'axios'
import { loadingTrue, loadingFalse } from "../../redux/LogIn/action";
import {useDispatch} from 'react-redux'
import ListMedecin from './ListMedecin'
import './style.css'
import CerificatDeVisiteMedicale from '../Fiches/CerificatDeVisiteMedicale'
import PrintCertificatDeVisiteMedical from '../Fiches/CerificatDeVisiteMedicale/PrintCertificatDeVisiteMedical'
import CertificatDeVisiteEtContreVisiteMedicale from '../Fiches/CertificatDeVisiteEtContreVisiteMedicale'
import PrintCertificatDeVisiteEtContreVisiteMedicale from '../Fiches/CertificatDeVisiteEtContreVisiteMedicale/PrintCertificatDeVisiteEtContreVisiteMedicale'
import Decharge from '../Fiches/Decharge'
import PrintDecharge from '../Fiches/Decharge/PrintDecharge'
import SoinsUrgence from '../Fiches/SoinsUrgence'
import PrintSointUrgence from '../Fiches/SoinsUrgence/PrintSoinsUrgence'
import CertificatMedical from '../Fiches/CertificatMedical'
import PrintCertificatMedical from '../Fiches/CertificatMedical/PrintCertificatMedical';
import CompteRenduHospitalisation from '../Fiches/CompteRenduHospitalisation';
import PrintCompteRenduHospitalisation from '../Fiches/CompteRenduHospitalisation/PrintCompteRenduHospitalisation';
import CertificatGrossesse from '../Fiches/CertificatDeGrossesse'
import PrintCertificatGrossesse from '../Fiches/CertificatDeGrossesse/PrintCertificatGrossesse';
import CertificatAccouchement from '../Fiches/CertificatAccouchement'
import PrintCertificatAccouchement from '../Fiches/CertificatAccouchement/PrintCertificatAccouchement';
import AvisHospitalisation from '../Fiches/AvisHospitalisation'
import PrintAvisHospitalisation from '../Fiches/AvisHospitalisation/PrintAvisHospitalisation'
import CompteRenduAccouchement from '../Fiches/CompteRenduAccouchement';
import PrintCompteRenduAccouchement from '../Fiches/CompteRenduAccouchement/PrintCompteRenduAccouchement';
import BilletDeSortie from '../Fiches/BilletDeSortie';
import PrintBilletDeSortie from '../Fiches/BilletDeSortie/PrintBilletDeSortie';
import Infirmiere from '../Fiches/Infirmiere';
import PrintInfirmiere from '../Fiches/Infirmiere/PrintInfirmiere'
import DossierMedical from '../Fiches/DossierMedical'
import PrintDossier from '../Fiches/DossierMedical/PrintDossier'
import ConsultationPediatrique from '../Fiches/Consultations/Pediatrique';
import PrintPediatrique from '../Fiches/Consultations/PrintPediatrique';
import ConsultationGenerale from '../Fiches/Consultations/General'
import PrintGenerale from '../Fiches/Consultations/PrintGenerale'
import Imagerie from '../Fiches/Consultations/Imagerie'
import PrintImagerie from '../Fiches/Consultations/PrintImagerie'
import BilletinExamen from '../Fiches/BilletinExamen'
import PrintBilletinExamen from '../Fiches/BilletinExamen/PrintBilletinExamen'
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
    const [Examlterieurs, setExamlterieurs] = useState([])
    const loadDossierMedical= (id)=>{
        axios.post('/dossier', {id: id})
        .then(res=>{
            let responses= []
            setDossierMedical(res.data)
            console.log(res.data);
            res.data.map(el=> {
                el.examensUlterieurs.map(element=>{
                    responses.push(element)
                })
            })
            setExamlterieurs(responses)
        })
        .catch(errors=> console.log(errors))
    }

    const skipToInfirmiere= async ()=> {
        axios.post('api/accueil/infirmiere', {id: patientSelect.accueil, post:'infirmiere'})
        .then(res=>{
            getGeant()
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
    //Certificat de visite Medical
    const [printCertificatDeVisiteMedicale, setPrintCertificatDeVisiteMedicale] = useState(false)
    const justificationCVM=(a)=>{
        setJustification(a)
    }
    const [justification, setJustification] = useState(`N'est atteint (e) d'aucun signe de maladie contagieuse ou chronique contre indiquant son aptitude au travail. 
En conséquence, le (la) susnommé (e) est apte`)
    const refCertificatDeVisiteMedicale = useRef()

    const print=()=>{
        setPrintCertificatDeVisiteMedicale(!printCertificatDeVisiteMedicale)
    }

    //Certificat de Visite et contre visite médical
    const [agent2, setAgent2] = useState('')
    const changeAgent2=(id)=>{
        setAgent2(id)
    }
    const [closeCVCVM, setCloseCVCVM] = useState(false)
    const [CVCM, setPrintCVCM] = useState(false)
    const refCertificatDeVisiteContreVisiteMedicale = useRef()
    const closingCVCVM=()=>{
        setCloseCVCVM(!closeCVCVM)
    }

    const printCVCM= ()=>{
        setPrintCVCM(!CVCM)
    }

    //Decharge
    const [closeDecharge, setCloseDecharge] = useState(false)
    const [decharge, setPrintDecharge] = useState(false)
    const closingDecharge=()=>{
        setCloseDecharge(!closeDecharge)
    }
    const printDecharge =()=>{
        setPrintDecharge(!decharge)
    }
    const [responsable, setResponsable] = useState('')
    const handleChangeResponsableDecharge=(e)=>{
        setResponsable(e.target.value)
    }
    const [typeResponsable, setTypeResponsable] = useState({
        malade: false, parent: false, accompagnant: false
        })
    const handleChangeTypeResponsableDecharge=(e)=>{
        setTypeResponsable({malade: false, parent: false, accompagnant: false, [e.target.id]: e.target.checked})
    }
    const refDecharge= useRef()

    //Certificat médical
    const refCM= useRef()
    const [closeCM, setCloseCM] = useState(false)
    const [certificatMedical, setPrintCertificatMedical] = useState(false)
    const closingCM= ()=>{
        setCloseCM(!closeCM)
    }
    const printCM=()=>{
        setPrintCertificatMedical(!certificatMedical)
    }

    const [constat, setConstat] = useState('')
    const handleChangeConstat=(e)=>{
        setConstat(e.target.value)
    }
    //Soins en urgence
    const refSEU= useRef()
    const [closeSEU, setCloseSEU] = useState(false)
    const [seu, setPrintSEU] = useState(false)
    const closingSEU=()=>{
        setCloseSEU(!closeSEU)
    }
    const printSEU=()=>{
        setPrintSEU(!seu)
    }  
    const [products, setProducts] = useState([])
    const handleProducts=(e)=>{
        if(!e){
            setProducts([])
            return
        }
        setProducts([...products, e])
    }

    const handleDeleteProduct= (i)=>{
        
        let a = products.filter((el, index)=> index !==i )
        setProducts(a)
    }

    //Compte rendu Hospitalisation
    const refCRH= useRef()
    const [closeCRH, setCloseCRH] = useState(false)
    const [crh, setPrintCRH] = useState(false)
    const closingCRH=()=>{
        setCloseCRH(!closeCRH)
    }
    const printCRH=()=>{
        setPrintCRH(!crh)
    }  

    const [dataCRH, setDataCRH] = useState({})
    const handleChangeCRH=(e)=>{
        setDataCRH({...dataCRH, [e.target.id]: e.target.value})
        console.log(e.target.value, dataCRH);
    }

    //Certificat de grossesse
    const refCG= useRef()
    const [closeCG, setCloseCG] = useState(false)
    const [cg, setPrintCG] = useState(false)
    const closingCG=()=>{
        setCloseCG(!closeCG)
    }
    const printCG=()=>{
        setPrintCG(!cg)
    }  

    const [dataCG, setDataCG] = useState({})
    const handleChangeCG=(e)=>{
        setDataCG({...dataCG, [e.target.id]: e.target.value})
    }
    //Certificat d'accouchement
    const refCA= useRef()
    const [closeCA, setCloseCA] = useState(false)
    const [ca, setPrintCA] = useState(false)
    const closingCA=()=>{
        setCloseCA(!closeCA)
    }
    const printCA=()=>{
        setPrintCA(!ca)
    } 
    const [dataCA, setDataCA] = useState({})
    const handleChangeCA=(e)=>{
        setDataCA({...dataCA, [e.target.id]: e.target.value})
    }

    //Avis Hospitallisation
    const refAH= useRef()
    const [closeAH, setCloseAH] = useState(false)
    const [ah, setPrintAH] = useState(false)
    const closingAH=()=>{
        setCloseAH(!closeAH)
    }
    const printAH=()=>{
        setPrintAH(!ah)
    } 
    const [dataAH, setDataAH] = useState({})
    const handleChangeAH=(e)=>{
        setDataAH({...dataAH, [e.target.id]: e.target.value})
    }

    //Compte Rendu D'accouchement
    const refCRA= useRef()
    const [closeCRA, setCloseCRA] = useState(false)
    const [cra, setPrintCRA] = useState(false)
    const closingCRA=()=>{
        setCloseCRA(!closeCRA)
    }
    const printCRA=()=>{
        setPrintCRA(!cra)
    } 
    const [dataCRA, setDataCRA] = useState({})
    const handleChangeCRA=(e)=>{
        setDataCRA({...dataCRA, [e.target.id]: e.target.value})
    }
    //PrintBilletDeSortie
    const refBS= useRef()
    const [closeBS, setCloseBS] = useState(false)
    const [bs, setPrintBS] = useState(false)
    const closingBS=()=>{
        setCloseBS(!closeBS)
    }
    const printBS=()=>{
        setPrintBS(!bs)
    } 
    const [dataBS, setDataBS] = useState({})
    const handleChangeBS=(e)=>{
        setDataBS({...dataBS, [e.target.id]: e.target.value})
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

    //Consultation Pédiatrique
    const refCP= useRef()
    const [closeCP, setCloseCP] = useState(false)
    const [CP, setPrintCP] = useState(false)
    const closingCP=()=>{
        setCloseCP(!closeCP)
    }
    const printCP=()=>{
        setPrintCP(!CP)
    } 
    const [dataCP, setDataCP] = useState({})
    const handleChangeCP=(e)=>{
        setDataCP({...dataCP, [e.target.id]: e.target.value})
    }
    //Consultation Generale
    const refConG= useRef()
    const [closeConG, setCloseConG] = useState(false)
    const [ConG, setPrintConG] = useState(false)
    const closingConG=()=>{
        setCloseConG(!closeConG)
    }
    const printConG=()=>{
        setPrintConG(!ConG)
    } 
    const [dataConG, setDataConG] = useState({})
    const handleChangeConG=(e)=>{
        setDataConG({...dataConG, [e.target.id]: e.target.value})
    }
    //Consultation Generale
    const refI= useRef()
    const [closeI, setCloseI] = useState(false)
    const [I, setPrintI] = useState(false)
    const closingI=()=>{
        setCloseI(!closeI)
    }
    const printI=()=>{
        setPrintI(!I)
    } 
    const [dataI, setDataI] = useState({})
    const handleChangeI=(e)=>{
        setDataI({...dataI, [e.target.id]: e.target.value})
    }

    //BilletinExamen
    const refBilExam= useRef()
    const [closeBilExam, setCloseBilExam] = useState(false)
    const [BilExam, setPrintBilExam] = useState(false)
    const closingBilExam=()=>{
        setCloseBilExam(!closeBilExam)
    }
    const printBilExam=()=>{
        setPrintBilExam(!BilExam)
    } 

    const [productsExam, setProductsExam] = useState([])
    const handleProductsExam=(e)=>{
        if(!e){
            return
        }
        setProductsExam([...productsExam, {...e, response: '',}])
    }
    const handleDeleteExam= (i)=>{
        let a = productsExam.filter((el, index)=> index !==i )
        setProductsExam(a)
    }

    //filtrer les accées des medecins
    const getGeant=()=>{
        axios.get('/api/geant')
        .then(res=>{
            let y = res.data.accueil.filter(el=> el.geant.post==agent.currentUser.post || agent.currentUser.post=='superAdmin')
            setData(y);
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


    const handlePatient=({idGeant, accueil, demande, patientName, patientLastName, adresse, patientPhone, patientId, module, dateDeNaissance, lieuDeNaissance})=>{
        setPatientSelect({idGeant, accueil, demande, patientName, patientLastName, adresse, patientPhone, patientId, module, dateDeNaissance, lieuDeNaissance})
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

    const deletePatientInGeant= ()=>{
        axios.post('/api/geant', {id: patientSelect.idGeant})
        .then(res=> {
            getGeant()
        })
        .catch(err=> console.log(err))
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
                                accueil={el.geant._id}
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
                            <li onClick={()=>closingAH()}>Avis D'Hospitalisation</li>
                            <li onClick={()=>closingBilExam()}>Billetin d'Examen</li>
                            <li onClick={()=>closingBS()}>Billet De Sortie</li>
                            <li onClick={()=>closing()}>Certificat De Visite Medicale</li>
                            <li onClick={()=>closingCVCVM()}>Certificat De Visite et Contre Visite Medicale</li>
                            <li onClick={()=>closingCM()}>Certificat Medical</li>
                            <li onClick={()=>closingCG()}>Certificat de Grossesse</li>
                            <li onClick={()=>closingCA()}>Certificat D'Accouchement</li>
                            <li onClick={()=>closingConG()}>Consultation médecin Générale</li>
                            <li onClick={()=>closingDecharge()} >Decharge</li>
                            <li onClick={()=>closingCRH()}>Compte Rendu D'Hospitalisation</li>
                            <li onClick={()=>closingCRA()}>Compte Rendu D'Accouchement</li>
                            <li onClick={()=>closingCP()}>Consultation Pédiatrique</li>
                            <li onClick={()=>closingDM()}>Dossier Médical</li>
                            <li onClick={()=>closingI()}>Imagerie</li>
                            <li onClick={()=>closingSEU()}>Soins en Urgence</li>
                        </ul>
                    </div>)
                    }
                    {
                        patientSelect.idGeant && (
                            <div>
                                <button className="btnMedecinToSkipPatient" onClick={()=> deletePatientInGeant()}>
                                    Supprimer de la liste
                                </button>
                                <button className="btnMedecinToSkipPatient" onClick={()=> skipToInfirmiere()}>
                                    Hospitaliser
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
            <div style={{textAlign: 'center', minWidth:'60vw'}}>
                <h3>{patient.name + ' ' + patient.lastName}</h3>
                    <div>
                        <h4>Dossier Médical</h4>
                        {
                            DossierMedicals.length !== 0 && (
                                <div style={{backgroundColor: 'black'}}>
                                    <PrintDossier 
                                        namePatient={patient.name}
                                        lastNamePatient= {patient.lastName}
                                        idPatient={patient.id}
                                        dateDeNaissance= {patient.dateDeNaissance}
                                        closeDM={closingDM}
                                        printDM={printDM}
                                        handleChange={handleChangeDM}
                                        data={DossierMedicals[0]}
                                        Examens = {Examlterieurs}
                                        zIndex={1}
                                    />
                                </div>)
                            }
                    </div>

                {
                    //Update Patient
                    updatePatient && (
                        <Modal close={setUpdatePatient}> 
                            <div className='accueil-add-patient'> 
                                <form className="profil-box" onSubmit={(e)=> patchPatient(e)}>
                                <h2 style={{textAlign: 'center'}}>Mettre à jour le profil du patient</h2>
                                    <div className="profil-flex">
                                        <div>
                                            <label htmlFor='name'>Prénom</label>
                                            <input type="text" value={patient.name} onChange={(e)=>handleChange(e)} placeholder='Prénom' id='name' />
                                        </div>
                                        <div>
                                            <label htmlFor='lastName'>Nom de famille</label> 
                                            <input type="text" id='lastName' value={patient.lastName} onChange={(e)=>handleChange(e)} placeholder='Nom de Famille' />
                                        </div>
                                    </div>
                                    <div className="profil-flex">
                                        
                                        <div>
                                            <label htmlFor='phone'>Numéro de téléphone</label> 
                                            <input type="number" id='phone' value={patient.phone} onChange={(e)=>handleChange(e)} placeholder='Numéro de téléphone' />
                                        </div>
                                        <div>
                                            <label htmlFor='dateDeNaissance'>Date de Naissance</label> 
                                            <input type="date" value={patient.dateDeNaissance} placeholder='Date de Naissance' onChange={(e)=>handleChange(e)} id='dateDeNaissance' />
                                        </div>
                                    </div>
                                    <div className="profil-flex">
                                        
                                        <div>
                                            <label htmlFor='lieuDeNaissance'>Lieu de Naissance</label> 
                                            <input type="text" id='lieuDeNaissance' value={patient.lieuDeNaissance} onChange={(e)=>handleChange(e)} placeholder='Lieu de Naissance' />
                                        </div>
                                        <div>
                                            <label htmlFor='adresse'>Adresse</label> 
                                            <input type="text" value={patient.adresse} placeholder='Adresse' onChange={(e)=>handleChange(e)} id='Adresse' />
                                        </div>
                                    </div>                                       
                                        <input className="input-submit" value='validé' type="submit" />
                                     
                                </form>
                            </div>
                        </Modal>
                    )
                }
                {
                    close && 
                    <Modal close={closing}>
                        <CerificatDeVisiteMedicale 
                            namePatient={patient.name}
                            lastNamePatient={patient.lastName}
                            dateDeNaissance={patient.dateDeNaissance}
                            lieuDeNaissance={patient.lieuDeNaissance}
                            idPatient={patient.id}
                            module={patientSelect.module}
                            close={closing}
                            print={print}
                            label={true}
                            justificationCVM={justificationCVM}
                            justification={justification}
                        />
                    </Modal>

                }
                {
                    printCertificatDeVisiteMedicale && (

                        <Modal close={print}>
                            <ReactToPrint
                                trigger={() => <button className="printBoutton">Imprimer</button>}
                                content={() => refCertificatDeVisiteMedicale.current}
                            />

                            <PrintCertificatDeVisiteMedical
                                namePatient={patient.name}
                                lastNamePatient={patient.lastName}
                                dateDeNaissance={patient.dateDeNaissance}
                                lieuDeNaissance={patient.lieuDeNaissance}
                                nameAgent={nameAgent}
                                lastNameAgent={lastNameAgent}
                                justification={justification}
                                ref={refCertificatDeVisiteMedicale}
                            />
                        </Modal>
                )}
                {
                    closeCVCVM &&(
                    <Modal close={closingCVCVM}>
                        <CertificatDeVisiteEtContreVisiteMedicale
                            namePatient={patientSelect.patientName}
                            lastNamePatient={patientSelect.patientLastName}
                            dateDeNaissance={patientSelect.dateDeNaissance}
                            lieuDeNaissance={patientSelect.lieuDeNaissance}
                            idPatient={patientSelect.patientId}
                            module={patientSelect.module}
                            nameAgent={nameAgent}
                            lastNameAgent={lastNameAgent}
                            AgentNames={AgentNames}
                            changeAgent2={changeAgent2}
                            agent2={agent2}
                            closingCVCVM={closingCVCVM}
                            printCVCM={printCVCM}
                        />
                    </Modal>)
                }

                {
                    CVCM && (
                        <Modal close={printCVCM}>

                            <ReactToPrint
                                trigger={() => <button className="printBoutton">Imprimer</button>}
                                content={() => refCertificatDeVisiteContreVisiteMedicale.current}
                            />

                            <PrintCertificatDeVisiteEtContreVisiteMedicale
                            namePatient={patientSelect.patientName}
                            lastNamePatient={patientSelect.patientLastName}
                            dateDeNaissance={patientSelect.dateDeNaissance}
                            lieuDeNaissance={patientSelect.lieuDeNaissance}
                            idPatient={patientSelect.patientId}
                            module={patientSelect.module}
                            nameAgent={nameAgent}
                            lastNameAgent={lastNameAgent}
                            AgentNames={AgentNames}
                            agent2={agent2}
                            ref={refCertificatDeVisiteContreVisiteMedicale}
                            />
                        </Modal>
                    )
                }
                {
                    closeDecharge &&(
                        <Modal close={closingDecharge}>
                            <Decharge 
                                handleChangeResponsableDecharge={handleChangeResponsableDecharge}
                                responsable={responsable}
                                handleChangeTypeResponsableDecharge={handleChangeTypeResponsableDecharge}
                                typeResponsable={typeResponsable}
                                patient={patient.id}
                                module={patientSelect.module}
                                printDecharge={printDecharge}
                                closeDecharge={closingDecharge}
                            />
                        </Modal>
                    )
                }
                {
                    decharge &&(
                        <Modal close={printDecharge}>
                            <ReactToPrint
                                trigger={() => <button className="printBoutton">Imprimer</button>}
                                content={() => refDecharge.current}
                            />

                            <PrintDecharge 
                                handleChangeResponsableDecharge={handleChangeResponsableDecharge}
                                responsable={responsable}
                                handleChangeTypeResponsableDecharge={handleChangeTypeResponsableDecharge}
                                typeResponsable={typeResponsable}
                                patient={patient.id}
                                printDecharge={printDecharge}
                                closeDecharge={closingDecharge}
                                nameAgent={nameAgent}
                                lastNameAgent={lastNameAgent}
                                ref={refDecharge}
                            />
                        </Modal>
                    )
                }
                {
                    closeCM && (
                        <Modal close={closingCM}>
                            <CertificatMedical 
                                closeCM={closingCM}
                                printCM={printCM}
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                idPatient={patient.id}
                                constat={constat}
                                handleChangeConstat={handleChangeConstat}
                                module={patientSelect.module}
                            />
                        </Modal>
                    )
                }
                {
                    certificatMedical && (

                        <Modal close={printCM}>
                            <ReactToPrint
                                trigger={() => <button className="printBoutton">Imprimer</button>}
                                content={() => refCM.current}
                            />
                            <PrintCertificatMedical 
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                constat={constat}
                                nameAgent={nameAgent}
                                lastNameAgent={lastNameAgent}
                                ref={refCM}
                            />
                        </Modal>
                    )
                }
                {
                    closeSEU &&(
                        <Modal close={closingSEU}>
                            <SoinsUrgence 
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                dateDeNaissance={patient.dateDeNaissance}
                                products={products}
                                handleProducts={handleProducts}
                                handleDelete={handleDeleteProduct}
                                idPatient={patient.id}
                                closeSEU={closingSEU}
                                printSEU={printSEU}
                            />
                        </Modal>
                    )
                }
                {
                    seu &&(
                        <Modal close={printSEU}>
                            <ReactToPrint
                                trigger={() => <button className="printBoutton">Imprimer</button>}
                                content={() => refSEU.current}
                            />

                            <PrintSointUrgence
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                dateDeNaissance={patient.dateDeNaissance}
                                products={products}
                                nameAgent={nameAgent}
                                lastNameAgent={lastNameAgent}
                                ref={refSEU}
                            />
                        </Modal>
                    )
                }
                {
                    closeCRH &&(
                        <Modal close={closingCRH}>
                            <CompteRenduHospitalisation 
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                dateDeNaissance={patient.dateDeNaissance}
                                handleChange={handleChangeCRH}
                                data={dataCRH}
                                printCRH={printCRH}
                                closeCRH={closingCRH}
                               
                            />
                        </Modal>
                    )
                }
                {
                    crh &&(
                        <Modal close={printCRH}>
                            <ReactToPrint
                                trigger={() => <button className="printBoutton">Imprimer</button>}
                                content={() => refCRH.current}
                            />

                            <PrintCompteRenduHospitalisation 
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                dateDeNaissance={patient.dateDeNaissance}
                                data={dataCRH}
                                nameAgent={nameAgent}
                                lastNameAgent={lastNameAgent}
                                ref={refCRH}
                            />
                        </Modal>
                    )
                }

                {
                    closeCG &&(
                        <Modal close={closingCG}>
                            <CertificatGrossesse 
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                printCG={printCG}
                                closeCG={closingCG}
                                idPatient={patient.id}
                                data={dataCG}
                                handleChange={handleChangeCG}
                            />
                            
                        </Modal>
                    )
                }
                {
                    cg && (
                        <Modal close={printCG}>
                            <ReactToPrint
                                trigger={() => <button className="printBoutton">Imprimer</button>}
                                content={() => refCG.current}
                            />

                            <PrintCertificatGrossesse 
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                data={dataCG}
                                nameAgent={nameAgent}
                                lastNameAgent={lastNameAgent}
                                ref={refCG}
                            />
                        </Modal>
                    )
                }

                {
                    closeCA &&(
                        <Modal close={closingCA}>
                            <CertificatAccouchement 
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                printCA={printCA}
                                closeCA={closingCA}
                                idPatient={patient.id}
                                data={dataCA}
                                handleChange={handleChangeCA}
                            />
                        </Modal>
                    )
                }

                {
                    ca && (
                        <Modal close={printCA}>
                            <ReactToPrint
                                trigger={() => <button className="printBoutton">Imprimer</button>}
                                content={() => refCA.current}
                            />

                            <PrintCertificatAccouchement 
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                data={dataCA}
                                nameAgent={nameAgent}
                                lastNameAgent={lastNameAgent}
                                ref={refCA}
                            />
                        </Modal>
                    )
                }
                {
                    closeAH &&(
                        <Modal close={closingAH}>
                            <AvisHospitalisation 
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                data={dataAH} 
                                idPatient={patient.id}
                                closeAH={closingAH}
                                printAH={printAH}
                                handleChange={handleChangeAH}
                            />
                        </Modal>
                    )
                }
                {
                     ah && (
                        <Modal close={printAH}>
                            <ReactToPrint
                                trigger={() => <button className="printBoutton">Imprimer</button>}
                                content={() => refAH.current}
                            />

                            <PrintAvisHospitalisation 
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                data={dataAH}
                                nameAgent={nameAgent}
                                lastNameAgent={lastNameAgent}
                                ref={refAH}
                            />
                        </Modal>
                    )
                }
                {
                   closeCRA &&(
                    <Modal close={closingCRA}>
                        <CompteRenduAccouchement 
                            namePatient={patient.name}
                            lastNamePatient= {patient.lastName}
                            data={dataCRA}
                            idPatient={patient.id}
                            nameAgent={nameAgent}
                            lastNameAgent={lastNameAgent} 
                            closeCRA={closingCRA}
                            printCRA={printCRA}
                            handleChange={handleChangeCRA}
                        />
                    </Modal>
                )
                }
                {
                    cra && (
                        <Modal close={printCRA}>
                            <ReactToPrint
                                trigger={() => <button className="printBoutton">Imprimer</button>}
                                content={() => refCRA.current}
                            />

                            <PrintCompteRenduAccouchement 
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                data={dataCRA}
                                nameAgent={nameAgent}
                                lastNameAgent={lastNameAgent}
                                ref={refCRA}
                            />
                        </Modal>
                    )
                }
                {
                    closeBS &&(
                        <Modal close={closingBS}>
                            <BilletDeSortie 
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                data={dataBS}
                                idPatient={patient.id}
                                dateDeNaissance= {patient.dateDeNaissance}
                                closeBS={closingBS}
                                printBS={printBS}
                                handleChange={handleChangeBS}
                            />
                        </Modal>)
                }
                {
                    bs && (
                        <Modal close={printBS}>
                            <ReactToPrint
                                trigger={() => <button className="printBoutton">Imprimer</button>}
                                content={() => refBS.current}
                            />

                            <PrintBilletDeSortie
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                dateDeNaissance={patient.dateDeNaissance}
                                data={dataBS}
                                nameAgent={nameAgent}
                                lastNameAgent={lastNameAgent}
                                ref={refBS}
                            />
                        </Modal>
                    )
                }
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
                {
                    closeDM &&(
                        <Modal close={closingDM}>
                            <DossierMedical 
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                idPatient={patient.id}
                                dateDeNaissance= {patient.dateDeNaissance}
                                closeDM={closingDM}
                                printDM={printDM}
                                handleChange={handleChangeDM}
                                data={dataDM}
                                handleExamenDM={handleExamenDM}
                            />
                        </Modal>)
                }
                {
                    DM && (
                        <Modal close={printDM}>
                            <ReactToPrint
                                trigger={() => <button className="printBoutton">Imprimer</button>}
                                content={() => refDM.current}
                            />

                            <PrintDossier
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                dateDeNaissance={patient.dateDeNaissance}
                                data={dataDM}
                                nameAgent={nameAgent}
                                lastNameAgent={lastNameAgent}
                                ref={refDM}
                                Examens={ExamenDM}
                            />
                        </Modal>
                    )
                }
                {
                    closeCP &&(
                        <Modal close={closingCP}>
                            <ConsultationPediatrique 
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                data={dataCP}
                                idPatient={patient.id}
                                dateDeNaissance= {patient.dateDeNaissance}
                                closeCP={closingCP}
                                printCP={printCP}
                                handleChange={handleChangeCP}
                            />
                        </Modal>)
                }
                {
                    CP && (
                        <Modal close={printCP}>
                            <ReactToPrint
                                trigger={() => <button className="printBoutton">Imprimer</button>}
                                content={() => refCP.current}
                            />

                            <PrintPediatrique
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                dateDeNaissance={patient.dateDeNaissance}
                                data={dataCP}
                                nameAgent={nameAgent}
                                lastNameAgent={lastNameAgent}
                                ref={refCP}
                            />
                        </Modal>
                    )
                }
                {
                    closeConG &&(
                        <Modal close={closingConG}>
                            <ConsultationGenerale 
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                data={dataConG}
                                idPatient={patient.id}
                                dateDeNaissance= {patient.dateDeNaissance}
                                closeCG={closingConG}
                                printCG={printConG}
                                handleChange={handleChangeConG}
                            />
                        </Modal>)
                }
                {
                    ConG && (
                        <Modal close={printConG}>
                            <ReactToPrint
                                trigger={() => <button className="printBoutton">Imprimer</button>}
                                content={() => refConG.current}
                            />

                            <PrintGenerale
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                dateDeNaissance={patient.dateDeNaissance}
                                data={dataConG}
                                nameAgent={nameAgent}
                                lastNameAgent={lastNameAgent}
                                ref={refConG}
                            />
                        </Modal>
                    )
                }
                {
                    closeI &&(
                        <Modal close={closingI}>
                            <Imagerie
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                data={dataI}
                                idPatient={patient.id}
                                dateDeNaissance= {patient.dateDeNaissance}
                                closeI={closingI}
                                printI={printI}
                                handleChange={handleChangeI}
                            />
                        </Modal>)
                }
                {
                    I && (
                        <Modal close={printI}>
                            <ReactToPrint
                                trigger={() => <button className="printBoutton">Imprimer</button>}
                                content={() => refI.current}
                            />

                            <PrintImagerie
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                dateDeNaissance={patient.dateDeNaissance}
                                data={dataI}
                                nameAgent={nameAgent}
                                lastNameAgent={lastNameAgent}
                                ref={refI}
                            />
                        </Modal>
                    )
                }
                {
                    closeBilExam &&(
                        <Modal close={closingBilExam}>
                            <BilletinExamen
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                idPatient={patient.id}
                                dateDeNaissance= {patient.dateDeNaissance}
                                closeBilExam={closingBilExam}
                                printBilExam={printBilExam}
                                handleProductsExam= {handleProductsExam}
                                productsExam= {productsExam}
                                handleDelete={handleDeleteExam}
                                handleDeleteResponse= {()=> null}
                            />
                        </Modal>)
                }
                {
                    BilExam && (
                        <Modal close={printBilExam}>
                            <ReactToPrint
                                trigger={() => <button className="printBoutton">Imprimer</button>}
                                content={() => refBilExam.current}
                            />

                            <PrintBilletinExamen
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                dateDeNaissance={patient.dateDeNaissance}
                                nameAgent={nameAgent}
                                lastNameAgent={lastNameAgent}
                                productsExam= {productsExam}
                                ref={refBilExam}
                            />
                        </Modal>
                    )
                }
            </div>
        </div>
    )
}

export default Medecin
