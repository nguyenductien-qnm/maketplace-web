import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import PasswordIcon from '@mui/icons-material/Password'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import BlockIcon from '@mui/icons-material/Block'
import capitalizeFirstLetter from '~/utils/capitalizeFirstLetter'
import { renderDefault } from '~/components/common/common'

const COLOR_GENDER_MAP = { male: '#1976d2', female: '#ec407a' }

function UserRow({ user, USER_TABLE_MAP, handleOpenModal }) {
  const renderGender = (_, key) => {
    const value = user?.[key]
    if (!value) return '—'

    return (
      <Chip
        label={capitalizeFirstLetter(value)}
        size="small"
        variant="outlined"
        sx={{
          borderColor: COLOR_GENDER_MAP[value],
          color: COLOR_GENDER_MAP[value],
          width: '70px',
          fontWeight: 500
        }}
      />
    )
  }

  const renderRole = (_, key) => {
    const isShop = user?.[key].includes('SHOP')
    return (
      <Chip
        label={isShop ? 'Yes' : 'No'}
        size="small"
        color={isShop ? 'success' : 'default'}
        sx={{ width: '40px' }}
      />
    )
  }

  const renderDetailButton = () => (
    <Tooltip title="View detail info">
      <Box
        sx={{ '&:hover': { cursor: 'pointer' } }}
        onClick={() => handleOpenModal({ action: 'detail', user })}
      >
        <InfoOutlinedIcon />
      </Box>
    </Tooltip>
  )

  const renderActionButton = () => {
    switch (user?.user_status) {
      case 'active':
        return (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'nowrap' }}>
            <Tooltip title="Ban user">
              <Button
                className="btn-admin-user-action"
                color="error"
                variant="outlined"
                onClick={() => handleOpenModal({ action: 'ban', user })}
              >
                <BlockIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Update password">
              <Button
                className="btn-admin-user-action"
                color="success"
                variant="outlined"
                onClick={() =>
                  handleOpenModal({ action: 'update-password', user })
                }
              >
                <PasswordIcon />
              </Button>
            </Tooltip>
          </Box>
        )

      case 'blocked':
        return (
          <Tooltip title="Unban user">
            <Button
              className="btn-admin-user-action"
              variant="outlined"
              onClick={() => handleOpenModal({ action: 'unban', user })}
            >
              <LockOpenIcon />
            </Button>
          </Tooltip>
        )

      case 'pending_setup':
        return <Chip label="Pending setup" size="small" />

      default:
        return null
    }
  }

  const RENDER_MAP = {
    user_gender: renderGender,
    user_role: renderRole,
    detail: renderDetailButton,
    action: renderActionButton
  }

  return (
    <TableRow
      key={user._id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      {USER_TABLE_MAP?.map(({ key }) => (
        <TableCell key={key} align="left">
          {RENDER_MAP?.[key]
            ? RENDER_MAP[key]?.(user, key)
            : renderDefault(user, key)}
        </TableCell>
      ))}
    </TableRow>
  )
}
export default UserRow
