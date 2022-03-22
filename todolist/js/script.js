import InDB from '../node_modules/indb/src/indb.js'

const html = document.documentElement
const isShow = document.querySelector('.isshow')
const bar = document.querySelector('.bar')
const topic = document.querySelector('.topic')
const newContent = document.querySelector('.new-content')
const barList = document.querySelector('.bar-list')
const itemList = document.querySelector('.item-list')
const itemListImportant = document.querySelector('.important-list')
const itemListDone = document.querySelector('.done')
const bgLayer = document.querySelector('.bg-layer')
const unfold = document.querySelector('#unfold')
const btns = document.querySelectorAll('.btn')
const btnIcon = document.querySelectorAll('.btn-icon')
// const content = document.querySelector('.content')
const btnAddCard = document.querySelector('#btn-add-card')
const btnRemove = document.querySelector('#btn-remove-all')
const btnImportant = document.querySelector('#btn-important-all')
const btnBackTop = document.querySelector('#btn-back-top')
const body = document.querySelector('body')
const btnCloseLayer = document.querySelector('#close-bg-layer')
const textLayer = document.querySelector('.text-layer')
const btnCloseText = document.querySelector('#close-text-layer')
const buttonRight = document.querySelector('.button-right')
const editCard = document.querySelector('#edit-card')
const importantList = document.querySelector('.important-list')
const main = document.querySelector('.main')
const home = document.querySelector('#home')
const btnDone = document.querySelector('#done')
const doneList = document.querySelector('.done')
const addCardBtn = document.querySelector('#add-card')
const title = document.querySelector('#title')
const text = document.querySelector('#content');
const titleDetail = document.querySelector('#title-detail')
const textDetail = document.querySelector('#text-detail')
const beginDate = document.querySelector('.begin-date')
const endDate = document.querySelector('.end-date');
const dialogBox = document.querySelector('.dialog-box');
const dialog = document.querySelector('.dialog');
const btnConfirm = document.querySelector('.btn-confirm');
const btnCancel = document.querySelector('.btn-cancel');
const btnConfirm1 = document.querySelector('.btn-confirm1');
const btnCancel1 = document.querySelector('.btn-cancel1');
const icon = document.querySelectorAll('.icon');
const finishCardButton = document.querySelector('#done-card');
const importantCardButton = document.querySelector('#important-card');
const removeCardButton = document.querySelector('#remove-card');
const putCard = document.querySelector('#put-card');
const warnText = document.querySelector('.warn-text');

//判断设备类型
(function () {
    const device = window.navigator.userAgent.toLowerCase();
    if (/windows/.test(device.split(' ')[1]) || /mac/.test(device.split(' ')[1]) || /linux/.test(device.split(' ')[2])) {
        //电脑端
        html.setAttribute('devicetype', 'computer')

    } else {
        //移动端
        html.setAttribute('decviceType', 'mobile')

    }
})();

/*------------------打开数据库-------------------*/

const store1 = {
    name: 'cards',
    keyPath: 'cardsId',

}
const store2 = {
    name: 'importantCards',
    keyPath: 'cardsId',

}
const store3 = {
    name: 'doneCards',
    keyPath: 'cardsId',

}
const options = {
    name: 'todo',
    version: 1,
    stores: [
        store1,
        store2,
        store3,
    ],
}
const idb = new InDB(options)
let db = await idb.connect()
const cardsStore = idb.use('cards')
const importantStore = idb.use('importantCards')
const doneStore = idb.use('doneCards')
/*-------------------------------------------------------*/

