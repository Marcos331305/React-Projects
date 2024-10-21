import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ChatUi from "./components/ChatUi.jsx";

let isAuthenticated;

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
    path: "/chatUi",
    element: <ChatUi />
  }
  // {
  //   path: "/", // Parent route for protected routes
  //   element: <ProtectedRoute isAuthenticated={isAuthenticated} />, // Protected route wrapper
  //   children: [
  //     {
  //       path: "chatUi",
  //       element: <ChatUi />, // Nested protected route
  //     },
  //   ],
  // },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
