import { useState, useContext } from "react";
import style from "./Search.module.css";
import { collection, query, where, getDoc, setDoc, doc, updateDoc, serverTimestamp, getDocs} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
const Search = ()=>{

    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const {currentUser} = useContext(AuthContext);
    const searchHandler = async () =>{
        const q = query( collection(db, "users"), where("displayName", "==", username));
        try{
            const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) =>{
            setUser(doc.data())
        });
        }
        catch(err){
            setErr(true);
        }
    };
    const keyHandler = (e) =>{
        e.code === "Enter" && searchHandler();
    };
    const selectHandler = async () =>{
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        try{
            const res = await getDoc(doc(db, "chats", combinedId));

            if(!res.exists()){
                await setDoc(doc(db, "chats", combinedId), { messages: [] });

                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId+".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId+".date"]: serverTimestamp(),
                });

                await updateDoc(doc(db, "userChats", user.uid),{
                    [combinedId+".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combinedId+".date"]: serverTimestamp()
                }); 
            }

        } catch(err){

        }
        setUser(null);
        setUsername("");
    };
    return ( 
        <div className={style.search}>
            <div className={style.searchForm}>
                <input type="text" placeholder="Find your friends" onKeyDown={keyHandler} onChange={e => setUsername(e.target.value)} value={username}/>
            </div>
            {err && <span>User not found!</span>}
            {user && <div className={style.userChat} onClick={selectHandler}>
                <img src={user.photoURL} className={style.userImg} alt=""/>
                <div className={style.userchatInfo}>
                    <span>{user.displayName}</span>
                </div>
            </div>}
        </div>
    );
};
export default Search;