//获取cards存储库中所有卡片
let allCardsData = await cardsStore.all()
bubblingSort(allCardsData)
// console.log(allCardsData)
allCardsData.forEach((data) => createCard(data, itemList))
//获取重要卡存储库中所有卡片
let allImportantData = await importantStore.all()
bubblingSort(allImportantData)
allImportantData.forEach((data) => createCard(data, itemListImportant))
//获取已完成片所有数据
let allDoneData = await doneStore.all()
bubblingSort(allDoneData)
allDoneData.forEach((data) => createCard(data, itemListDone))
/*-------------------------------------------------------*/
//第一次打开页面时，先执行一次，不然没有点击事件
contentListener(itemList, allCardsData)
/*工具栏*/
//home按钮
home.addEventListener('click', () => {
    itemListHide()
    itemList.style.display = 'flex'
    contentListener(itemList, allCardsData)
})
//添加按钮
btnAddCard.addEventListener('click', () => {
    //打开bg-layer层
    inputLocation()

    //向数据库添加卡片数据
    addCardBtn.addEventListener('click', () => {
        let titleContent = title.value
        let textContent = text.value
        let cardData = cardsObj(titleContent, textContent, 'cardsStore')
        if (titleContent.trim()) {
            cardsStore.add(cardData).then(value => {
                if (value) {
                    title.value = ''
                    text.value = ''
                    bgLayer.classList.remove('show')
                    window.location.reload()
                }
            })
        }
    })
}, {passive: false})
// 已设为重要按钮
btnImportant.addEventListener('click', (e) => {
    itemListHide()
    importantList.style.display = 'flex'
    contentListener(importantList, allImportantData)
}, {passive: false})
//已完成按钮
btnDone.addEventListener('click', () => {
    itemListHide()
    doneList.style.display = 'flex'
    contentListener(doneList, allDoneData)
})
// 删除按钮
btnRemove.addEventListener('click', () => {
    dialogBox.classList.add('show')
    dialog.classList.remove('dialog-location')

    btnConfirm.addEventListener('click', () => {
        if (allCardsData.length > 0) {
            cardsStore.clear()
        }
        if (allImportantData.length > 0) {
            importantStore.clear()
        }
        if (allDoneData.length > 0) {
            doneStore.clear()
        }
        window.location.reload()
    })
    btnCancel.addEventListener('click', () => {
        dialogBox.classList.remove('show')
        dialog.classList.add('dialog-location')
    })
}, {passive: false})
//回到顶部按钮
btnBackTop.addEventListener('click', () => {
    const scrolled = Math.floor(window.scrollY)
    //如果已滚动的距离太近的话，就不执行
    if (scrolled >= 1000) {
        body.scrollIntoView({behavior: 'smooth'})
    }
}, {passive: false})

//工具栏位置
if (!(html.getAttribute('devicetype') === 'computer')) {
    bar.classList.add('bar-right')
    isShow.className = 'isshow-m'
    unfold.classList.add('unfold-right')
    barList.classList.add('bar-list-right')
    icon.forEach((item) => item.classList.add('btn-icon'))
    for (let i = 0; i < barList.children.length; i++) {
        barList.children[i].classList.add('btn-right')
    }

    let flag = false;
    bar.addEventListener('click', () => {
        flag = true
        isShow.className = 'isshow'

    }, {passive: false})
    bar.addEventListener('mouseleave', () => {
        if (flag) {
            // isShow.style.display = 'none'
            isShow.className = 'isshow-m'
            flag = false
        }
    }, {passive: false})

    /*侧边栏位置调整,使其位于右侧空白处中间位置
    先获取当前设备空白区的宽度，相当于第一个卡片距其父元素的值(父元宽度100%)
    拿到宽度值后赋值给侧边栏，然后居中*/
    if (itemList.children.length > 0) {
        const content = document.querySelector('.content')
        let barRightWidth = content.offsetLeft
        bar.style.width = barRightWidth / 100 + 'rem'
    } else {
        bar.style.right = 30 + 'px'
    }
}

/*卡片*/
//关闭添加层
btnCloseLayer.addEventListener('click', () => {
    const className = 'bg-layer'
    bgLayer.style.top = -100 + 'vh'
    addCardFn(bgLayer, false, className)
    editAfter()
})

