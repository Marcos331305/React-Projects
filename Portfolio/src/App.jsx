import { Box } from "@mui/material"
import theme from "./app"
import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection"
import AboutMe from "./components/AboutMe"


function App() {
  return (
    <Box sx={{
      fontFamily: theme.typography.fontFamily
    }}>
      <Navbar />
      <HeroSection />
      <AboutMe />
    </Box>
  )
}

export default App
