const map = new Map();
const list = [];
const tabList = document.getElementById('tabList')
// leftbar 前一个点击item
let preBar = null;
// tab 前一个点击
let preTab = null;

// tab栏左边界/右边界距视口距离
let [listLeftToView, listRightToView] = getEleToView(...getEleWidth(document.getElementsByClassName('tabSection')[0]))

// 点击左侧导航栏
function clickEvent() {
    const target = event.target
    if(!target.getAttribute('id')) return
    const elID = target.getAttribute('id').split('-')[1]
    leftbarToggleClass(target)
    // 不在tab栏，新建tab
    if (!map.has(target.innerText)) {
        list.push(target.innerText)
        map.set(target.innerText, true)
        newTab(target.innerText, elID)
        return
    } else { 
        tabInView(document.getElementById(`tab-${elID}`))
        tablistToggleClass(document.getElementById(`tab-${elID}`))
    }
}

// 新建tab元素
function newTab(text, index) {
    const tab = document.createElement('li')
    tab.innerText = text
    tab.setAttribute('id', `tab-${index}`)
    tabList.appendChild(tab)
    tabInView(tab)
    tablistToggleClass(tab)
}

// leftbar点击切换
function leftbarToggleClass(el) {
    preBar && preBar.setAttribute('class', 'item')
    el.setAttribute('class', 'item active-bar')
    preBar = el
}

// tablist点击切换
function tablistToggleClass(el) {
    preTab && preTab.setAttribute('class', '')
    el.setAttribute('class', 'active-tab')
    preTab = el
}

// 获取元素宽度以及离视口距离
function getEleWidth(el) {
    const temp = el.getBoundingClientRect()
    return [Math.floor(temp.width*100)/100, Math.floor(temp.left*100)/100]
}

// 获取元素左侧以及右侧距离视口距离
function getEleToView(width, left) {
    return [left, left+width]
}

// 判断tab是否在显示范围内，不在则调整tab栏位置
function tabInView(tab) {
    const [width, left] = getEleWidth(tab)
    const right = left + width
    // 在显示范围
    if(left >= listLeftToView && right <= listRightToView) return;
    // tab超出右边界
    else if (left >= listLeftToView) {
        const sub = listRightToView - right;
        tabList.style.left = `${tabList.offsetLeft+sub}px`
    }
    // 超出左边界
    else if (left <= listLeftToView) {
        const sub = listLeftToView - left
        tabList.style.left = `${tabList.offsetLeft+sub}px`
    }
}

// 切换tab
function changeTab() {
    const tab = event.target
    console.log(tab.tagName, tab)
    if (tab.tagName != 'LI') return
    // 样式切换
    tablistToggleClass(tab)
    leftbarToggleClass(document.getElementById(`bar-${index}`))
    tabInView(tab)
    preTab = tab
}

// 点击向前按钮
function preBtn() {
    tabList.style.left = `0px`
}

// 点击向后按钮
function aftBtn() {
    const [lastWidth, lastlLeft] = getEleWidth(tabList.lastChild)
    const [firstWidth, firstlLeft] = getEleWidth(tabList.firstChild)
    // lastWidth+lastleft-firstLeft 算出tab栏实际宽度  listRightToView-listLeftToView 算出tab栏显示宽度
    tabList.style.left = `-${lastlLeft+lastWidth-firstlLeft-(listRightToView-listLeftToView)}px`
}



