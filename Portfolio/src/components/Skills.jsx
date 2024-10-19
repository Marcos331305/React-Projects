import React from 'react'
import { Box, Typography, Grid2, Stack, Container } from '@mui/material'
import leafImg from '../assets/leaf.svg'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import theme from '../app'

const skillsData = [
    { name: 'HTML', level: 'Beginner' },
    { name: 'CSS', level: 'Intermediate' },
    { name: 'JavaScript', level: 'Advanced' },
    { name: 'TailwindCSS', level: 'Intermediate' },
    { name: 'React', level: 'Intermediate' },
    { name: 'Git', level: 'Advanced' },
];

const Skills = () => {
    return (
        <Box sx={{
            height: '100vh',
            mt: { xs: '80px', lg: '105px' }
        }}>
            {/* Skills Heading */}
            <Box>
                <Box sx={{
                    position: 'relative',
                }}>
                    <Typography sx={{
                        color: 'white',
                        fontWeight: 600,
                        fontSize: { xs: '40px', md: '60px' },
                        textAlign: 'center',
                        position: 'relative',
                        zIndex: 10
                    }}>Skills</Typography>
                    {/* Design Image */}
                    <Box sx={{
                        height: { xs: '32px', md: '50px' },
                        position: 'absolute',
                        top: { xs: '25px', md: '34px' },
                        left: { xs: '43%', md: '47%' }
                    }}>
                        <img height={'100%'} src={leafImg} alt="Design_Pattern_Img" />
                    </Box>
                </Box>
            </Box>
            {/* Skills Part */}
            <Box sx={{
                mt: '3.5rem',
                display: 'flex',
                justifyContent: 'center'
            }}>
                {/* Skill's Card */}
                <Box sx={{
                    bgcolor: 'white',
                    width: '600px',
                    border: '2px solid #C344B4',
                    borderRadius: '12px'
                }}>
                    <Grid2 container>
                        {/* Heading */}
                        <Grid2 size={12}>
                            <Typography sx={{
                                fontFamily: theme.typography.fontFamily,
                                textAlign: 'center',
                                fontWeight: 550
                            }}>Frontend Development</Typography>
                        </Grid2>
                        {/* Skills */}
                        <Grid2 container>
                            {/* First col */}
                            <Grid2>
                                <Stack spacing={2}>
                                    <Item>Item 1</Item>
                                    <Item>Item 2</Item>
                                    <Item>Item 3</Item>
                                </Stack>
                            </Grid2>
                            {/* Second col */}
                            <Grid2>
                                <Stack spacing={2}>
                                    <Item>Item 1</Item>
                                    <Item>Item 2</Item>
                                    <Item>Item 3</Item>
                                </Stack>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </Box>
            </Box>
        </Box>
    )
}

export default Skills