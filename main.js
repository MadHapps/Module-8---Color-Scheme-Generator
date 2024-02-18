import './style.css'

//Global Variables
const colorPickerEl = document.getElementById('color-picker')
const colorFormEl = document.getElementById('color-form')
let formColor = colorPickerEl.value.replace('#', '')
let formScheme = document.getElementById('color-schemes').value

// Load saved color or generate random
if (sessionStorage.getItem('currentColor')) {
    colorPickerEl.value = sessionStorage.getItem('currentColor')
} else colorPickerEl.value = randomHexColorCode();

// Update color after form submit
['change', 'submit', 'DOMContentLoaded'].forEach(event => {
    window.addEventListener(event, (e) => {
        e.preventDefault()
        formScheme = document.getElementById('color-schemes').value
        if (event === 'submit') {
            const randomColor = randomHexColorCode()
            sessionStorage.setItem('currentColor', randomColor)
            colorPickerEl.value = randomColor
            formColor = colorPickerEl.value.replace('#', '')
            displayColors(formColor, formScheme)
        } else {
            const currentColor = colorPickerEl.value
            sessionStorage.setItem('currentColor', currentColor)
            formColor = currentColor.replace('#', '')
            displayColors(formColor, formScheme)
        } 
    })
})

// Fetch colors from API
function displayColors(color, scheme = 'monochrome') {
    fetch(`https://www.thecolorapi.com/scheme?mode=${scheme}&hex=${color}`, { method: "GET" })
        .then(res => res.json())
        .then(data => {
            const dataColors = data.colors.map(color => color.hex.value)
            const displayColors = document.querySelectorAll("[data-display-colors]")
            const displayText = document.querySelectorAll("[data-display-text]")
            displayColors.forEach((display, index) => {
                display.style.backgroundColor = dataColors[index]
                displayText[index].textContent = dataColors[index]
            })
        })
}

//Generate random color
function randomHexColorCode() {
    let n = (Math.random() * 0xfffff * 1000000).toString(16)
    return '#' + n.slice(0, 6)
}

// Responsive Height
let vh = window.innerHeight * 0.01
document.documentElement.style.setProperty('--vh', `${vh}px`)

const debounce = (fn, delay) => {
    let id
    return (...args) => {
        if (id) clearTimeout(id)
        id = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

window.addEventListener('resize', debounce(() => {
    vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
}, 50)
)

displayColors(formColor, formScheme)

//DIFFERENT DEBOUNCE METHODS//////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
// TEST USING TIMEOUT ONLY ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
// window.addEventListener('resize', () => {
//     let resizeTimer
//     clearTimeout(resizeTimer)
//     resizeTimer = setTimeout(() => {
//         vh = window.innerHeight * 0.01
//         document.documentElement.style.setProperty('--vh', `${vh}px`)
//         console.log('iv been called')
//     }, 2000)
// })
//////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////
// TEST USING THROTTLE ///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
// const throttle = (fn, delay) => {
//     let lastTime = 0
//     console.log('throttle called')
//     return (...args) => {
//         const now = new Date().getTime()
//         if (now - lastTime < delay) return
//         lastTime = now
//         fn(...args)
//     }
// }
// window.addEventListener('resize', throttle(()=>{
//         vh = window.innerHeight * 0.01
//         document.documentElement.style.setProperty('--vh', `${vh}px`)
//         console.log('iv been called')
//     }, 1000)
// )
/////////////////////////////////////////////////////////////////////////