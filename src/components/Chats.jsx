import { doc, onSnapshot } from 'firebase/firestore';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';
import style from './Chats.module.css';
const Chats = ()=>{
    const [chats, setChats] = useState([]);
    const {currentUser} = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    useEffect(() => {
        const getChats = ()=>{
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });
            return () =>{
                unsub();
            };
        };
        currentUser.uid && getChats();
    }, [currentUser.uid]);
    
    const selectHandler = (u) =>{
        dispatch({type:"CHANGE_USER", payload: u})
    }

    return (
        <div className={style.chats}>
            {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) =>(
            <div className={style.userChat} key={chat[0]} onClick={() => selectHandler(chat[1].userInfo)}>
                <img src={chat[1].userInfo.photoURL} className={style.userImg} alt=""/>
                <div className={style.userchatInfo}>
                    <span>{chat[1].userInfo.displayName}</span>
                    <p>{chat[1].lastMessage?.text}</p>
                </div>
            </div>
            ))}
        </div>
    );
};
export default Chats;