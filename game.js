let lastReload = 0
let speed = 10
const playground = document.getElementById('playground')
const appendSize = 1
let fini = false
let setActive = false

let audiostart = new Audio('./img/son/plateau.m4a')
audiostart.loop = false
audiostart.play()

export function main(currentTime) {
    if (fini == true) {
        const fin = document.getElementById('fin')
        fin.style.display = 'block'
        document.body.appendChild(fin)
        return
    }
    window.requestAnimationFrame(main)
    const seconds = (currentTime - lastReload) / 1000
    if (seconds < 1 / speed) {
        return
    }
    lastReload = currentTime
    update()
    respawnApple()
    draw(playground)
    drawApple(playground)
    wall()
    dead()
}

window.requestAnimationFrame(main)


export function update() {
    const setDirection = getDirection()
    for (let i = corps.length - 2; i >= 0; i--) {
        corps[i + 1] = {...corps[i] }
    }
    corps[0].x += setDirection.x
    corps[0].y += setDirection.y
}

const corps = [{ x: 11, y: 11 }]

export function draw(playground) {
    playground.innerHTML = ''
    let tete = true
    corps.forEach(segment => {
        if (tete == true) {
            console.log("ssss")
            const elementCorps = document.createElement('div')
            elementCorps.style.gridRowStart = segment.y
            elementCorps.style.gridColumnStart = segment.x
            elementCorps.classList.add('snakeHead')
            playground.appendChild(elementCorps)
            tete = false

        } else {
            const elementCorps = document.createElement('div')
            elementCorps.style.gridRowStart = segment.y
            elementCorps.style.gridColumnStart = segment.x
            elementCorps.classList.add('snake')
            playground.appendChild(elementCorps)
        }

    })
}

let direction = { x: 0, y: 0 }
let previousDirection = { x: 0, y: 0 }

window.addEventListener('keydown', event => {
    if (setActive == true) {
        switch (event.key) {
            case 'ArrowUp':
                if (previousDirection.y == 1) {
                    break
                }
                direction = { x: 0, y: -1 }
                break
            case 'ArrowDown':
                if (previousDirection.y == -1) {
                    break
                }
                direction = { x: 0, y: 1 }
                break
            case 'ArrowLeft':
                if (previousDirection.x == 1) {
                    break
                }
                direction = { x: -1, y: 0 }
                break
            case 'ArrowRight':
                if (previousDirection.x == -1) {
                    break
                }
                direction = { x: 1, y: 0 }
                break
        }
    }
})



let newBodyPart = 0

function getDirection() {
    previousDirection = direction
    return direction
}

function updateSnakeSize(newSize) {
    newBodyPart += newSize
    for (let i = 0; i < newSize; i++) {
        corps.push({...corps[corps.length - 1] })
    }
    if (randomAppleDesign == 0) {
        let audiopespi = new Audio('./img/son/pespi.m4a')
        audiopespi.loop = false
        audiopespi.play()
    } else if (randomAppleDesign == 1) {
        let audioburger = new Audio('./img/son/amonga.m4a')
        audioburger.loop = false
        audioburger.play()
    } else if (randomAppleDesign == 2) {
        let audiomanaise = new Audio('./img/son/manaise.m4a')
        audiomanaise.loop = false
        audiomanaise.play()
    }
}

function eat(coordonate) {
    return corps.some(part => {
        if (part.x === coordonate.x && part.y === coordonate.y) {
            return true
        }
    })
}


let apple = { x: Math.floor(Math.random() * 21) + 1, y: Math.floor(Math.random() * 21) + 1 }

function respawnApple() {
    if (eat(apple) === true) {
        updateSnakeSize(appendSize)
        speed += 1
        apple = randomApple()
    }
}

let randomAppleDesign = 0

function drawApple(playground) {
    const elementApple = document.createElement('div')
    elementApple.style.gridRowStart = apple.y
    elementApple.style.gridColumnStart = apple.x
    elementApple.classList.add('apple')
    if (randomAppleDesign == 0) {
        elementApple.style.backgroundImage = "url('https://www.clicmarket.fr/4735-large_default/24-canettes-de-pepsi-24-x-33-cl.jpg')"
    } else if (randomAppleDesign == 1) {
        elementApple.style.backgroundImage = "url(./img/burger.png)"
    } else if (randomAppleDesign == 2) {
        elementApple.style.backgroundImage = "url(./img/manaise.png)"
    }
    playground.appendChild(elementApple)
}

function randomApple() {
    let newApple
    while (newApple == null || eat(newApple) == true) {
        newApple = randomPlace()
    }
    randomAppleDesign = Math.floor(Math.random() * 3)
    return newApple
}

function randomPlace() {
    let x = Math.floor(Math.random() * 21) + 1
    let y = Math.floor(Math.random() * 21) + 1
    return { x, y }
}

function dead() {
    for (let i = 2; i < corps.length; i++) {
        if (corps[0].x == {...corps[i] }.x && corps[0].y == {...corps[i] }.y) {
            fini = true
        }
    }

}


export function wall() {
    setActive = false
    if (corps[0].y == 0) {
        corps[0].y = 22
    } else if (corps[0].x == 0) {
        corps[0].x = 22
    } else if (corps[0].y == 22) {
        corps[0].y = 0
    } else if (corps[0].x == 22) {
        corps[0].x = 0
    }
    setActive = true
}