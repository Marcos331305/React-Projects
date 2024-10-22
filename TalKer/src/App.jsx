import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import TalkerUi from "./components/TalkerUi.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />, // Publice Route
  },
  {
    path: "/signUp",
    element: <SignUp />
  },
  {
    path: "/talker",
    element: (
      <ProtectedRoute>
        <TalkerUi /> // Protected Route for TalkerUi component
      </ProtectedRoute>
    )
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
