import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Layouts/Mainlayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddTask from "../Pages/AddTask";
import Home from "../Pages/Home";
import TaskManager from "../Pages/TaskManager";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        path: "home", 
        element: <Home />,
        children: [
          {
            path: "/home", 
            element: <TaskManager />,
           },
          {
            path: "add-task", 
            element: <AddTask />,
          },
        ],
      },
      {
        path: "login", 
        element: <Login />,
      },
      {
        path: "registration", 
        element: <Register />,
      },
    ],
  },
]);

export default Routes;
