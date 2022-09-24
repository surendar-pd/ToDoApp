import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import SelectMenuComponent from './SelectMenuComponent';
import { db } from '../firebase';
import { useEffect } from 'react';

const style = {
position: 'absolute',
top: '50%',
left: '50%',
transform: 'translate(-50%, -50%)',
width: 400,
bgcolor: '#161B22',
border: '2px solid #000',
boxShadow: 24,
p: 4,
color: '#fff'
};

export default function ModalComponent({open, setOpen, setEdit, edit, user}) {

    
    const [title, setTitle] = useState();
    const [selectedIndex, setSelectedIndex] = React.useState();
    const [description, setDescription] = useState()
    
    const handleClose = () => {setOpen(false);setEdit();setSelectedIndex(0)};
    
    useEffect(() => {
        setTitle(edit?.data?.title)
        setDescription(edit?.data?.description)
        if(edit?.data?.status === 'To do'){
            setSelectedIndex(0)
        }else if(edit?.data?.status === 'Doing'){
            setSelectedIndex(1)
        }else{
            setSelectedIndex(2)
        }
    },[open])

    const options = [
        'To do',
        'Doing',
        'Done'
    ];
    
    const handleSave = () => {
        db.collection("users").doc(user.uid).collection("cards").doc(edit?.id).update({
            title: title,
            description: description, 
            status:options[selectedIndex]
        }).then(handleClose())
    }

    const handleDelete = () => {
        db.collection("users").doc(user.uid).collection("cards").doc(edit?.id).delete()
        .then(handleClose())
    }

return (
<div>
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
    <Box sx={style}>
        <div className="flex flex-col gap-2">
            <h1>Edit</h1>
            <div className="flex flex-col gap-2">
                <input value={title} onChange={text => setTitle(text.target.value)} className="w-full p-2 bg-gray-300 bg-opacity-10 text-white focus:outline-gray-700 outline-none"/>
                <input value={description} onChange={text => setDescription(text.target.value)} className="w-full p-2 bg-gray-300 bg-opacity-10 text-white focus:outline-gray-700 outline-none"/>
            </div>
            <div className="w-full">
                <SelectMenuComponent options={options} setSelectedIndex={setSelectedIndex} selectedIndex={selectedIndex}/>
            </div>
            <div className="w-full flex justify-between">
            <Button onClick={handleSave}disabled={title === edit?.data?.title ? description === edit?.data?.description ? options[selectedIndex] === edit?.data?.status ? true : false : false : false} variant="contained" color="success">
                <h1 className={`${title === edit?.data?.title ? description === edit?.data?.description ? options[selectedIndex] === edit?.data?.status ? 'text-gray-500' : 'text-white' : 'text-white' : 'text-white'}`}>Save</h1>
            </Button>
            <Button onClick={handleDelete} variant="outlined" color="error">
                <h1>Delete</h1>
            </Button>
            </div>
        </div>

    </Box>
    </Modal>
</div>
);
}
