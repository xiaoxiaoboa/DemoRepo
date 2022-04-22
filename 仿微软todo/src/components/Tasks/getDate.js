export default function formatDate() {
  const date = new Date()
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()


  return (
    year +
    "-" +
    format(month) +
    "-" +
    format(day) +
    " " +
    format(hour) +
    ":" +
    format(minute) +
    ":" +
    format(second)
  )
}

function format(date) {
  return (date = date < 10 ? "0" + date : date)
}