//点击事件
function contentListener(obj, cardsData) {
    //利用循环给传进来的对象下面的每个content绑定事件
    for (let i = 0; i < obj.children.length; i++) {
        let thisStore = whichStore(cardsData, i)

        //点击卡片弹出卡片详情
        obj.children[i].addEventListener('click', (e) => {
            setCardDetail(cardsData[i])
            const target = e.target
            const mouseX = e.pageX
            const mouseY = e.pageY
            const isComp = html.getAttribute('devicetype') === 'computer'
            if ((target.className === 'content')) {
                addCardFn(textLayer, true, 'text-layer show')
                textLayer.style.bottom = 0 + 'px'
                addCardFn(target, true, 'content content-bgc')

                //判断是否有滚动条和是否是电脑
                isComp ? (hasScrollbar() ? isPcHasScrollbar(true, mouseX, mouseY, textLayer.firstElementChild) : isPcHasScrollbar(false, mouseX, mouseY, textLayer.firstElementChild)) : noPc()

                //关闭卡片详情层1
                btnCloseText.addEventListener('click', closeTextLayer)

                //关闭卡片详情层2
                textLayer.addEventListener('touchstart', (e) => {
                    if (/text-layer/.test(e.target.className)) {
                        closeTextLayer()
                    }
                }, {passive: false})
                //阻止冒泡
                textLayer.addEventListener('touchend', (e) => {
                    e.preventDefault()
                })

                function closeTextLayer() {
                    addCardFn(textLayer, false, 'text-layer')
                    textLayer.style.bottom = -100 + 'vh'
                    addCardFn(target, false, 'content')
                    // if (hasScrollbar() && html.getAttribute('devicetype') === 'computer')
                    //     html.style.marginRight = 0 + 'px'
                }
            }
        })

        //电脑端右键菜单
        obj.children[i].addEventListener('mouseup', (e) => {
            rightBtnListener(e)
        })

        //移动端右键菜单
        obj.children[i].addEventListener('touchstart', (e) => {
            longPress(e)
            rightBtnListener(e)
        }, {passive: false})

        //右键菜单函数
        function rightBtnListener(e){
            rightButton(e)
            showRightBtn(obj)
            //设置卡片完成的按钮
            finishCardButton.addEventListener('click', () => {
                finishCardBtn(cardsData, i)
                deleteCardBtn(thisStore, cardsData, i).then(value => {
                })
                window.location.reload()

            })
            //设置卡片重要的按钮
            importantCardButton.addEventListener('click', () => {
                importantCardBtn(cardsData, i)
                deleteCardBtn(thisStore, cardsData, i).then(value => {
                })
                window.location.reload()
            })
            //删除卡片的按钮
            removeCardButton.addEventListener('click', () => {
                openDialog()
                btnConfirm1.addEventListener('click', () => {
                    deleteCardBtn(thisStore, cardsData, i).then(value => {
                    })
                })
                btnCancel1.addEventListener('click', () => {
                    closeDialog()
                })

            })
            //编辑卡片的按钮
            editCard.addEventListener('click', () => {
                editCardBtn(cardsData, i)
                let store = whichStore(cardsData, i)
                putCard.addEventListener('click', () => {
                    //标题和内容其中有一个被修改的话，就可以执行存储，否则不执行
                    if (!(cardsData[i].title === title.value) || !(cardsData[i].text === text.value)) {
                        //返回修改后的数据对象数组
                        const rel = confirmModify(cardsData, i)
                        if (rel) {//如果有结果则执行存储
                            store.put(rel).then(value => {
                                window.location.reload()
                            })
                        }
                    }

                })
            })
        }
    }
}

//修改卡片
putCard.addEventListener('click', () => {

})
/*设置文本框大小*/
if (html.getAttribute('devicetype') === 'computer') {
    //设置电脑端输入框大小
    topic.style.width = 50 + "%"
    newContent.style.width = 60 + '%'
}

/*右键菜单*/
body.oncontextmenu = (e) => {
    e.preventDefault()
}

//打开
function rightButton(e, bool) {
    const target = e.target
    const mouseX = e.pageX || e.touches[0].pageX
    const mouseY = e.pageY || e.touches[0].pageY
    if (target.className === 'content' && (e.button === 2 || bool)) {
        //控制显示
        addCardFn(buttonRight, true, 'button-right show')
        //控制位置
        isPcHasScrollbar(false, mouseX, mouseY, buttonRight)

        body.addEventListener('click', () => {
            addCardFn(buttonRight, false, 'button-right')
            buttonRight.style.top = -100 + 'vh'
        })

    }
}

