import { Box } from "@mui/material"
import theme from "./app"
import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection"


function App() {
  return (
    <Box sx={{
      fontFamily: theme.typography.fontFamily
    }}>
      <Navbar />
      <HeroSection />
    </Box>
  )
}

export default App
