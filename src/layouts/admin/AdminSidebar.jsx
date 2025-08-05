import React, { useState } from 'react'
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Paper
} from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined'
import logoImage from '~/assets/user/img/logo.png'

export default function AdminSidebar() {
  const [openStates, setOpenStates] = useState({})

  const toggleSection = (key) => {
    setOpenStates((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const renderSection = (label, icon, key, items) => (
    <>
      <ListItemButton onClick={() => toggleSection(key)}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
        {openStates[key] ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openStates[key]} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.map((text, index) => (
            <ListItemButton key={index} sx={{ pl: 4 }}>
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  )

  return (
    <Paper elevation={0} sx={{ height: '100vh', padding: 3, borderRadius: 0 }}>
      <img src={logoImage} style={{ width: '200px' }} />
      <List
        component="nav"
        sx={{
          minWidth: '100%',
          maxHeight: '90%',
          mt: '20px',
          overflow: 'auto'
        }}
      >
        <ListItemButton>
          <ListItemIcon>
            <DashboardOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        {renderSection('Users', <PersonOutlinedIcon />, 'users', [
          'Active Users',
          'Banned Users',
          'New Registrations',
          'User Feedback / Reports'
        ])}

        {renderSection(
          'Shops / Vendors',
          <StoreMallDirectoryOutlinedIcon />,
          'shops',
          [
            'Active Shops',
            'Pending Shop Approves',
            'Banned Shops',
            'Suspended Shops',
            'Shop Info Update Requests'
          ]
        )}

        {renderSection('Products', <CategoryOutlinedIcon />, 'products', [
          'Product List',
          'Pending Product Approves',
          'Reported Products',
          'Hidden Products',
          'Product Categories'
        ])}

        {renderSection('Orders', <LocalShippingOutlinedIcon />, 'orders', [
          'Order List',
          'Refund / Complaint Orders',
          'Pending Orders',
          'Order Status Analytics'
        ])}

        {renderSection(
          'Transactions / Payments',
          <MonetizationOnOutlinedIcon />,
          'payments',
          [
            'Transaction History',
            'Seller Withdraw Requests',
            'Platform Revenue',
            'Commission Management'
          ]
        )}

        {renderSection(
          'Coupons & Promotions',
          <DiscountOutlinedIcon />,
          'promotions',
          ['Coupon List', 'Flash Sale Campaigns', 'Platform Deals']
        )}

        {renderSection(
          'Analytics & Reports',
          <AssessmentOutlinedIcon />,
          'analytics',
          [
            'Sales Reports',
            'User / Shop Growth Charts',
            'Hot Product Analysis',
            'Cancellation / Complaint Rates'
          ]
        )}
      </List>
    </Paper>
  )
}
