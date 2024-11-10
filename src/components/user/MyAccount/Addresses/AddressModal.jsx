import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { blue, grey } from '@mui/material/colors'
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
}
import {
  apiGetProvinces,
  apiGetDistricts,
  apiGetWards
} from '~/helpers/getAddress'

function AddressModal() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [province, setProvince] = useState('')
  const [listProvinces, setListProvinces] = useState([])

  const [district, setDistrict] = useState('')
  const [listDistrict, setListDistrict] = useState([])

  const [ward, setWard] = useState('')
  const [listWard, setListWard] = useState([])

  const [street, setStreet] = useState('')

  const handleChangeProvince = (e) => {
    setProvince(e.target.value)
  }

  const handleChangeDistrict = (e) => {
    setDistrict(e.target.value)
  }

  const handleChangeWard = (e) => {
    setWard(e.target.value)
  }

  const handleChangeStreet = (e) => {
    setStreet(e.target.value)
  }

  useEffect(() => {
    const fetchProvinces = async () => {
      setListProvinces(await apiGetProvinces())
    }
    fetchProvinces()
  }, [])

  useEffect(() => {
    const fetchDistricts = async () => {
      if (province.id) setListDistrict(await apiGetDistricts(province.id))
    }
    fetchDistricts()
  }, [province])

  useEffect(() => {
    const fetchWard = async () => {
      if (district.id) setListWard(await apiGetWards(district.id))
    }
    fetchWard()
  }, [district])
  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          display: 'flex',
          gap: '5px',
          fontSize: '14px',
          padding: '10px 20px',
          color: 'white',
          backgroundColor: blue[600]
        }}
      >
        <AddIcon /> Add new address
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Address
          </Typography>
          <FormControl
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '25px',
              marginTop: '30px'
            }}
          >
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <TextField label="Full Name" size="small"></TextField>
              <TextField label="Phone Number" size="small"></TextField>
            </Box>

            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">
                Province/city
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={province}
                label="Province/city"
                onChange={(e) => handleChangeProvince(e)}
              >
                {listProvinces.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item.full_name_en}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">District</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={district}
                label="District"
                onChange={(e) => handleChangeDistrict(e)}
              >
                {listDistrict.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item.full_name_en}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Ward</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={ward}
                label="Ward"
                onChange={(e) => handleChangeWard(e)}
              >
                {listWard.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item.full_name_en}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Street"
              size="small"
              value={street}
              onChange={(e) => handleChangeStreet(e)}
            ></TextField>

            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Set as Default Address"
            />

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
                gap: '10px'
              }}
            >
              <Button
                sx={{
                  backgroundColor: grey[200],
                  color: 'black',
                  padding: '5px 10px'
                }}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  backgroundColor: blue[600],
                  color: 'white',
                  padding: '5px 10px'
                }}
              >
                Submit
              </Button>
            </Box>
          </FormControl>
        </Box>
      </Modal>
    </div>
  )
}

export default AddressModal
