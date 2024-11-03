import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import TalkerUi from "./components/talker/TalkerUi.jsx";
import Mailverification from "./components/MailVerification.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />, // Public Route
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
    element: (
      <ProtectedRoute>
        <TalkerUi />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "", // Matches "/talker"
        element: <TalkerUi />
      },
      {
        path: "c/:conversationId", // Matches "/talker/c/:conversationId"
        element: <TalkerUi />
      }
    ]
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