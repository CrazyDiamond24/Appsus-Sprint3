export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage,
    animateCSS,
    randSender,
    makeLorem,
    randStatus,
    getPriceDisplay,
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

function randSender() {
    const senders = ['Netflix', 'Youtube', 'Github', 'MetaMask', 'Getin', 'Dropbox', 'Binance', 'Yaron Biton', 'Almog Ohayon', 'Pango', 'Rania Elizabeth Kittan', 'Google Play','Font Awesome',
'Facebook','Instagram']

    return senders[Math.floor(Math.random() * senders.length)]
}

function makeLorem(length = 10) {
  const words = ["The sky", "above", "the port", "was", "the color of television", "tuned", "to", "a dead channel", ".", "All", "this happened", "more or less", ".", "I", "had", "the story", "bit by bit", "from various people", "and", "as generally", "happens", "in such cases", "each time", "it", "was", "a different story", ".", "It", "was", "a pleasure", "to", "burn"]

  var sentence = ""
  while (length--) {
      sentence += words[Math.floor(Math.random() * words.length)] + " "
  }
  return sentence
}

function randStatus(){
  const states = ['Inbox', 'Sent', 'Drafts', 'Trash', 'All']
  return states[Math.floor(Math.random() * states.length)]
}



function getPriceDisplay(listPrice) {
  const symbol = {
    USD: '$',
    EUR: '€',
    ILS: '₪',
  }

  const price = listPrice.amount
  const currencyCode = symbol[listPrice.currencyCode]
  const priceStr = (currencyCode ? currencyCode : '') + price

  return priceStr
}