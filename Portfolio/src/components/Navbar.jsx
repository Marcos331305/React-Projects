import { Box, Typography } from '@mui/material'
import React from 'react'
import theme from '../app'

const Navbar = () => {
  return (
    <Box>
        <Typography sx={{
            fontFamily: theme.typography.fontFamily,
            fontWeight: 700
        }}>
            NavBar
        </Typography>
    </Box>
  )
}

export default Navbar