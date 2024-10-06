import { Box } from "@mui/material"
import theme from "./app"
import Navbar from "./components/Navbar"


function App() {
  return (
    <Box sx={{
      fontFamily: theme.typography.fontFamily
    }}>
      <Navbar />
    </Box>
  )
}

export default App
