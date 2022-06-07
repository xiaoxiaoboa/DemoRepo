import { useContext, useState } from "react"
import "./index.css"
import { SongsContext } from "../../context/SongsContext"
import shuffle from "../../shuffle"
import getName from "../../getName"

export default function Right() {
  const { state, setPlaying, playing } = useContext(SongsContext)
  /* isSearch:是否处于搜索状态，value:搜索的值 */
  const [searching, setSeach] = useState("")
  /* 由于state是FileList类型，转换成数组后方便map遍历，去除非音频文件（本想用input做限制，结果它不生效）*/
  const songs = Array.from(state)

  /* 随机播放歌曲 */
  const handleShuffle = () => {
    shuffle(state.length, shuffleRel => setPlaying(state[shuffleRel]))
  }

  /* 双击歌名播放 */
  const handleClickPlay = ({ target: { innerText } }) => {
    const newArr = songs.filter(song => song.name.includes(innerText))
    setPlaying(() => newArr[0])
  }

  /*搜索功能  */
  const handleSearch = ({ target: { value } }) => {
    setSeach(value)
  }

  return (
    <div className="playinglistcontainer">
      <div className="playinglistwrapper">
        <div className="header">
          <img
            src="/images/shuffle.svg"
            alt=""
            className="shuffle"
            onClick={handleShuffle}
          />
          <input
            type="text"
            className="search"
            placeholder="搜索歌曲"
            onKeyUp={handleSearch}
          />
          <span className="number">
            {songs.indexOf(playing) + 1} / {songs.length}
          </span>
        </div>
        <hr />
        <SongList
          songs={songs}
          handleClickPlay={handleClickPlay}
          playing={playing}
          searching={searching}
        />
      </div>
    </div>
  )
}

function SongList({ songs, handleClickPlay, playing, searching }) {
  return (
    <div className="listcontainer">
      <div className="listwrapper">
        <ul className="list">
          {searching.length > 0
            ? songs
                .filter(song =>
                  song.name.toLocaleLowerCase().includes(searching)
                )
                .map((song, index) => (
                  <li
                    key={index}
                    className={
                      playing.name === song.name
                        ? "songitem active"
                        : "songitem"
                    }
                    onDoubleClick={handleClickPlay}>
                    {getName(song.name)}
                  </li>
                ))
            : songs.map((song, index) => (
                <li
                  key={index}
                  className={
                    playing.name === song.name ? "songitem active" : "songitem"
                  }
                  onDoubleClick={handleClickPlay}>
                  {getName(song.name)}
                </li>
              ))}
        </ul>
      </div>
    </div>
  )
}
