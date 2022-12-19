import React, { useState } from "react";
import style from "./Register.module.css";
import Add from "../img/add-image.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

const Register = () =>{
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (e) =>{
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
            
        if(displayName.trim().length===0 || email.trim().length===0 || password.trim().length===0)
        {
            return
        }
        
        try{
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
            (error) => {
              setErr(true);
            }, 
            () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                await updateProfile(res.user,{
                    displayName,
                    photoURL: downloadURL,
                });
                await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    displayName,
                    email,
                    photoURL: downloadURL,
                });   
                await setDoc(doc(db, "userChats", res.user.uid),{});
                navigate("/");
            });
          }
        );
     } catch(err){
        setErr(true);
       }
    }

    return (
        <div className={style['form-container']}>
            <div className={style['form-wrapper']}>
                <form onSubmit={submitHandler}>
                    <span className={style.logo}>ChatBUZZ</span>
                    <span className={style.title}>Register</span>
                    <input type="text" placeholder="display name"/>
                    <input type="email" placeholder = "email"/>
                    <input type="password" placeholder="password"/>
                    <input type="file" id="file" style={{display:"none"}}/>
                    <label htmlFor="file">
                        <img src={Add} alt="" className={style.addImg}/>
                        <span>Add an avatar</span>
                    </label>
                    <button className={style.button}>Sign up</button>
                    {err && <span>Something went wrong.</span>}
                    <p>You do not have an account? <Link to="/login">Login</Link> </p>
                </form>
            </div>
        </div>
    );
} 
export default Register;