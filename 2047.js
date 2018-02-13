// Set the date we're counting down to
var countdownDate = new Date("Jul 1, 2047 00:00:00 GMT+08:00").getTime();

// Update the count down every 1 second
var countdown = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = countdownDate - now;

    // Time calculations for years, days, hours, minutes and seconds
    var years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365.25));
    var days = Math.floor(distance % (1000 * 60 * 60 * 24 * 365.25) / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element
    document.getElementById("years").innerHTML = years;
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    // If the count down is finished, write some text 
    if (distance < 0) {
        clearInterval(countdown);
        document.getElementById("done").classList.remove('disabled');
        document.getElementById("done").classList.add('active');
        document.getElementById("countdown").classList.add('disabled');
    }
}, 1000);