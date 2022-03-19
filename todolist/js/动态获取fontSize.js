// 使用vw单位 结合rem单位，实现自适应设备宽度。根字体的大小跟随设备宽度变化而变化
(function fn(){
        const html = document.documentElement
        // 100vw是设备的宽度，例如红米k40设备上，100vw = 393px，那么 100 / document.body.clientWidth 就拿到了1px等于多少vw，接着乘上html根字体的大小 100
        const fontSize = 100 / document.body.clientWidth * 100
        html.style.fontSize = fontSize + 'vw';
        //窗口只要发生变化，就会再次获取设备宽度
        window.addEventListener('resize', fn)
})()




