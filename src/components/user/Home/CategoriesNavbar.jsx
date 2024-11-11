import * as React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { useSelector } from 'react-redux'
import { Card, CardContent, Collapse } from '@mui/material'

export default function CategoriesNavbar() {
  const categories = useSelector((state) => state.categories.categories)

  const open = useSelector((state) => state.categories.isOpen)

  const DrawerList = (
    <Card>
      <CardContent>
        <Box
          sx={{
            width: '100%'
          }}
        >
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>
    </Card>
  )
  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      {DrawerList}
    </Collapse>
  )
}
