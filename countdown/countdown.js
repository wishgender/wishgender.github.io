//= laz r
//= 03-04-2026 16:16
//= countdown.js

// const { response } = require("express");

//= Dependencies =//
fetch('events.json')
    .then(response => response.json())
    .then(data => {
        const events = document.getElementById("events");

        data.oneOffEvents.forEach((event, index) => {
            console.log(event.eventDate)
            const eventTime = Temporal.ZonedDateTime.from(event.eventDate);

            const eventDiv = document.createElement("div");
            eventDiv.classList.add("event");

            const eventInfoDiv = document.createElement("div");
            eventInfoDiv.classList.add("eventInfo");
            eventInfoDiv.innerHTML =
                `
            <div class="eventName">${event.eventName}</div>
            `;

            eventDiv.appendChild(eventInfoDiv);

            const timerDiv = document.createElement("div");
            timerDiv.classList.add("timer");

            timerDiv.innerHTML =
                `
                <div class="countdown">
                        <div class="tableRow weeks">
                            <div class="headerCell">Weeks</div>
                            <div class="dataCell weeks">
                                <span id="${event.eventName}weeks"></span>
                            </div>
                        </div>
                        <div class="tableRow days">
                            <div class="headerCell">Days</div>
                            <div class="dataCell days">
                                <span id="${event.eventName}days"></span>
                            </div>
                        </div>
                        <div class="tableRow hours">
                            <div class="headerCell">Hours</div>
                            <div class="dataCell hours">
                                <span id="${event.eventName}hours"></span>
                            </div>
                        </div>
                        <div class="tableRow minutes">
                            <div class="headerCell">Minutes</div>
                            <div class="dataCell minutes">
                                <span id="${event.eventName}minutes"></span>
                            </div>
                        </div>
                        <div class="tableRow seconds">
                            <div class="headerCell">Seconds</div>
                            <div class="dataCell seconds">
                                <span id="${event.eventName}seconds"></span>
                            </div>
                        </div>
                        <div class="tableRow milliseconds">
                            <div class="headerCell">Milliseconds</div>
                            <div class="dataCell">
                                <span id="${event.eventName}milliseconds"></span>
                            </div>
                        </div>
                    </div>
                </div>
            `
            eventDiv.appendChild(timerDiv);

            let x = setInterval(function () {
                const difference = (Temporal.Now.zonedDateTimeISO()).until(eventTime, { largestUnit: 'weeks' });
                // console.log(difference);
                document.getElementById(`event${index}weeks`).innerHTML = `${difference.weeks}`
                document.getElementById(`event${index}days`).innerHTML = `${difference.days}`
                document.getElementById(`event${index}hours`).innerHTML = `${difference.hours}`
                document.getElementById(`event${index}minutes`).innerHTML = `${difference.minutes}`
                document.getElementById(`event${index}seconds`).innerHTML = `${difference.seconds}`
                document.getElementById(`event${index}milliseconds`).innerHTML = `${difference.milliseconds}`
            }, 1);

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