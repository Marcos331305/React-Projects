import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/HomePage/Home'
import Paste from './components/PastesPage/Pastes'
import ViewPaste from './components/PasteViewPage/ViewPaste'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/pastes',
    element: <Paste />
  },
  {
    path: '/pastes/:id',
    element: <ViewPaste />
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
