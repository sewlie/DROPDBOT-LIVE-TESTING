function myFunction() {
    var x = document.getElementById("myTopnav");
    var overlay = document.querySelector('.fullscreen-overlay');
    var body = document.body; // Or document.documentElement for the 'html' tag
    var icon = document.querySelector(".icon"); // Corrected selector for class


    if (x.className === "topnav") {
    x.className += " responsive";
    overlay.style.display = 'block'; // Show the overlay
    body.classList.add('no-scroll'); // Disable scrolling
    icon.style.transform = 'rotate(90deg)'; // Rotate the hamburger icon
    } else {
    x.className = "topnav";
    overlay.style.display = 'none'; // Hide the overlay
    body.classList.remove('no-scroll'); // Re-enable scrolling
    icon.style.transform = 'rotate(0deg)'; // Rotate back the hamburger icon
    }

    // Set transition effect for hamburger icon
    icon.style.transition = 'transform 0.2s ease';
}

let vid = document.getElementById("background-video");
    vid.playbackRate = 0.4;

