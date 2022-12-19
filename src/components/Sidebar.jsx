import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import style from "./Sidebar.module.css";
const Sidebar = ()=>{
    return (
        <div className={style.sidebar}>
            <Navbar></Navbar>
            <Search></Search>
            <Chats></Chats>
        </div> 
    );
};
export default Sidebar;