var countDownDate = new Date("Sept 30, 2018 00:00:00").getTime();

var updateTimer = function() {
    var now = new Date().getTime();
    var remaining = countDownDate - now;

    var days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    var hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = pad(days, 2) + ":" + pad(hours,2) + ":"
        + pad(minutes, 2) + ":" + pad(seconds, 2);

    if (remaining < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "It's here!";
    }
};

window.onload = updateTimer;
var x = setInterval(updateTimer, 1000);

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}