import Grid from '@mui/material/Grid2'
import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import settingCarousel from '~/components/common/Carousel/SettingCarousel'
import Slider from 'react-slick'

function Categories() {
  return (
    <Box sx={{ marginTop: '30px', position: 'relative' }}>
      <Slider {...settingCarousel}>
        {Array.from({ length: 12 }, (_, index) => (
          <div key={index}>
            <Grid container spacing={2}>
              <Grid xl={2} style={{ margin: '0 10px' }}>
                <Box
                  sx={{
                    maxWidth: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '5px',
                    padding: '10px',
                    backgroundColor: grey[100]
                  }}
                >
                  <img
                    style={{ width: '70%' }}
                    src="https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260@resize_w640_nl.webp"
                  />
                  <Typography sx={{ fontSize: '13px', fontWeight: '700' }}>
                    Đồng Hồ
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </div>
        ))}
      </Slider>
    </Box>
  )
}
export default Categories
