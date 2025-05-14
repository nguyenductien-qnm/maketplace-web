import React from 'react'
import { Box, Button, TextField, Typography, Paper } from '@mui/material'
import { orange } from '@mui/material/colors'
import bevesiLogo from '~/assets/user/img/logo.png'
const AdminLogin = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Left side: Logo */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <img src={bevesiLogo} alt="logo" style={{ width: 400 }} />
      </Box>

      <Box
        sx={{
          flex: 1,
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Paper elevation={0} sx={{ width: 360, p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" textAlign="center">
              Log in to your account
            </Typography>
            <Typography
              variant="body2"
              textAlign="center"
              color="text.secondary"
            >
              Welcome back! Please enter your details.
            </Typography>
            <TextField label="Email" variant="outlined" fullWidth />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: 'pointer' }}
              >
                Forgot password
              </Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: orange[600], color: 'white' }}
            >
              Sign in
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

export default AdminLogin
