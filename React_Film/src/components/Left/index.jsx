import { useEffect, useRef } from "react"
import useWindowSize from "../../utils/useWindowSize"
import "./index.css"

export default function Left() {
  const navRef = useRef()
  const docHeight = useWindowSize()

  useEffect(() => {
    getSideBarHeight(navRef, docHeight)
  }, [docHeight])

  return (
    <nav className="sidebar">
      <div className="logo">
        <img
          src="https://fontmeme.com/permalink/220614/5ccd0d43fe3d8b98a5f2fcbd31e27b72.png"
          alt="React Film"
          className="logoImg"
        />
      </div>
      <hr className="divider" />
      <div className="navItem" ref={navRef}>
        <div className="categories">
          <ul className="sidebar-list">
            <li className="itemTitle">Categories</li>
            <li className="siderbar-item">
              <img src="/images/popular.png" alt="" className="itemImg" />
              <span className="itemName">Popular</span>
            </li>
            <li className="siderbar-item">
              <img src="/images/toprated.png" alt="" className="itemImg" />
              <span className="itemName">Top Rated</span>
            </li>
            <li className="siderbar-item">
              <img src="/images/upcoming.png" alt="" className="itemImg" />
              <span className="itemName">Upcoming</span>
            </li>
          </ul>
        </div>
        <hr className="divider" />
        <div className="genres">
          <ul className="sidebar-list">
            <li className="itemTitle">Genres</li>
            <li className="siderbar-item">
              <img src="/images/action.png" alt="" className="itemImg" />
              <span className="itemName">Action</span>
            </li>
            <li className="siderbar-item">
              <img src="/images/adventure.png" alt="" className="itemImg" />
              <span className="itemName">Adventure</span>
            </li>
            <li className="siderbar-item">
              <img src="/images/animation.png" alt="" className="itemImg" />
              <span className="itemName">Animation</span>
            </li>
            <li className="siderbar-item">
              <img src="/images/comedy.png" alt="" className="itemImg" />
              <span className="itemName">Comedy</span>
            </li>
            <li className="siderbar-item">
              <img src="/images/crime.png" alt="" className="itemImg" />
              <span className="itemName">Crime</span>
            </li>
            <li className="siderbar-item">
              <img src="/images/documentary.png" alt="" className="itemImg" />
              <span className="itemName">Documentary</span>
            </li>
            <li className="siderbar-item">
              <img src="/images/drama.png" alt="" className="itemImg" />
              <span className="itemName">Drama</span>
            </li>
            <li className="siderbar-item">
              <img src="/images/family.png" alt="" className="itemImg" />
              <span className="itemName">Family</span>
            </li>
            <li className="siderbar-item">
              <img src="/images/fantasy.png" alt="" className="itemImg" />
              <span className="itemName">Fantasy</span>
            </li>
            <li className="siderbar-item">
              <img src="/images/history.png" alt="" className="itemImg" />
              <span className="itemName">History</span>
            </li>
            <li className="siderbar-item">
              <img src="/images/horror.png" alt="" className="itemImg" />
              <span className="itemName">Horror</span>
            </li>
            <li className="siderbar-item">
              <img src="/images/music.png" alt="" className="itemImg" />
              <span className="itemName">Music</span>
            </li>
            <li className="siderbar-item">
              <img src="/images/mystery.png" alt="" className="itemImg" />
              <span className="itemName">Mystery</span>
            </li>
            <li className="siderbar-item">
              <img src="/images/romance.png" alt="" className="itemImg" />
              <span className="itemName">Romance</span>
            </li>
            <li className="siderbar-item">
              <img
                src="/images/sciencefiction.png"
                alt=""
                className="itemImg"
              />
              <span className="itemName">Science Fiction</span>
            </li>
            <li className="siderbar-item">
              <img src="/images/tvshow.png" alt="" className="itemImg" />
              <span className="itemName">TV Movie</span>
            </li>
            <li className="siderbar-item">
              <img src="/images/thriller.png" alt="" className="itemImg" />
              <span className="itemName">Thriller</span>
            </li>
            <li className="siderbar-item">
              <img src="/images/war.png" alt="" className="itemImg" />
              <span className="itemName">War</span>
            </li>
            <li className="siderbar-item">
              <img src="/images/western.png" alt="" className="itemImg" />
              <span className="itemName">Western</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

const getSideBarHeight = (element, docHeight) => {
  const navElement = element.current
  navElement.style.height = docHeight - navElement.offsetTop + "px"
}
