import style from "./Login.module.css";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
const Login = () =>{

    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (e) =>{
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        try{
           await signInWithEmailAndPassword(auth, email, password);
           navigate("/");
        }
        catch(err){
        setErr(true);
       }
    }


    return (
        <div className={style['form-container']}>
            <div className={style['form-wrapper']}>
                <form onSubmit={submitHandler}>
                    <span className={style.logo}>ChatBUZZ</span>
                    <span className={style.title}>Login</span>
                    <input type="email" placeholder = "email"/>
                    <input type="password" placeholder="password"/>
                    <button className={style.button}>Sign in</button>
                    {err && <span>Something went wrong.</span>}
                    <p>You do not have an account? <Link to="/register">Register</Link> </p>
                </form>
            </div>
        </div>
    );
} 
export default Login;