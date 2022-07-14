import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material"
import List from "@mui/material/List"
import { useState } from "react"
import { NavLink } from "react-router-dom"

export default function myList(props) {
  const { header, fold, to } = props
  const { headerIcon, headerText } = header

  const [open, setOpen] = useState({
    timerFold: true,
    todoFold: true
  })

  const handleClick = type => {
    setOpen(prev => ({ ...prev, [type]: !prev[type] }))
  }

  return (
    <List sx={{ p: 0 }}>
      <ListItemButton onClick={() => handleClick("timerFold")}>
        <ListItemIcon>{headerIcon}</ListItemIcon>
        <ListItemText
          disableTypography
          primary={headerText}
          sx={{ fontWeight: 500, fontSize: 18 }}
        />
        {open.timerFold ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open.timerFold} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {fold.map((obj, index) => (
            <NavLink to={to} key={index}>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>{obj.foldIcon}</ListItemIcon>
                <ListItemText primary={obj.foldText} />
              </ListItemButton>
            </NavLink>
          ))}
        </List>
      </Collapse>
    </List>
  )
}
