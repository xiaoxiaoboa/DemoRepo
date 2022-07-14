import {
  Stack,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody
} from "@mui/material"
import { useState } from "react"

export default function TimerLog() {
  const [logs, setLog] = useState([])

  return (
    <Stack
      sx={{
        borderRadius: "10px",
        bgcolor: "white",
        flex: "2",
        p: "10px",
        overflow: "hidden"
      }}>
      <TableContainer
        component={Paper}
        elevation={0}
        square={true}
        sx={{ bgcolor: "unset" }}>
        <Table size="small" stickyHeader={true}>
          <TableHead>
            <TableRow>
              <TableCell>主题</TableCell>
              <TableCell>操作内容</TableCell>
              <TableCell>操作时间</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.length < 1 ? (
              <TableRow>
                <TableCell
                  sx={{ borderBottom: "none", color: "#ccc" }}
                  colSpan={3}
                  align="center">
                  " 你还没有选中一个主题哦 "
                </TableCell>
              </TableRow>
            ) : (
              logs.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="right">{item.content}</TableCell>
                  <TableCell align="right">{item.time}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}
