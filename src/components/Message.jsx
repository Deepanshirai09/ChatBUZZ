import {useContext, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import style from "./Message.module.css";
const Message = ({message})=>{
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() =>{
    ref.current?.scrollIntoView({behavior:"smooth"});
  }, [message]);

  console.log(message);
    return (
        <div ref={ref}
        className={`${style.message} ${message.senderId === currentUser.uid && style.owner}`}
        >
          <div className={style.messageInfo}>
            <img src={message.senderId === currentUser.uid
            ? currentUser.photoURL
            : data.user.photoURL
            } 
            alt="" 
            className={style.messageImg}/>

            <span>{message.date.toDate().toDateString()}</span>

           {message.date.toDate().getHours()<10?"0"+message.date.toDate().getHours():message.date.toDate().getHours()}
           {message.date.toDate().getMinutes()<10?":0"+message.date.toDate().getMinutes():":"+message.date.toDate().getMinutes()}
          </div>
          <div className={`${style.messageContent} ${message.senderId === currentUser.uid && style.owner}`}>
            <p className={`${style.textmessage} ${message.senderId === currentUser.uid && style.owner}`}>{message.text}</p>
            {message.img && <img 
            className={style.contentImg} 
            src={message.img} 
            alt=""
            />}
          </div>
        </div>
    );
};
export default Message;
