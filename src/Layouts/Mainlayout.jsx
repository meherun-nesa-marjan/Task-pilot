import { Outlet } from "react-router-dom";



const Mainlayout = () => {

    return (
        <div className="dark:bg-slate-800 ">
            
         <Outlet></Outlet> 
          
        </div>
    );
};

export default Mainlayout;