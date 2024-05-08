import './App.css'
import Login from './components/Login/Login.jsx'
import ExerciseSelector from './components/ExerciseSelector/ExerciseSelector.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from "./pages/HomePage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import SelectorPage from "./pages/SelectorPage.jsx"
import EntrenosPage from "./pages/EntrenosPage.jsx"
import NotFoundPage from "./pages/NotFoundPage.jsx"

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>,
    errorElement: <NotFoundPage/>
  },
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: '/selector',
    element: <SelectorPage/>
  },
  {
    path: '/entrenos',
    element: <EntrenosPage/>
  }
])


function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
