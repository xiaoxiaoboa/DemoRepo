import { useContext, useRef } from "react"
import { SongsContext } from "../../context/SongsContext"
import "./index.css"
import shuffle from "../../shuffle"
import getName from "../../getName"

export default function Topbar() {
  const { state, dispatch, playing, setPlaying } = useContext(SongsContext)
  /* 拿到logo那个元素节点 */
  const logo = useRef()

  /* 导入文件夹后，把里面的歌曲放进state中 */
  const handleImport = ({ target: { files } }) => {
    dispatch(files)
  }

  /* 随机播放 */
  const handleShuffle = () => {
    shuffle(state.length, shuffleRel => setPlaying(state[shuffleRel]))
  }

  /* 播放歌曲时，控制logo旋转 */
  const handlePlayRotate = () => {
    logo.current.className = "cdlogo rotate"
  }

  /* 暂停播放时，控制logo暂停旋转 */
  const handlePauseRotate = () => {
    logo.current.className = "cdlogo rotatepause"
  }

  /* 歌曲加载完成后，释放createObjectURL创建的对象 */
  const handleLoad = ({ target: { src } }) => {
    URL.revokeObjectURL(src)
  }

  return (
    <div className="topbarcontainer">
      <label htmlFor="file">
        <img src="/images/CD.svg" className="cdlogo" ref={logo} />
        {/* 需要导入文件时，input type属性设置为file；需要导入文件夹时，还需设置webkitdirectory、multiple */}
        <input
          id="file"
          type="file"
          hidden
          webkitdirectory="true"
          multiple={true}
          onChange={handleImport}
        />
      </label>
      <div className="play">
        <span className="playingsong">
          {/* 显示正在播放的歌曲名 */}
          {playing ? getName(playing.name) : "未播放歌曲"}
        </span>
        {/* 把需要播放的歌曲地址放进src 
            onPlay、onEnded、onEnded分别是播放、暂停、结束时的事件
        */}
        <audio
          src={playing ? URL.createObjectURL(playing) : ""}
          onLoadedMetadata={handleLoad}
          controls
          onEnded={handleShuffle}
          autoPlay={true}
          onPlay={handlePlayRotate}
          onPause={handlePauseRotate}></audio>
      </div>
    </div>
  )
}
