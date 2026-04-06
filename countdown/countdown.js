//= laz r
//= 03-04-2026 16:16
//= countdown.js

// const { response } = require("express");

//= Dependencies =//
fetch('./events.json')
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
            if (Temporal.ZonedDateTime.compare(eventTime, Temporal.Now.zonedDateTimeISO()) == -1) {
                timerDiv.innerHTML =
                    `
                <div class="countdown">
                    Event passed
                </div>
                `;
            }
            else {
                timerDiv.innerHTML =
                    `
                    <div class="countdown">
                            <div class="tableRow weeks">
                                <div class="headerCell">Weeks</div>
                                <div class="dataCell weeks">
                                    <span id="event${index}weeks"></span>
                                </div>
                            </div>
                            <div class="tableRow days">
                                <div class="headerCell">Days</div>
                                <div class="dataCell days">
                                    <span id="event${index}days"></span>
                                </div>
                            </div>
                            <div class="tableRow hours">
                                <div class="headerCell">Hours</div>
                                <div class="dataCell hours">
                                    <span id="event${index}hours"></span>
                                </div>
                            </div>
                            <div class="tableRow minutes">
                                <div class="headerCell">Minutes</div>
                                <div class="dataCell minutes">
                                    <span id="event${index}minutes"></span>
                                </div>
                            </div>
                            <div class="tableRow seconds">
                                <div class="headerCell">Seconds</div>
                                <div class="dataCell seconds">
                                    <span id="event${index}seconds"></span>
                                </div>
                            </div>
                            <div class="tableRow milliseconds">
                                <div class="headerCell">Milliseconds</div>
                                <div class="dataCell">
                                    <span id="event${index}milliseconds"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                `

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

            }

            eventDiv.appendChild(timerDiv);
            if (Temporal.ZonedDateTime.compare(eventTime, Temporal.Now.zonedDateTimeISO()) == -1) {
                document.getElementById("past").appendChild(eventDiv);
            } else {
                events.appendChild(eventDiv);
            }

        });

        // data.repeatingEvents.forEach(event => { });
    });