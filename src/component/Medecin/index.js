import React,{useState, useEffect, useRef} from 'react'
import axios from 'axios'
import ListMedecin from './ListMedecin'
import './style.css'
import CerificatDeVisiteMedicale from '../Fiches/CerificatDeVisiteMedicale'
import PrintCertificatDeVisiteMedical from '../Fiches/CerificatDeVisiteMedicale/PrintCertificatDeVisiteMedical'
import CertificatDeVisiteEtContreVisiteMedicale from '../Fiches/CertificatDeVisiteEtContreVisiteMedicale'
import PrintCertificatDeVisiteEtContreVisiteMedicale from '../Fiches/CertificatDeVisiteEtContreVisiteMedicale/PrintCertificatDeVisiteEtContreVisiteMedicale'
import Modal from '../Modal'
import {toast} from 'react-toastify'
import ReactToPrint from "react-to-print";
import {useSelector} from 'react-redux'
import {socket} from '../Header'


const Medecin = () => {
    const [data, setData] = useState([])
    const [close, setClose] = useState(false)
    const [patientSelect, setPatientSelect] = useState({})

    //Agent
    const agent = useSelector(state => state.login)
    const nameAgent = agent.currentUser.name
    const lastNameAgent = agent.currentUser.lastName

    const closing=()=>{
        setClose(!close)
    }
    //Certificat de visite Medical
    const [printCertificatDeVisiteMedicale, setPrintCertificatDeVisiteMedicale] = useState(false)

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

    //Decharge
    const [responsable, setResponsable] = useState('')
    const handleChangeResponsableDecharge=(e)=>{
        setResponsable(e.target.value)
    }
    const [typeResponsable, setTypeResponsable] = useState({
        malade: false, parent: false, accompagnant: false
        })
    const handleChangeTypeResponsableDecharge=(e)=>{
        setTypeResponsable({...typeResponsable, [e.target.id]: e.target.checked})
    }

    const printCVCM= ()=>{
        setPrintCVCM(!CVCM)
    }



    const getGeant=()=>{
        axios.get('/api/geant')
        .then(res=>{
            setData(res.data.accueil);
            console.log(res.data.accueil);
        })
        .catch(err=>{
            console.log(err.response.data);
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

    const handlePatient=({idGeant, demande, patientName, patientLastName, patientPhone, patientId, module, dateDeNaissance, lieuDeNaissance})=>{
        setPatientSelect({idGeant, demande, patientName, patientLastName, patientPhone, patientId, module, dateDeNaissance, lieuDeNaissance})
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
                                module={el.geant.module}
                                dateDeNaissance={el.geant.patient.dateDeNaissance ? el.geant.patient.dateDeNaissance : ''}
                                lieuDeNaissance={el.geant.patient.lieuDeNaissance ? el.geant.patient.lieuDeNaissance : 'Tahoua'}
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
                            <li onClick={()=>closing()}>Certificat De Visite Medicale</li>
                            <li onClick={()=>closingCVCVM()}>Certificat De Visite et Contre Visite Medicale</li>
                            <li>Decharge</li>
                            <li>Certificat Medical</li>
                        </ul>
                    </div>)
                    }
                </div>
            </div>
            <div style={{textAlign: 'center', minWidth:'60vw'}}>
                    <h3>{patientSelect.patientName} { patientSelect.patientLastName}</h3>
                    né(e) le { patientSelect.dateDeNaissance} à {patientSelect.lieuDeNaissance}
                {
                    close && 
                    <Modal close={closing}>
                        <CerificatDeVisiteMedicale 
                            namePatient={patientSelect.patientName}
                            lastNamePatient={patientSelect.patientLastName}
                            dateDeNaissance={patientSelect.dateDeNaissance}
                            lieuDeNaissance={patientSelect.lieuDeNaissance}
                            idPatient={patientSelect.patientId}
                            module={patientSelect.module}
                            close={closing}
                            print={print}
                            label={true}
                        />
                    </Modal>

                }
                {
                    printCertificatDeVisiteMedicale && (

                     /*  <Modal close={print}>
                            <button onClick={()=>CertificatDeVisiteMedicalPrint()}> Print this</button>
                            
                           <CerificatDeVisiteMedicale 
                            namePatient={patientSelect.patientName}
                            lastNamePatient={patientSelect.patientLastName}
                            dateDeNaissance={patientSelect.dateDeNaissance}
                            lieuDeNaissance={patientSelect.lieuDeNaissance}
                            idPatient={patientSelect.patientId}
                            module={patientSelect.module}
                            print={print}
                            close={print}
                            label={false}
                            ref={refCertificatDeVisiteMedicale}
                            
                            />
                        </Modal> */

                        <Modal close={print}>
                            <ReactToPrint
                                trigger={() => <button className="printBoutton">Imprimer</button>}
                                content={() => refCertificatDeVisiteMedicale.current}
                            />

                            <PrintCertificatDeVisiteMedical
                                namePatient={patientSelect.patientName}
                                lastNamePatient={patientSelect.patientLastName}
                                dateNaissancePatient={patientSelect.dateDeNaissance}
                                lieuNaissancePatient={patientSelect.lieuDeNaissance}
                                nameAgent={nameAgent}
                                lastNameAgent={lastNameAgent}
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

                
            </div>
        </div>
    )
}

export default Medecin
