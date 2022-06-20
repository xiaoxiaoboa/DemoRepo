const vote = num => {
  const newNum = Math.floor(num)
  switch (newNum) {
    case 1:
    case 2:
      return "\u2B50"
    case 3:
    case 4:
      return "\u2B50\u2B50"
    case 5:
    case 6:
      return "\u2B50\u2B50\u2B50"
    case 7:
    case 8:
      return "\u2B50\u2B50\u2B50\u2B50"
    case 9:
    case 10:
      return "\u2B50\u2B50\u2B50\u2B50\u2B50"
      
    default:
      break
  }
}
export default vote
