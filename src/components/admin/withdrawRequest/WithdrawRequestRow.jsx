import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import DoneIcon from '@mui/icons-material/Done'
import BlockIcon from '@mui/icons-material/Block'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import {
  renderAmount,
  renderCapitalizeFirstLetter,
  renderDefault
} from '~/components/common/common'

function WithdrawRequestRow({
  request,
  handleOpenModal,
  handleApproveWithdrawRequest,
  WITHDRAW_REQUEST_TABLE_MAP
}) {
  const renderDetailButton = () => (
    <Tooltip title="View detail info">
      <Box
        sx={{ '&:hover': { cursor: 'pointer' } }}
        onClick={() => handleOpenModal({ action: 'detail', request })}
      >
        <InfoOutlinedIcon />
      </Box>
    </Tooltip>
  )

  const renderActionButton = () => {
    {
      request?.status === 'pending' && (
        <Box>
          <Tooltip title="Approve request">
            <Button
              variant="contained"
              sx={{ mr: 1 }}
              onClick={() => handleApproveWithdrawRequest(request)}
            >
              <DoneIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Reject request">
            <Button
              variant="contained"
              color="error"
              onClick={() => handleOpenModal({ action: 'reject', request })}
            >
              <BlockIcon />
            </Button>
          </Tooltip>
        </Box>
      )
    }
  }

  const RENDER_MAP = {
    paypal_email: renderDefault,
    payment_method: renderCapitalizeFirstLetter,
    amount: renderAmount,
    status: renderCapitalizeFirstLetter,
    createdAt: renderDefault,
    processed_at: renderDefault,
    detail: renderDetailButton,
    action: renderActionButton
  }

  return (
    <TableRow
      key={request?._id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      {WITHDRAW_REQUEST_TABLE_MAP?.map(({ key }) => (
        <TableCell align="left" key={key}>
          {RENDER_MAP?.[key]
            ? RENDER_MAP[key]?.(request, key)
            : renderDefault(request, key)}
        </TableCell>
      ))}
    </TableRow>
  )
}

export default WithdrawRequestRow
