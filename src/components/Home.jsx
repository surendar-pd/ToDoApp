import React, { useEffect, useState } from 'react'
import MenuComponent from './MenuComponent';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Tooltip } from '@mui/material';
import ToDo from './ToDo';
import Doing from './Doing'
import Done from './Done';
import { db } from '../firebase';

function Home({user, signOut}) {

    const [cards, setCards] = useState([])
    
    useEffect(() => {
        db.collection("users").doc(user.uid).collection("cards").orderBy("createdAt", "asc").onSnapshot((snapshot) => {
            setCards(
				snapshot.docs.map((doc) => {
					return {
						id: doc.id,
						data: doc.data()
					};
				})
			);
        });
    },[])
    // console.log(cards)
    
    return (
        <div className="w-full h-screen bg-[#0E1117] text-white overflow-scroll">
            <nav className="w-full px-8 py-4 bg-[#161B22] shadow-lg flex justify-between items-center">
                <div className="">
                    <h1 className="text-lg font-bold">ToDo App</h1>
                    <h1 className="text-sm">{user.name}</h1>
                </div>
                <div className="flex gap-2 items-center">
                    <Tooltip title="Notifications">
                        <NotificationsNoneOutlinedIcon className="cursor-pointer"/>
                    </Tooltip>
                    <MenuComponent signOut={signOut} user={user}/>
                </div>
            </nav>
            <div className="w-full h-full py-4 px-8 flex flex-col gap-4 lg:flex-row justify-between">
                <div className="w-full h-full overflow-scroll pb-16 border border-gray-700 rounded">
                    <ToDo cards={cards} user={user}/>
                </div>
                <div className="w-full h-full overflow-scroll pb-16 border border-gray-700 rounded">
                    <Doing cards={cards} user={user}/>
                </div>
                <div className="w-full h-full overflow-scroll pb-16 border border-gray-700 rounded">
                    <Done cards={cards} user={user}/>
                </div>
            </div>
        </div>
    )
}

export default Home