import { Stack } from "@mui/material"
import {Outlet} from "react-router-dom"

export default function Right() {
  return (
    <Stack
      flex={5}
      bgcolor="lightblue"
      spacing={3}
      sx={{ alignItems: "center", justifyContent: "center" }}>
        <Outlet />
      </Stack>
  )
}
