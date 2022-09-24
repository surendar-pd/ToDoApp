import React from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AccordionComponent from './AccordionComponent';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ModalComponent from './ModalComponent';

function ToDo({user, cards}) {

    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = React.useState({});

    return (
        <div className="flex flex-col gap-2">
            <div className="bg-[#161B22]">
                <h1 className="text-lg p-4">To Do</h1>
            </div>
            <AccordionComponent user={user} status={"To do"}/>
            <div className="flex flex-col gap-2">
                {
                    cards.map((item, index) => (
                        <div key={index} className={`${item?.data.status === 'To do' ? 'block': 'hidden'} group w-full cursor-pointer hover:bg-opacity-70 bg-[#161B22] flex justify-between items-center gap-2 border-l-2 border-red-500 p-4`}>
                            <div>
                                <h1>{item?.data.title}</h1>
                                <h1>{item?.data.description}</h1>
                            </div>
                            <div className="lg:hidden group-hover:block">
                                <EditOutlinedIcon onClick={() => {setOpen(true);setEdit(item)}}/>
                            </div>
                        </div>
                    ))
                }
            </div>
            {cards.length > 0 && <ModalComponent user={user} setEdit={setEdit} edit={edit} setOpen={setOpen} open={open}/>}
        </div>
    )
}

export default ToDo