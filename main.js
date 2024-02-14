import './style.css'

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
    console.log('iv been called')
}, 50)
)

// TEST
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