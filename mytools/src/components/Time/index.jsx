import { Stack, Typography } from "@mui/material"
import StopWatch from "../StopWatch"
import {useRecoilValue} from 'recoil'
import { clickedItemState } from "../../recoil/TimerAtoms"

export default function Time() {
  const clickedItem = useRecoilValue(clickedItemState)
  return (
    <Stack
      sx={{
        borderRadius: "10px",
        bgcolor: "white",
        flex: "1",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "100px"
      }}>
      {/* 选中项目时，计时器变为黑色 */}
      <Typography
        variant="h1"
        sx={{ color: `${clickedItem === null ? "#ccc" : "black"}` }}>
        <StopWatch />
      </Typography>
    </Stack>
  )
}
