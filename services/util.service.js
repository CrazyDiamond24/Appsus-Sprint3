export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage,
    animateCSS
}


function makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }
  
  function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : undefined
  }
  
  
function animateCSS(el, animation) {
    const prefix = 'animate__'
    return new Promise((resolve, reject) => {
      const animationName = `${prefix}${animation}`
  
      el.classList.add(`${prefix}animated`, animationName)
  
      // When the animation ends, we clean the classes and resolve the Promise
      function handleAnimationEnd(event) {
        event.stopPropagation()
        el.classList.remove(`${prefix}animated`, animationName)
        resolve('Animation ended')
      }
      el.addEventListener('animationend', handleAnimationEnd, { once: true })
    })
  }