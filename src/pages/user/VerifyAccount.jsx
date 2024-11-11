import { Box, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import { green, red } from '@mui/material/colors'
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined'
import { verifyAccount } from '~/redux/user.slice'
import { useDispatch } from 'react-redux'

function VerifyAccount() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const otp = useParams()
  const [stateVerify, setStateVerify] = useState('pending')

  useEffect(() => {
    const verifyAndNavigate = async () => {
      const res = await dispatch(verifyAccount(otp))
      if (res?.payload?.status !== 200) {
        setStateVerify('failure')
      } else {
        setStateVerify('success')
        setTimeout(() => {
          navigate('/setup-account')
        }, 2000)
      }
    }

    verifyAndNavigate()
  }, [])

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      {stateVerify === 'pending' && (
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '20px'
            }}
          >
            <CircularProgress />
          </Box>
          <Typography>Pending verify account...</Typography>
        </Box>
      )}

      {stateVerify == 'success' && (
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '20px'
            }}
          >
            <CheckCircleOutlineOutlinedIcon
              sx={{ fontSize: '40px', color: green[600] }}
            />
          </Box>
          <Typography>Active account success</Typography>
        </Box>
      )}

      {stateVerify === 'failure' && (
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '20px'
            }}
          >
            <ThumbDownOffAltOutlinedIcon
              sx={{ fontSize: '40px', color: red[600] }}
            />
          </Box>
          <Typography>Active account failure</Typography>
        </Box>
      )}
    </Box>
  )
}

export default VerifyAccount
