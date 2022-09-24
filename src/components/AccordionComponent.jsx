import React, {useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Button from '@mui/material/Button';
import {db} from '../firebase';
import firebase from 'firebase';


export default function AccordionComponent({user, status}) {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleAddCard = () => {
        !title && !description ? alert('Enter details') :
        db.collection("users").doc(user.uid).collection("cards").add({title: title, description: description, status:status,createdAt: firebase.firestore.Timestamp.now()})
        .then(
            setTitle(''),
            setDescription('')
        );
    }
return (
    <div>
    <Accordion>
        <AccordionSummary
            style={{backgroundColor: '#161B22'}}
            expandIcon={<AddOutlinedIcon className="text-white" />}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >
            <div className="bg-[#161B22] text-white w-full p-4 flex gap-4 cursor-pointer items-center">
                <h1>Add a card</h1>
            </div>
        </AccordionSummary>
        <AccordionDetails
            style={{backgroundColor: '#161B22', color: 'white'}}
        >
            <div className="flex flex-col gap-2">
                <h1>Title</h1>
                <input value={title} onChange={text => setTitle(text.target.value)} className="w-full p-2 bg-gray-300 bg-opacity-10 text-white focus:outline-gray-700 outline-none"/>
            </div>
            <div className="flex flex-col gap-2 mt-2">
                <h1>Description</h1>
                <input value={description} onChange={text => setDescription(text.target.value)} className="w-full p-2 bg-gray-300 bg-opacity-10 text-white focus:outline-gray-700 outline-none"/>
            </div>
            <div className="mt-4 w-full">
                <Button style={{width: '100%'}} variant="contained" color="success" onClick={handleAddCard}>Add</Button>
            </div>
        </AccordionDetails>
    </Accordion>
    </div>
);
}
