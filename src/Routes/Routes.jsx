import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Layouts/Mainlayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddTask from "../Pages/AddTask";
import Home from "../Pages/Home";
import TaskManager from "../Pages/TaskManager";
import PrivateRoutes from "./PrivateRoutes";
import NotFound from "../Pages/NotFound";

const Routes = createBrowserRouter([
  {
    path: "/",

    element: <Mainlayout />,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/", 
        element: <Login />,
      },
      {
        path: "task-manager", 
        element: <PrivateRoutes><Home /></PrivateRoutes>,
        children: [
          {
            path: "/task-manager", 
            element: <PrivateRoutes><TaskManager /></PrivateRoutes>,
           },
          {
            path: "add-task", 
            element: <PrivateRoutes><AddTask /></PrivateRoutes>,
          },
        ],
      },
      
      {
        path: "/registration", 
        element: <Register />,
      },
    ],
  },
]);

export default Routes;
