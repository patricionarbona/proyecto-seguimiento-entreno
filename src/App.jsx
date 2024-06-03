import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Registrar from './pages/Registrar.jsx';
import Login from './pages/Login.jsx';
import FrontPage from './pages/FrontPage.jsx';
import AddExercise from './pages/AddExercise.jsx';
import MakeTrain from "./pages/MakeTrain.jsx"
import { Toaster } from 'react-hot-toast';
import Entrenos from './pages/Entrenos.jsx';
import { MainContextProvider } from './context/MainContext.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />
  },
  {
    path: "/registrar",
    element: <Registrar />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/front-page",
    element: <FrontPage />
  },
  {
    path: "/add-exercise",
    element: <AddExercise />
  },
  {
    path: "/make-train",
    element: <MakeTrain />
  },
  {
    path: "/my-trains",
    element: <Entrenos />
  }
]);

function App() {
  return (
    <>
    <MainContextProvider>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </MainContextProvider>
    </>
  );
}

export default App;
