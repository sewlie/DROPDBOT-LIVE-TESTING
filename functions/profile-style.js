function myFunction() {
    var x = document.getElementById("myTopnav");
    var overlay = document.querySelector('.fullscreen-overlay');
    var body = document.body;
    var icon = document.querySelector(".icon");
    var profile = document.querySelector(".profile-content");


    if (x.className === "topnav") {
    x.className += " responsive";
    overlay.style.display = 'block';
    body.classList.add('no-scroll');
    icon.style.transform = 'rotate(90deg)';
    } else {
    x.className = "topnav";
    overlay.style.display = 'none';
    body.classList.remove('no-scroll');
    icon.style.transform = 'rotate(0deg)';
    }

    icon.style.transition = 'transform 0.2s ease';
}

let vid = document.getElementById("background-video");
vid.playbackRate = 0.4;