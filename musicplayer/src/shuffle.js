
const handleShuffle = (length, F) => {
  const min = Math.ceil(0)
  const max = Math.floor(length - 1)
  const shuffleRel = Math.floor(Math.random() * (max - min + 1)) + min

  F(shuffleRel)
}

export default handleShuffle