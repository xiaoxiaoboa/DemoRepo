import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import TimerIcon from "@mui/icons-material/Timer"
import Divider from "@mui/material/Divider"
import ListAltIcon from "@mui/icons-material/ListAlt"
import AddBoxIcon from "@mui/icons-material/AddBox"
import SideBar from "../SideBar"

export default function Left() {
  return (
    <Box flex={1} sx={{}}>
      <Stack justifyContent="center" direction="row" mt={7} mb={7}>
        <img
          src="https://fontmeme.com/permalink/220622/23feb5717198e6f28b0bf03155cef6bf.png"
          alt=""
          style={{ width: "200px" }}
        />
      </Stack>
      <Divider />

      <SideBar
        header={{ headerIcon: <TimerIcon />, headerText: "计时器" }}
        fold={[{ foldIcon: <AddBoxIcon />, foldText: "计时器" }]}
        to={`/timer`}
      />

      <SideBar
        header={{ headerIcon: <ListAltIcon />, headerText: "To Do" }}
        fold={[{ foldIcon: <AddBoxIcon />, foldText: "to do" }]}
        to={`/todo`}
      />
    </Box>
  )
}
