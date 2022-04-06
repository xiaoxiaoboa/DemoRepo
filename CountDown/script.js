const html = document.querySelector('html')
const year = document.querySelector('.year')
const h1 = document.querySelector('h1')
const countDown = document.querySelector('.countdown')
const currentYear = document.querySelector('.currentYear')
const nextYear = document.querySelector('.nextYear')
const h2 = document.querySelectorAll('h2')


//检测设备，网页自动响应布局 ⬇⬇⬇⬇⬇⬇⬇
const currentViewWidth = document.body.clientWidth

if (currentViewWidth <= 375) {
    html.style.fontSize = 8 + 'px'
    year.className = 'year year_mobile'
} else if (currentViewWidth <= 500) {
    html.style.fontSize = 10 + 'px'
    year.className = 'year year_mobile'
}
//⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆


//倒计时⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇
//1.设置年
const currentYearLeft = new Date()
const nextYearRight = currentYearLeft.getFullYear() + 1
currentYear.innerHTML = String(currentYearLeft.getFullYear())
nextYear.innerHTML = String(nextYearRight)

//2.设置倒计时
const newYearTime = new Date(`${currentYearLeft.getFullYear() + 1} 01 01 00:00:00`)
updateCountDown()
function updateCountDown(){
    const currentTime = Date.now()
    const diff = newYearTime.getTime() - currentTime
    const day = Math.floor(diff / 1000 / 24 / 60 / 60)
    const hour = Math.floor(diff / 1000 / 60 / 60 % 24)
    const minute = Math.floor(diff / 1000 / 60 % 60)
    const second = Math.floor(diff / 1000 % 60)

    h2[0].innerHTML = String(day)
    h2[1].innerHTML = hour < 10 ? '0' + hour : hour
    h2[2].innerHTML = minute < 10 ? '0' + minute : minute
    h2[3].innerHTML = second < 10 ? '0' + second : second
}

//⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆

//执行定时器
setInterval(updateCountDown,1000)