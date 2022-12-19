import style from "./Chat.module.css";
import Video from "../img/zoom (1).png";
import More from "../img/more (2).png";
import Add from "../img/invite.png";
import Messages from "./Messages";
import Input from "./Input";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
const Chat = ()=>{
    const { data } = useContext(ChatContext);
    return (
        <div className={style.chat}>
            <div className={style.chatInfo}>
                <span>{data.user?.displayName}</span>
                <div className={style.chatIcons}>
                    <img src={Video} alt="" className={style.chatImg}/>
                    <img src={Add} alt="" className={style.chatImg}/>
                    <img src={More} alt="" className={style.chatImg}/>
                </div>
            </div>
            <div>
                <Messages></Messages>
                <Input></Input>
            </div>
        </div>
    );
};
export default Chat;