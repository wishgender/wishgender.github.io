//= laz r
//= 12-08-2025 13:29
//= inferno.js

const infoClass = "MoreInfo";

function showMoreInfo(ring) {
    const section = ring.parentElement.parentElement.parentElement;
    // console.log(section);
    let infoID = section.getAttribute("id") + infoClass;
    console.log(infoID);
    let moreInfo = document.getElementById(infoID);
    console.log(moreInfo);
    moreInfo.style.display = "flex";
    moreInfo.style.flexDirection = "column";
    disableScroll();
}

function hideMoreInfo(elem) {
    let info = elem.parentElement;
    info.style.display = "none";
    enableScroll();
}

function disableScroll() {
    // Get the current page scroll position
    scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop;
    scrollLeft =
        window.pageXOffset ||
        document.documentElement.scrollLeft,
        // if any scroll is attempted,
        // set this to the previous value
        window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
        };
}

function enableScroll() {
    window.onscroll = function () { };
}

function violenceLeft(elem) {
    let parent = elem.parentElement;
    let sibs = parent.children;
    let activeList;
    for (let i = 0; i < sibs.length; i++) {
        if (sibs[i].classList.contains('active')) {
            sibs[i].classList.remove('active');
            activeList = sibs[i];
        }
    }
    console.log(activeList)
    const id = activeList.getAttribute('id');
    switch (id) {
        case "godArtNature":
            activeList.previousElementSibling.style.display = 'flex';
            activeList.previousElementSibling.classList.add('active');
            activeList.classList.remove('active');
            activeList.style.display = 'none';
            break;
        case "self":
            activeList.previousElementSibling.style.display = 'flex';
            activeList.previousElementSibling.classList.add('active');
            activeList.classList.remove('active');
            activeList.style.display = 'none';
            break;
        case "neighbors":
            activeList.nextElementSibling.nextElementSibling.style.display = 'flex';
            activeList.nextElementSibling.nextElementSibling.classList.add('active');
            activeList.classList.remove('active');
            activeList.style.display = 'none';
            break;
        default:
            break;
    }
    // console.log(sibs)
}
function violenceRight(elem) {
    let parent = elem.parentElement;
    let sibs = parent.children;
    let activeList;
    for (let i = 0; i < sibs.length; i++) {
        if (sibs[i].classList.contains('active')) {
            sibs[i].classList.remove('active');
            activeList = sibs[i];
        }
    }
    console.log(activeList)
    const id = activeList.getAttribute('id');
    switch (id) {
        case "neighbors":
            activeList.nextElementSibling.style.display = 'flex';
            activeList.nextElementSibling.classList.add('active');
            activeList.classList.remove('active');
            activeList.style.display = 'none';
            break;
        case "self":
            activeList.nextElementSibling.style.display = 'flex';
            activeList.nextElementSibling.classList.add('active');
            activeList.classList.remove('active');
            activeList.style.display = 'none';
            break;
        case "godArtNature":
            activeList.previousElementSibling.previousElementSibling.style.display = 'flex';
            activeList.previousElementSibling.previousElementSibling.classList.add('active');
            activeList.classList.remove('active');
            activeList.style.display = 'none';
            break;
        default:
            break;
    }
    // console.log(sibs)
}
function fraudLeft(elem) {
    let parent = elem.parentElement;
    let sibs = parent.children;
    let activeList;
    for (let i = 0; i < sibs.length; i++) {
        if (sibs[i].classList.contains('active')) {
            sibs[i].classList.remove('active');
            activeList = sibs[i];
        }
    }
    console.log(activeList)
    const id = activeList.getAttribute('id');
    switch (id) {
        case "bolgia1":
            sibs[10].style.display = 'flex';
            sibs[10].classList.add('active');
            activeList.classList.remove('active');
            activeList.style.display = 'none';
            break;
        default:
            activeList.previousElementSibling.style.display = 'flex';
            activeList.previousElementSibling.classList.add('active');
            activeList.classList.remove('active');
            activeList.style.display = 'none';
            break;
    }
    console.log(sibs)
}
function fraudRight(elem) {
    let parent = elem.parentElement;
    let sibs = parent.children;
    let activeList;
    for (let i = 0; i < sibs.length; i++) {
        if (sibs[i].classList.contains('active')) {
            sibs[i].classList.remove('active');
            activeList = sibs[i];
        }
    }
    console.log(activeList)
    const id = activeList.getAttribute('id');
    switch (id) {
        case "bolgia10":
            sibs[1].style.display = 'flex';
            sibs[1].classList.add('active');
            activeList.classList.remove('active');
            activeList.style.display = 'none';
            break;
        default:
            activeList.nextElementSibling.style.display = 'flex';
            activeList.nextElementSibling.classList.add('active');
            activeList.classList.remove('active');
            activeList.style.display = 'none';
            break;
    }
    console.log(sibs)
}

function treacheryLeft(elem) {
    let parent = elem.parentElement;
    let sibs = parent.children;
    let activeList;
    for (let i = 0; i < sibs.length; i++) {
        if (sibs[i].classList.contains('active')) {
            sibs[i].classList.remove('active');
            activeList = sibs[i];
        }
    }
    console.log(activeList)
    const id = activeList.getAttribute('id');
    switch (id) {
        case "round1":
            sibs[4].style.display = 'flex';
            sibs[4].classList.add('active');
            activeList.classList.remove('active');
            activeList.style.display = 'none';
            break;
        default:
            activeList.previousElementSibling.style.display = 'flex';
            activeList.previousElementSibling.classList.add('active');
            activeList.classList.remove('active');
            activeList.style.display = 'none';
            break;
    }
    console.log(sibs)
}

function treacheryRight(elem) {
    let parent = elem.parentElement;
    let sibs = parent.children;
    let activeList;
    for (let i = 0; i < sibs.length; i++) {
        if (sibs[i].classList.contains('active')) {
            sibs[i].classList.remove('active');
            activeList = sibs[i];
        }
    }
    console.log(activeList)
    const id = activeList.getAttribute('id');
    switch (id) {
        case "round4":
            sibs[1].style.display = 'flex';
            sibs[1].classList.add('active');
            activeList.classList.remove('active');
            activeList.style.display = 'none';
            break;
        default:
            activeList.nextElementSibling.style.display = 'flex';
            activeList.nextElementSibling.classList.add('active');
            activeList.classList.remove('active');
            activeList.style.display = 'none';
            break;
    }
    console.log(sibs)
}