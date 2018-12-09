"use strict";

let countdownDate = new Date("Jul 1, 2047 00:00:00 GMT+08").getTime();

let countdown = setInterval(() => {
    let now = new Date().getTime();
    let distance = countdownDate - now;

    let years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365.25));
    let days = Math.floor(distance % (1000 * 60 * 60 * 24 * 365.25) / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("years").innerHTML = years;
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    if (distance < 0) {
        clearInterval(countdown);

        document.getElementById("years").innerHTML = "0";
        document.getElementById("days").innerHTML = "0";
        document.getElementById("hours").innerHTML = "0";
        document.getElementById("minutes").innerHTML = "0";
        document.getElementById("seconds").innerHTML = "0";
    
        document.getElementById("done").hidden = false;
        document.getElementById("done").classList.remove('disabled');
        document.getElementById("done").classList.add('active');
        document.getElementById("countdown").classList.add('disabled');
    }
}, 1000);