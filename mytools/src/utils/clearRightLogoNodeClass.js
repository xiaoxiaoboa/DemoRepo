const clearRightLogoNodeClass = (F) => {
  const rightLogoNodes = document.querySelectorAll(".clickitem")

  rightLogoNodes.forEach(obj => {
    if (obj.className.includes("clicked")) {
      obj.classList.remove("clicked")
    }
  })
  F()
}

export default clearRightLogoNodeClass