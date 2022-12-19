import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import style from "./Navbar.module.css";
const Navbar = ()=>{
    const { currentUser } = useContext(AuthContext);
    return (
        <div className={style.navbar}>
            <span className={style.logo}>ChatBUZZ</span>
            <div className={style.user}>
                <img src= {currentUser.photoURL} alt=""/>
                <span>{currentUser.displayName}</span>
                <button className={style.button} onClick={() =>signOut(auth)}>logout</button>
            </div>
        </div>
    );
};
export default Navbar;