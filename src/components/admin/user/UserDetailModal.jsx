import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import TypographyLabel from '~/components/common/TypographyLabel'
import capitalizeFirstLetter from '~/utils/capitalizeFirstLetter'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

function UserDetailModal({ open, onClose, user }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>User Detail</DialogTitle>
      <DialogContent>
        {!user && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 5
            }}
          >
            <CircularIndeterminate />
          </Box>
        )}

        {user && (
          <Box>
            <Avatar src={user?.user_avatar} />
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Full name</TypographyLabel>
                <TextField
                  size="small"
                  value={user?.user_name}
                  disabled
                  fullWidth
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Email</TypographyLabel>
                <TextField
                  size="small"
                  value={user?.user_email}
                  disabled
                  fullWidth
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Phone</TypographyLabel>
                <TextField
                  size="small"
                  value={user?.user_phone || 'NAN'}
                  disabled
                  fullWidth
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Status</TypographyLabel>
                <TextField
                  size="small"
                  value={capitalizeFirstLetter(user?.user_status)}
                  disabled
                  fullWidth
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Gender</TypographyLabel>
                <TextField
                  size="small"
                  value={capitalizeFirstLetter(user?.user_gender) || 'NAN'}
                  disabled
                  fullWidth
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Date of birth</TypographyLabel>
                <TextField
                  size="small"
                  value={user?.user_date_of_birth || 'NAN'}
                  disabled
                  fullWidth
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Role</TypographyLabel>
                <TextField
                  size="small"
                  value={user?.user_role}
                  disabled
                  fullWidth
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Created at</TypographyLabel>
                <TextField
                  size="small"
                  value={user?.createdAt}
                  disabled
                  fullWidth
                />
              </Box>
            </Box>

            {user?.user_status === 'banned' && (
              <>
                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                  <Box sx={{ flex: 1 }}>
                    <TypographyLabel>Banned By</TypographyLabel>
                    <TextField
                      size="small"
                      value={user?.ban_info?.banned_by}
                      disabled
                      fullWidth
                    />
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <TypographyLabel>Banned Email</TypographyLabel>
                    <TextField
                      size="small"
                      value={user?.ban_info?.banned_email}
                      disabled
                      fullWidth
                    />
                  </Box>
                </Box>

                <Box sx={{ mt: 1 }}>
                  <Box sx={{ flex: 1 }}>
                    <TypographyLabel>Banned At</TypographyLabel>
                    <TextField
                      value={user?.ban_info?.banned_at}
                      size="small"
                      disabled
                      fullWidth
                    />
                  </Box>
                </Box>

                <Box sx={{ mt: 1 }}>
                  <Box sx={{ flex: 1 }}>
                    <TypographyLabel>Reason</TypographyLabel>
                    <ReactQuill
                      theme="snow"
                      value={user?.ban_info?.reason}
                      style={{ height: '200px' }}
                    />
                  </Box>
                </Box>
              </>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserDetailModal
