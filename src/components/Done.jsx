import React from 'react'
import AccordionComponent from './AccordionComponent';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ModalComponent from './ModalComponent';

function Done({user, cards}) {

  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState({});

  return (
    <div className="flex flex-col gap-2">
            <div className="bg-[#161B22]">
                <h1 className="text-lg p-4">Done</h1>
            </div>
            <AccordionComponent user={user} status={"Done"}/>
            <div className="flex flex-col gap-2">
                {
                    cards.map((item, index) => (
                        <div key={index} className={`${item?.data.status === 'Done' ? 'block': 'hidden'} group w-full cursor-pointer hover:bg-opacity-70 bg-[#161B22] flex justify-between items-center gap-2 border-l-2 border-green-500 p-4`}>
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

export default Done