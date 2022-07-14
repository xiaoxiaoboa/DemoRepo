import { Stack } from "@mui/material"
import Left from "../../components/Left"
import Right from "../../components/Right"

export default function Home() {
  return (
    <Stack direction="row" justifyContent="space-between" height="100vh">
      <Left />
      <Right />
    </Stack>
  )
}
