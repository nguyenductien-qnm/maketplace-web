import React from 'react'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          bgcolor: '#fff'
        }
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        <ListItem>
          <ListItemText primary="LAVU'S SHOESHOP" sx={{ fontWeight: 'bold' }} />
        </ListItem>
        <Divider />
        <ListItem button>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemText primary="Dashboard" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemText primary="Inventory" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemText primary="Reports" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemText primary="Suppliers" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemText primary="Orders" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemText primary="Manage Store" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemText primary="Settings" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemText primary="Log Out" />
          </Link>
        </ListItem>
      </List>
    </Drawer>
  )
}

export default Sidebar
