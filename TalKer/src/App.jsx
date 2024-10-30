import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import TalkerUi from "./components/TalkerUi.jsx";
import Mailverification from "./components/MailVerification.jsx";

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
    path: "/verifyMail",
    element: <Mailverification />
  },
  {
    path: "/talker",
    element: ( // Protection for this component using ProtectedRouted component
      <ProtectedRoute>
        <TalkerUi />
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