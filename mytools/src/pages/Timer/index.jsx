import {
  List,
  ListItem,
  ListItemText,
  Stack,
  IconButton,
  Tooltip,
  ListItemButton
} from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
import DeleteIcon from "@mui/icons-material/Delete"
import Time from "../../components/Time"
import TimerLog from "../../components/TimerLog"
import { nanoid } from "nanoid"
import { useRecoilState } from "recoil"
import { timerOnState, clickedItemState } from "../../recoil/TimerAtoms"
import { db } from "../../utils/localForage"
import { useLiveQuery } from "dexie-react-hooks"

export default function Timer() {
  /* dexie的hooks：取回表中所有项；并实时监控，如果新增项，则重新渲染 */
  const items = useLiveQuery(() => db.items?.toArray())
  const [clickedItem, setClickedItem] = useRecoilState(clickedItemState)
  const [timerOn, setTimerOn] = useRecoilState(timerOnState)

  /* 处理点击 */
  const handleClick = clickedObj => {
    setClickedItem(items.find(obj => obj.id === clickedObj.id))
  }

  /* 处理输入 */
  const handleInput = async e => {
    const keyCode = e.keyCode
    const value = e.target.value

    if (keyCode !== 13 || value.trim() === "") return
    const item = { id: nanoid(), value }
    try {
      /* 通过dexie库，把数据存进indexedDB */
      await db.items.add(item)
      await db.time.add({ id: item.id, time: 0 })
    } catch (err) {
      console.log("失败了：", err)
    }

    e.target.value = ""
  }

  /* 处理删除 */
  const handleDelete = async id => {
    try {
      await db.items.delete(id)
      await db.time.delete(id)
    } catch (err) {
      console.log("删除失败", err)
    }
  }

  return (
    <Stack
      direction="row"
      spacing={7}
      sx={{
        width: "90%",
        minWidth: "900px",
        height: "500px",
        justifyContent: "center"
      }}>
      <Stack
        sx={{
          width: "370px",
          p: "15px",
          borderRadius: "10px",
          bgcolor: "white"
        }}>
        <List disablePadding>
          <ListItem sx={{ p: "5px 16px" }}>
            <input
              type="text"
              className="input"
              placeholder="输入主题"
              onKeyUp={handleInput}
            />
          </ListItem>
          {items?.length < 1 ? (
            <Stack alignItems="center" sx={{ color: "#ccc", mt: "30px" }}>
              " 你还没有添加项目哦 "
            </Stack>
          ) : (
            items?.map(obj => (
              <ListItemButton
                key={obj.id}
                onClick={() => handleClick(obj)}
                divider={true}
                disableGutters
                disableRipple
                sx={{
                  cursor: "pointer",
                  borderRadius: "5px",
                  position: "relative",
                  padding: "8px 18px"
                }}
                disabled={
                  /* 用于把除开启定时器之外的item，禁用掉 */
                  timerOn ? (obj.id !== clickedItem.id ? true : false) : false
                }>
                <Stack
                  direction="row"
                  sx={{ position: "absolute", right: "10px" }}>
                  <IconButton
                    onClick={() => setTimerOn(!timerOn)}
                    sx={{
                      /* 在没有点击Listitem之前，开始按钮不会显示*/
                      display: `${
                        obj.id === clickedItem?.id ? "inline-flex" : "none"
                      }`
                    }}>
                    {/* timerOn控制StopWatch组件中秒表的启动，如果仅用timerOn来判断，则每一个Listitem都会出发，因为判断依据timerOn是共享的；所以还需对点击的ListItem进行判断 */}
                    {timerOn ? (
                      obj.id === clickedItem?.id ? (
                        <PauseIcon />
                      ) : (
                        <PlayArrowIcon />
                      )
                    ) : (
                      <PlayArrowIcon />
                    )}
                  </IconButton>
                  <Tooltip title="点击后会立即删除" arrow>
                    <IconButton
                      sx={{ ":hover": { color: "red" } }}
                      disabled={
                        /* 控制在点击开始按钮后，禁用删除按钮 */
                        timerOn
                          ? obj.id === clickedItem?.id
                            ? true
                            : false
                          : false
                      }
                      onClick={e => {
                        /* 由于点击时会向上冒泡，触发父元素上的事件，所以在这里禁止了冒泡 */
                        e.stopPropagation()
                        handleDelete(obj.id)
                      }}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
                <img
                  src="https://fontmeme.com/permalink/220626/52e7de717ea25a1c6ae36bf69fdd4ca3.png"
                  alt=""
                  style={{
                    width: "20px",
                    position: "absolute",
                    top: "2px",
                    right: 0,
                    transform: "rotate(30deg)",
                    display: `${obj.id === clickedItem?.id ? "block" : "none"}`
                  }}
                />
                <ListItemText
                  disableTypography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "500",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    flex: "none",
                    maxWidth: "240px"
                  }}>
                  {obj.value}
                </ListItemText>
              </ListItemButton>
            ))
          )}
        </List>
      </Stack>
      <Stack spacing={2} sx={{ flex: "2" }}>
        <Time />
        <TimerLog />
      </Stack>
    </Stack>
  )
}
