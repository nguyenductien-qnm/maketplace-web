import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined'
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import capitalizeFirstLetter from '~/utils/capitalizeFirstLetter'
import { renderDefault } from '~/components/common/common'

const COLOR_ROLE_MAP = { shop: '#1976d2', admin: '#d32f2f' }

function VoucherRow({
  status,
  voucher,
  handleOpenModal,
  handleOpenForm,
  VOUCHER_TABLE_MAP
}) {
  const canUpdate = ['ACTIVE', 'NOT_STARTED'].includes(status)

  const renderType = (key) => {
    const value = voucher?.[key]
    return (
      <Chip
        label={value === 'percent' ? 'Percent' : 'Fixed amount'}
        variant="outlined"
      />
    )
  }

  const renderCreatorRole = (key) => {
    const value = voucher?.[key]
    return (
      <Chip
        label={capitalizeFirstLetter(value)}
        size="small"
        variant="outlined"
        sx={{
          borderColor: COLOR_ROLE_MAP[value],
          color: COLOR_ROLE_MAP[value],
          width: '60px'
        }}
      />
    )
  }

  const renderActionButton = () => {
    if (canUpdate && voucher.voucher_creator_role === 'admin') {
      return (
        <Tooltip title="Update">
          <Button
            className="btn-admin-voucher-action"
            variant="outlined"
            onClick={() => handleOpenForm({ action: 'update', voucher })}
          >
            <EditOutlinedIcon />
          </Button>
        </Tooltip>
      )
    }

    if (voucher.voucher_creator_role === 'shop') {
      return (
        <Box>
          {voucher?.voucher_disable == false && (
            <Tooltip title="Disable">
              <Button
                className="btn-admin-voucher-action"
                variant="outlined"
                color="error"
                onClick={() => handleOpenModal({ action: 'disable', voucher })}
              >
                <NotInterestedOutlinedIcon />
              </Button>
            </Tooltip>
          )}
          {voucher?.voucher_disable == true && (
            <Tooltip title="Enable">
              <Button
                className="btn-admin-voucher-action"
                variant="outlined"
                color="success"
                onClick={() => handleOpenModal({ action: 'enable', voucher })}
              >
                <ReplayOutlinedIcon />
              </Button>
            </Tooltip>
          )}
        </Box>
      )
    }
  }

  const renderDetailButton = () => (
    <Tooltip title="View detail info">
      <Box
        sx={{ '&:hover': { cursor: 'pointer' } }}
        onClick={() => {
          handleOpenModal({ action: 'detail', voucher })
        }}
      >
        <InfoOutlinedIcon />
      </Box>
    </Tooltip>
  )

  const RENDER_MAP = {
    voucher_type: renderType,
    voucher_creator_role: renderCreatorRole,
    detail: renderDetailButton,
    action: renderActionButton
  }

  return (
    <TableRow
      key={voucher._id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      {VOUCHER_TABLE_MAP?.map(({ key }) => (
        <TableCell align="left" key={key}>
          {RENDER_MAP?.[key]
            ? RENDER_MAP[key]?.(key)
            : renderDefault(voucher, key)}
        </TableCell>
      ))}
    </TableRow>
  )
}
export default VoucherRow
