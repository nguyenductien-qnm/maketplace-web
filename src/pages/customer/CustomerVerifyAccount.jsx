import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined'
import { styled } from '@mui/material'
import { green, red } from '@mui/material/colors'
import { useUserVerifyAccount } from '~/hooks/user/user.hook'

const BoxCustom = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '20px'
})

function CustomerVerifyAccount() {
  const { state } = useUserVerifyAccount()

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
      {state === 'pending' && (
        <Box>
          <BoxCustom>
            <CircularProgress />
          </BoxCustom>
          <Typography>Pending verify account...</Typography>
        </Box>
      )}

      {state == 'success' && (
        <Box>
          <BoxCustom>
            <CheckCircleOutlineOutlinedIcon
              sx={{ fontSize: '40px', color: green[600] }}
            />
          </BoxCustom>
          <Typography>Active account success</Typography>
        </Box>
      )}

      {state === 'failure' && (
        <Box>
          <BoxCustom>
            <ThumbDownOffAltOutlinedIcon
              sx={{ fontSize: '40px', color: red[600] }}
            />
          </BoxCustom>
          <Typography>Active account failure</Typography>
        </Box>
      )}
    </Box>
  )
}

export default CustomerVerifyAccount
