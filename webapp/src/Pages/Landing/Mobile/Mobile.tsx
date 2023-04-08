import React from "react";
import './Mobile.css'
import MobileDemo from '../../../Assets/MobileDemo.svg'
import Blob1 from '../../../Assets/Blobs/Blob1.svg'
import Blob2 from '../../../Assets/Blobs/Blob2.svg'
import Blob3 from '../../../Assets/Blobs/Blob3.svg'
import Blob4 from '../../../Assets/Blobs/Blob4.svg'


export default function Mobile() {
    return (
        <div>
            <div className="DesktopLandingContainer">
                <h1>Know <span style={{color: '#ff0000'}}>before</span> it happens</h1>
                <h3 className="DesktopSubHeading">Get alerts of potential incidents</h3>
                <button className='DesktopAddNumber' onClick={() => alert('Clicked')}>
                    Add Phone Number
                </button>
            </div>
            <img src={MobileDemo} className="MobileDemo" alt='Demo' />
            <img src={Blob1} className="Blob1" alt='Blob1' />
            <img src={Blob2} className="Blob2" alt='Blob2' />
            <img src={Blob3} className="Blob3" alt='Blob3' />
            <img src={Blob4} className="Blob4" alt='Blob4' />
        </div>
    )
}