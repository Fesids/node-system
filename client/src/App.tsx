import { useContext, useReducer, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './style.scss'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import axios from 'axios'
import { Layout } from './Components/Layout'
import { RegisterPage } from './Pages/RegisterPage'
import { LoginPage } from './Pages/LoginPage'
import { DepartmentPage } from './Pages/DepartmentsPage'
import { DepartmentDetail } from './Pages/DepartmentDetailPage'
import { SearchDepartmentPage } from './Pages/SearchUser'
import { Home } from './Pages/Home'
import { STDetail } from './Pages/STDetail'
import { ClientRequestDetailPage } from './Pages/ClientRequestDetailPage'
import { RequestDetailPage } from './Pages/RequestDetailPage'
import { CreateRequestPage } from './Pages/CreateRequestPage'
import { ChatPage } from './Pages/Chat/Chat'
import { AppContext } from './Context/AppContext'
import { ChatDetailPage } from './Pages/Chat/ChatDetail'


axios.defaults.baseURL = "http://localhost:8080/"



const routes = createBrowserRouter([
  {

    
    path: "",
    element: <Layout/>,
    children: [
      {
        path: "",
        element:<Home/>
      },
      {
        path: "/teste",
        element: "testzin"
      },

      // AUTH ROUTES
      {
        path: "/register",
        element: <RegisterPage/>
      },

      {
        path: "/login",
        element: <LoginPage/>
      },
      
      {
        path: "/departments",
        element: <DepartmentPage/>,
        /*children:[
          {
            path: ":detail/:id",
            element: <DepartmentDetail/>
          }
        ]*/
      },

      {
        path: "/departments/detail/:id",
        element: <DepartmentDetail/>
      },

      {
        path: "/departments/search",
        element: <SearchDepartmentPage/>
      },
      {
        path: "/type/detail/:id",
        element: <STDetail/>
      },

      {
        path: "/departments/:dept_name/clientRequests/:id",
        element: <ClientRequestDetailPage/>
      },
      {
        path: "/departments/:dept_name/requests/:id",
        element: <RequestDetailPage/>
      },
      {
        path: "/departments/:dept_id/request/new",
        element: <CreateRequestPage/>
      },

      {
        path: "/chat",
        element: <ChatPage/>
      },
      {
        path: "/chat/conversation/:userId",
        element: <ChatDetailPage/>
      }

      
    ]
  }
])
      
/*const routes = createBrowserRouter([
  {
    path: "",
    element: <Layout/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path: "/add",
        element: <AddNewEmployee/>
      },
      {
        path: "/detail/:id",
        element: <DetailEmployee/>
      },{
        path: "/update/:id",
        element: <UpdateEmployee/>
      },{
        path: "/register",
        element: <Register/>
      }
    ]
  }
])*/

function App() {
  
  
  return(
   //<RouterProvider router={routes}/>
   
    <RouterProvider router={routes}/>
   
   
  )

  
}

export default App
