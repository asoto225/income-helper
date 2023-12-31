import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import Home from './pages/Home.jsx'
import Error from './pages/Error.jsx'
import Dashboard from './pages/Dashboard.jsx'
import CreateAccount from './pages/CreateAccount.jsx'
import AddIncomePage from './pages/AddIncomePage.jsx'
import AddExpensePage from './pages/AddExpensePage.jsx'
import EditIncomePage from './pages/EditIncomePage.jsx'
import EditExpensePage from './pages/EditExpensePage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/createAccount',
        element: <CreateAccount />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/addIncome',
        element: <AddIncomePage />,
      },
      {
        path: '/addExpense',
        element: <AddExpensePage />,
      },
      {
        path: '/editIncomePage/:id',
        element: <EditIncomePage />,
      },
      {
        path: '/editExpensePage/:id',
        element: <EditExpensePage/>
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
