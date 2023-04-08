import React from "react";
import './Desktop.css'
import DesktopDemo from '../../../Assets/DesktopDemo.svg'
import Blob1 from '../../../Assets/Blobs/Blob1.svg'
import Blob2 from '../../../Assets/Blobs/Blob2.svg'
import Blob3 from '../../../Assets/Blobs/Blob3.svg'
import Blob4 from '../../../Assets/Blobs/Blob4.svg'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { TextField } from "@mui/material";

export default function Desktop() {
    const [open, setOpen] = React.useState(false);
    const [phone, setPhone] = React.useState('');
    const [zip, setZip] = React.useState('');

    const submit = () => {
        fetch('http://localhost:3001/addPhone', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({number: phone, zip: zip})
        }).then((response) => {
            return response.json();
        }
        ).then((data1) => {
            console.log(data1);
        });
    }

    return (
        <div>
            <div className="DesktopLandingContainer">
                <h1>Know <span style={{color: '#ff0000'}}>before</span> it happens</h1>
                <h3 className="DesktopSubHeading">Get alerts of potential incidents</h3>
                <button className='DesktopAddNumber' onClick={() => setOpen(true)}>
                    Add Phone Number
                </button>
            </div>
            <img src={DesktopDemo} className="DesktopDemo" alt='Demo' />
            <img src={Blob1} className="Blob1" alt='Blob1' />
            <img src={Blob2} className="Blob2" alt='Blob2' />
            <img src={Blob3} className="Blob3" alt='Blob3' />
            <img src={Blob4} className="Blob4" alt='Blob4' />

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <TextField id="outlined-search" label="📞 Number" type="text" onChange={(e: any) => setPhone(e.target.value)} value={phone} />
                    <TextField id="outlined-search" label="📍 Zip Code" type="text" onChange={(e: any) => setZip(e.target.value)} value={zip} />
                    <button className='DesktopNumberAdd' onClick={() => submit()} style={{marginTop: '20px'}}>
                        Submit
                    </button>
                </Box>
            </Modal>
        </div>
    )
}