//完成按钮
function finishCardBtn(obj, i) {
    if (obj[i]) {
        obj[i].completeDate = formatDate()
        obj[i].storeName = 'doneStore'
        console.log(obj[i])
        doneStore.put(obj[i])
    }
}

//重要按钮
function importantCardBtn(obj, i) {
    if (obj[i]) {
        importantStore.add(obj[i]).then(value => {
        })
        obj[i].storeName = 'importantStore'
        importantStore.put(obj[i])
    }
}

//删除按钮
async function deleteCardBtn(store, cardData, i) {
    store.delete(cardData[i].cardsId)
    window.location.reload()
}

//编辑
function editCardBtn(obj, i) {
    inputLocation()
    addCardBtn.className = 'btn isshow-m'
    putCard.className = 'btn isshow'
    title.value = obj[i].title
    text.value = obj[i].text
}

//确认修改
function confirmModify(obj, i) {
    return [{
        cardsId: obj[i].cardsId,
        title: title.value,
        text: text.value,
        createDate: obj[i].createDate,
        storeName: obj[i].storeName,
    }]
}

//未修改关闭页面后，清空input内容
function editAfter() {
    addCardBtn.className = 'btn isshow'
    putCard.className = 'btn isshow-m'
    title.value = ''
    text.value = ''
}

//返回这个数据是那个存储库的
function whichStore(obj, i) {
    let rel
    if (obj[i]) {
        if (obj[i].storeName === 'cardsStore') {
            rel = cardsStore
        } else if (obj[i].storeName === 'importantStore') {
            rel = importantStore
        } else if (obj[i].storeName === 'doneStore') {
            rel = doneStore
        }
    }
    return rel
}

/*函数*/
//控制添加卡片层和卡片详情层的显示
let addCardFn = (obj, bool, className) => {
    const isComp = html.getAttribute('devicetype') === 'computer'
    if (bool) {
        obj.className = className
        if (hasScrollbar() && (document.documentElement.style.overflowY === '' || document.documentElement.style.overflowY === 'scroll') && isComp) {
            //有遮罩层时控制滚动条显示或隐藏
            document.documentElement.style.overflowY = 'hidden'
            html.style.marginRight = 17 + 'px'
        }
    } else {
        obj.className = className
        if (hasScrollbar() && document.documentElement.style.overflowY === 'hidden' && isComp) {
            //有遮罩层时控制滚动条显示或隐藏
            document.documentElement.style.overflowY = 'scroll'
            html.style.marginRight = 0 + 'px'
        }

    }
}

//判断是否有滚动条
function hasScrollbar() {
    let flag
    html.scrollHeight > html.clientHeight ? flag = true : flag = false
    return flag
}

//卡片详情层函数
function isPcHasScrollbar(bool, X, Y, obj) {
    const scrolled = Math.floor(window.scrollY)
    const mouseX = X
    //指针距离顶部的数值，如果有滚动情况的话，上方会有工具栏，所以要减去工具栏的高度
    const mouseY = scrolled > bar.offsetTop ? (Y - scrolled - bar.clientHeight) : (Y - scrolled)
    const deviceWidth = document.body.clientWidth
    const deviceHeight = document.body.clientHeight
    const elWidth = obj.clientWidth
    const elHeight = obj.clientHeight

    //右侧空间是否够弹出层展示
    const rightSpace = (deviceWidth - mouseX) < elWidth
    const elLocationX = rightSpace ? (mouseX - elWidth) : mouseX
    //下方空间是否够弹出层展示
    const downSpace = (deviceHeight - mouseY) < elHeight
    //先判断下方空间是否足够，够：直接赋值mouseY 不够：在判断上方空间够不够(够：弹出层展示到鼠标上方，不够：弹出层展示到鼠标在自身一半的位置)
    const elLocationY = downSpace ? (mouseY < elHeight) ? (elHeight / 2) : (mouseY - elHeight) : mouseY

    if (bool) {
        obj.style.top = (elLocationY) / 100 + 'rem'
        obj.style.left = elLocationX / 100 + 'rem'
    } else {
        obj.style.top = (elLocationY) / 100 + 'rem'
        obj.style.left = elLocationX / 100 + 'rem'
    }
}

