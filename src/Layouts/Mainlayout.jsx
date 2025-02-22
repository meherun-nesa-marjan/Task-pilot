import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar";



const Mainlayout = () => {

    return (
        <div>
            
         <Outlet></Outlet> 
          
        </div>
    );
};

export default Mainlayout;