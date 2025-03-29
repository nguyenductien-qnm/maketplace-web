import { Breadcrumbs, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function CustomBreadcrumbs({ breakCrumbs }) {
  const [customBreadCrumbs, setCustomBreadCrumbs] = useState([])

  useEffect(() => {
    setCustomBreadCrumbs(
      breakCrumbs?.map((i, index) => {
        const isLast = index === breakCrumbs.length - 1
        return isLast ? (
          <Typography key={i._id} color="text.primary">
            {i.name}
          </Typography>
        ) : (
          <Link key={i.url} underline="hover" color="inherit" to={i.url}>
            {i.name}
          </Link>
        )
      })
    )
  }, [breakCrumbs])

  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb">
      {customBreadCrumbs}
    </Breadcrumbs>
  )
}

export default CustomBreadcrumbs
