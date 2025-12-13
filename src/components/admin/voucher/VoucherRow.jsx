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
import { Avatar, Typography } from '@mui/material'
import { getVoucherStatus } from '~/utils/voucherStatus'
import { VOUCHER_STATUS } from '~/constant/voucherStatus.const'
import BlockIcon from '@mui/icons-material/Block'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { blue, green, grey, orange, red } from '@mui/material/colors'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
const COLOR_ROLE_MAP = { shop: '#1976d2', admin: '#d32f2f' }
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined'

function VoucherRow({
  voucher,
  handleOpenModal,
  handleOpenForm,
  VOUCHER_TABLE_MAP
}) {
  const voucherStatus = getVoucherStatus({
    start: voucher.voucher_start_date,
    end: voucher.voucher_end_date
  })

  const creatorRole = voucher.voucher_creator_role

  const renderChip = (key) => {
    const containedValue = {
      fixed_amount: 'Fixed',
      private: 'Private'
    }
    const outlinedValue = {
      percent: 'Percent',
      public: 'Public'
    }

    const value = voucher?.[key]

    return (
      <Chip
        variant={containedValue[value] ? 'contained' : 'outlined'}
        label={containedValue[value] || outlinedValue[value] || value}
        sx={{ width: '70px' }}
      />
    )
  }
  // if (voucher.voucher_creator_role === 'shop') {
  //   return (
  //     <Box>
  //       {voucher?.voucher_disable == false && (
  //         <Tooltip title="Disable">
  //           <Button
  //             className="btn-admin-voucher-action"
  //             variant="outlined"
  //             color="error"
  //             onClick={() => handleOpenModal({ action: 'disable', voucher })}
  //           >
  //             <NotInterestedOutlinedIcon />
  //           </Button>
  //         </Tooltip>
  //       )}
  //       {voucher?.voucher_disable == true && (
  //         <Tooltip title="Enable">
  //           <Button
  //             className="btn-admin-voucher-action"
  //             variant="outlined"
  //             color="success"
  //             onClick={() => handleOpenModal({ action: 'enable', voucher })}
  //           >
  //             <ReplayOutlinedIcon />
  //           </Button>
  //         </Tooltip>
  //       )}
  //     </Box>
  //   )
  // }
  const renderActionButton = () => (
    <Box
      sx={{
        display: 'flex',
        gap: 1
      }}
    >
      {/* view  */}
      <Tooltip title="View detail this voucher">
        <RemoveRedEyeOutlinedIcon
          onClick={() => {
            handleOpenModal({ action: 'detail', voucher })
          }}
          sx={{
            color: grey[500],
            fontSize: 24,
            '&:hover': {
              cursor: 'pointer',
              color: grey[800]
            }
          }}
        />
      </Tooltip>

      {/* update  */}
      {voucherStatus != 'EXPIRED' && creatorRole == 'admin' && (
        <Tooltip title="Edit this voucher">
          <ModeOutlinedIcon
            onClick={() => handleOpenForm({ action: 'update', voucher })}
            sx={{
              fontSize: 24,
              color: blue[300],
              '&:hover': {
                cursor: 'pointer',
                color: blue[700]
              }
            }}
          />
        </Tooltip>
      )}

      {/* delete  */}
      {voucherStatus == 'UPCOMING' && creatorRole == 'admin' && (
        <Tooltip title="Permanently delete this voucher">
          <HighlightOffOutlinedIcon
            onClick={() => {
              handleOpenConfirmDialog(voucher)
            }}
            sx={{
              fontSize: 24,
              color: red[300],
              '&:hover': {
                cursor: 'pointer',
                color: red[700]
              }
            }}
          />
        </Tooltip>
      )}

      {/* ban  */}
      {voucherStatus != 'EXPIRED' &&
        creatorRole == 'shop' &&
        !voucher.voucher_disable && (
          <Tooltip title="Ban this voucher">
            <BlockOutlinedIcon
              onClick={() => handleOpenModal({ action: 'disable', voucher })}
              sx={{
                fontSize: 24,
                color: orange[500],
                '&:hover': {
                  cursor: 'pointer',
                  color: orange[900]
                }
              }}
            />
          </Tooltip>
        )}

      {/* unban  */}

      {voucherStatus != 'EXPIRED' && voucher.voucher_disable && (
        <Tooltip title="Unban this voucher">
          <ReplayOutlinedIcon
            sx={{ '&:hover': { cursor: 'pointer' } }}
            color="success"
            onClick={() => handleOpenModal({ action: 'enable', voucher })}
          />
        </Tooltip>
      )}
    </Box>
  )

  const renderVoucher = () => (
    <>
      <Chip
        label={VOUCHER_STATUS[voucherStatus].label}
        variant="outlined"
        sx={{
          width: '82px',
          borderColor: VOUCHER_STATUS[voucherStatus].color,
          color: VOUCHER_STATUS[voucherStatus].color,
          backgroundColor: 'transparent',
          height: 25,
          borderRadius: '5px',
          fontWeight: 500,
          mb: 1
        }}
      />
      <Typography
        variant="body2"
        sx={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          wordBreak: 'break-word',
          fontWeight: 'bold'
        }}
      >
        {voucher?.voucher_name}
      </Typography>
      <Typography variant="caption" sx={{ color: 'grey' }}>
        CODE: {voucher?.voucher_code}
      </Typography>
    </>
  )

  const renderActivePeriod = () => (
    <>
      <Typography variant="body2" sx={{ mb: 1 }}>
        {voucher?.voucher_start_date}
      </Typography>
      <Typography variant="body2">{voucher?.voucher_end_date}</Typography>
    </>
  )

  const renderCreator = () => {
    const creator =
      voucher?.voucher_creator_role == 'admin'
        ? voucher.admin_creator
        : voucher.shop_creator

    return (
      <>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Avatar
            sx={{ height: '50px', width: '50px' }}
            src={creator.creator_avatar}
          />
          <Box>
            <Chip
              label={capitalizeFirstLetter(creatorRole)}
              size="small"
              variant="outlined"
              sx={{
                borderColor: COLOR_ROLE_MAP[creatorRole],
                color: COLOR_ROLE_MAP[creatorRole],
                width: '60px',
                mb: 1,
                borderRadius: '5px',
                fontSize: '12px'
              }}
            />
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {creator.creator_name}
            </Typography>
            <Typography variant="caption" sx={{ color: 'grey' }}>
              {creator.creator_code}
            </Typography>
          </Box>
        </Box>
      </>
    )
  }

  const renderDisable = () => (
    <>
      {voucher.voucher_disable ? (
        <Tooltip title="Disabled due to violation">
          <BlockIcon color="error" />
        </Tooltip>
      ) : (
        <Tooltip title="Active">
          <CheckCircleIcon color="success" />
        </Tooltip>
      )}
    </>
  )

  const RENDER_MAP = {
    creator: renderCreator,
    active_period: renderActivePeriod,
    voucher_name: renderVoucher,
    voucher_type: renderChip,
    voucher_visibility: renderChip,
    voucher_disable: renderDisable,
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
