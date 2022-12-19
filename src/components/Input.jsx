import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db, storage } from "../firebase";
import { v4 as uuid} from "uuid";
import attach from "../img/attachment (1).png";
import addImg from "../img/new (1).png";
import send from "../img/send (1).png";
import style from "./Input.module.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
const Input = ()=>{

    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    
    // const inputChangeHandler = (e) =>{
    //     if(e.target.value.trim().length === 0){
    //         return;
    //     }
    //     setText(e.target.value);
    // }

    const sendHandler = async () =>{
        if(text.trim().length === 0)
        {
            return;
        }
        if(img){
            const storageRef = ref(storage, uuid());
            const uploadTask = uploadBytesResumable(storageRef, img);
            uploadTask.on(
                (error) => {
                //   setErr(true);
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await updateDoc(doc(db, "chats", data.chatId),{
                        messages: arrayUnion({
                            id: uuid(),
                            text,
                            senderId: currentUser.uid,
                            date: Timestamp.now(), 
                            img: downloadURL,
                        }),
                    });
                });
              }
            );

        } else{
            await updateDoc(doc(db, "chats", data.chatId),{
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(), 
                }),
            });
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]:{
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        setText("");
        setImg(null);
    };
    return (
        <div className={style.input}>
            <input type="text" placeholder="Message something..." onChange={e =>setText(e.target.value)} value={text}/>
            <div className={style.send}>
                {/* <img src={attach} alt="" className={style.addIcons}/>
                <input type="file" style={{display:"none"}} id="file" onChange={e=>setImg(e.target.files[0]) } value={img} />
                <label htmlFor="file" className={style.addImgIcon}>
                    <img src={addImg} alt="" className={style.addIcons}/>
                </label> */}
                <button id="send" style={{display:"none"}} onClick={sendHandler}>Send</button>
                <label htmlFor="send" >
                <img src={send} alt="" className={style.addIcons}/>
                </label>
            </div>
        </div>
    );
};
export default Input;