import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import style from "./Home.module.css";
const Home = ()=>{
    return (
        <div className={style.home}>
            <div className={style.container}>
               <Sidebar></Sidebar>
               <Chat></Chat>
            </div>  
        </div>
    );
};
export default Home;