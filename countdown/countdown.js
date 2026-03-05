//= laz r
//= 03-04-2026 16:16
//= countdown.js

// const { response } = require("express");

//= Dependencies =//
fetch('events.json')
    .then(response => response.json())
    .then(data => {
        const events = document.getElementById("events");

        data.oneOffEvents.forEach(event => {
            console.log(event.eventDate)
            const eventTime = Temporal.ZonedDateTime.from(event.eventDate);


            const eventDiv = document.createElement("div");
            eventDiv.classList.add("event");

            const eventInfoDiv = document.createElement("div");
            eventInfoDiv.innerHTML =
                `
            <h2>${event.eventName}</h2>
            <h3>${eventTime}</h3>
            `;

            eventDiv.appendChild(eventInfoDiv);

            const timerDiv = document.createElement("div");
            timerDiv.classList.add("timer");
            let x = setInterval(function () {
                const difference = (Temporal.Now.zonedDateTimeISO()).until(eventTime, { largestUnit: 'weeks' });
                // console.log(difference);
                timerDiv.innerHTML =
                    `
                <table class="countdown">
                    <thead>
                        <tr>
                            <th>Weeks</th>
                            <th>Days</th>
                            <th>Hours</th>
                            <th>Minutes</th>
                            <th>Seconds</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td class="weeks">
                            ${difference.weeks} week${difference.weeks != 1 ? 's' : ''}
                        </td>
                        <td class="days">
                            ${difference.days} day${difference.days != 1 ? 's' : ''}
                        </td>
                        <td class="hours">
                            ${difference.hours} hour${difference.hours != 1 ? 's' : ''}
                        </td>
                        <td class="minutes">
                            ${difference.minutes} minute${difference.minutes != 1 ? 's' : ''}
                        </td>
                        <td class="seconds">
                            <span class="secondsWrapper">${difference.seconds}.${difference.milliseconds}</span>
                        </td>
                        </tr>
                    </tbody>
                </table>
                `
            }, 1);

            eventDiv.appendChild(timerDiv);

            events.appendChild(eventDiv);
        });

        // data.repeatingEvents.forEach(event => { });
    });

// const kobyDay = "Mar 12, 2026 14:00:00";

// let countdownDate = new Date(kobyDay).getTime();

// let x = setInterval(function () {
//     let now = new Date().getTime();

//     var difference = countdownDate - now;

//     var days = Math.floor(difference / (1000 * 60 * 60 * 24));
//     var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
//     var seconds = Math.floor((difference % (1000 * 60)) / 1000);

//     document.getElementById("timer").innerHTML = days + "d " + hours + "h " + minutes + "min " + seconds + "s <br/>Until I get to see my Koby";

//     if (difference < 0) {
//         clearInterval(x);
//         document.getElementById("timer").innerHTML = "EXPIRED"
//     }
// })