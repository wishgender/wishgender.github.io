//= laz r
//= 02-20-2026 16:13
//= Tepig.js

const tepigJump = [
    { transform: "translateY(-30px)" },
    { transform: "translateY(0px)" }
]

const jumpTiming = {
    duration: 100,
    iterations: 1
}

const enclosureID = 'tepigEnclosure';

const pics = [
    'sprite1.png',
    'sprite2.png'
]

function addTepig() {
    let enclosure = document.getElementById(enclosureID);
    let newTep = document.createElement('div');
    let tepImage = document.createElement('img');
    tepImage.src = 'static/assets/menu.png';
    tepImage.setAttribute('onmouseenter', 'startDancing(this);');
    tepImage.setAttribute('onmouseleave', 'stopDancing(this);');
    newTep.classList.add('tepig');
    newTep.appendChild(tepImage);
    enclosure.appendChild(newTep);
    let tepigCount = document.getElementById('tepigCount');
    tepigCount.textContent = enclosure.children.length;
}

async function makeSounds() {
    let tepigs = document.getElementsByClassName('tepig');
    for (let tepig of tepigs) {
        const cry = new Audio('static/assets/tepig.ogg');
        cry.play();
        tepig.animate(tepigJump, jumpTiming);
    }
}

function setFree() {
    let tepigs = document.getElementById('tepigEnclosure');
    while (tepigs.children.length > 1) {
        tepigs.removeChild(tepigs.firstChild);
    }
    let tepigCount = document.getElementById('tepigCount');
    tepigCount.textContent = tepigs.children.length;
}

function startDancing(tep) {
    tep.src = "static/assets/menuAnim.png"
}

function stopDancing(tep) {
    tep.src = "static/assets/menu.png"
}