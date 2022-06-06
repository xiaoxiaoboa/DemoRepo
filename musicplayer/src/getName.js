const getName = name => {
  const index = name.lastIndexOf(".")
  const str = name.slice(0, index)
  return str
}
export default getName