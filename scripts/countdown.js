//= laz r
//= 03-04-2026 16:16
//= countdown.js

//= Dependencies =//

const kobyDay = "Mar 12, 2026 14:00:00";

let countdownDate = new Date(kobyDay).getTime();

let x = setInterval(function () {
    let now = new Date().getTime();

    var difference = countdownDate - now;

    var days = Math.floor(difference / (1000 * 60 * 60 * 24));
    var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = days + "d " + hours + "h " + minutes + "min " + seconds + "s <br/>Until I get to see my Koby";

    if (difference < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "EXPIRED"
    }
})