import React from 'react'
import './style.css'

const Header2 = () => {
    return (
        <div className="header2Container">
            <div className="header2Logo">
                <div>
                    <h3>CLINIQUE</h3>
                </div>
                <div>
                    <img src="/" alt="logo" width='200' />
                </div>
            </div>
            <div className="header2hr"></div>
            <div>
                Médecine Générale-Analyses Médicales-Consultations Specialisées <br/>
                BP:11 454 --- NIF: 1333 <br/>
                Tél: +227 20 75 34 39 <br/>
                Niamey-République du NIGER
            </div>
        </div>
    )
}

export default Header2