//不是电脑
function noPc() {
    textLayer.firstElementChild.className = 'box box-m'
    btnCloseText.style.display = 'none'
}

//判断移动端长按
//在卡片上按下触发此函数，600毫秒后触发定时器，显示右键菜单，松开手指清除定时器
function longPress(e) {
    let timer = setTimeout(() => {
        rightButton(e, true)
    }, 600)
    body.addEventListener('touchend', () => {
        clearTimeout(timer)
    })
}

//给item-list设置隐藏
function itemListHide() {
    for (let i = 0; i < main.children.length; i++) {
        main.children[i].style.display = 'none'
    }
}

//bg-layer内input位置调整
function inputLocation() {
    const className = 'bg-layer show'
    const deviceHeight = document.body.clientHeight
    const scrolled = Math.floor(window.scrollY)

    //计算已滚动距离，使添加卡片层能显示在可视区内
    bgLayer.style.top = scrolled / 100 + 'rem'
    //通过设备高度计算添加卡片层文本区top值，使其显示在设备相对中间的位置
    bgLayer.children[0].style.top = deviceHeight * 0.15 / 100 + 'rem'

    addCardFn(bgLayer, true, className)
}

//返回数据库需要的对象
function cardsObj(title, text, storeName) {
    const str = URL.createObjectURL(new Blob()).slice(-36)
    return [
        {
            cardsId: str,
            title: title,
            text: text,
            createDate: formatDate(),
            storeName: storeName,
        }
    ]
}

//创建卡片元素
function createCard(obj, el) {
    const card = document.createElement('div')
    card.classList.add('item')

    card.innerHTML = `
    <div class="content">
         <p>${obj.title}</p>
    </div>
    `
    el.appendChild(card)
}

//设置卡片数据
function setCardDetail(obj) {
    titleDetail.innerHTML = obj.title
    titleDetail.title = obj.title
    textDetail.innerHTML = obj.text
    beginDate.innerHTML = obj.createDate
    if (obj.completeDate) {
        endDate.innerHTML = obj.completeDate
    } else {
        endDate.innerHTML = '--'
    }
    console.log(obj)
}

//设置卡片时间
function formatDate() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    let minute = date.getMinutes()

    minute = minute < 10 ?  '0' + minute : minute

    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute
}

//对从数据库取回的数组按照时间进行冒泡排序
function bubblingSort(obj) {
    let temp
    for (let i = 0; i < obj.length - 1; i++) {
        for (let j = 0; j < obj.length - 1 - i; j++) {
            if (obj[j].date > obj[j+1].date) {
                temp = obj[j+1]
                obj[j+1] = obj[j]
                obj[j] = temp
            }
        }
    }
}

//控制右键菜单按钮的显示，根据所在区域不同，右键菜单显示的按钮不同
function showRightBtn(obj) {
    if (/important-list/.test(obj.classList)) {
        importantCardButton.style.display = 'none'
        finishCardButton.style.display = 'block'
        editCard.style.display = 'block'
    }
    if (/done/.test(obj.classList)) {
        finishCardButton.style.display = 'none'
        editCard.style.display = 'none'
        importantCardButton.style.display = 'none'
    }
    if (/home/.test(obj.classList)) {
        finishCardButton.style.display = 'block'
        editCard.style.display = 'block'
        importantCardButton.style.display = 'block'
    }

}

//控制dialog显示和打开
function openDialog(){
    dialogBox.classList.add('show')
    dialog.classList.remove('dialog-location')
    btnConfirm.classList.add('isshow-m')
    btnCancel.classList.add('isshow-m')
    btnConfirm1.classList.remove('isshow-m')
    btnCancel1.classList.remove('isshow-m')
}
function closeDialog(){
    dialogBox.classList.remove('show')
    dialog.classList.add('dialog-location')
    btnConfirm.classList.remove('isshow-m')
    btnCancel.classList.remove('isshow-m')
    btnConfirm1.classList.add('isshow-m')
    btnCancel1.classList.add('isshow-m')
}
