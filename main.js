let alienIndex = 0;
let isPrimed = false;
let aliensData = [];
let currentRotation = 0;
let isAlbedo = false;

const contentWrapper = document.querySelector('.content-wrapper');
const green = document.querySelector(".anel");
const btn = document.querySelector(".btn-horizontal");
const alienInfo = document.querySelector(".alien-info");
const primeSound = document.getElementById('primeSound');

// Fetch the JSON data
fetch('./aliens.json')
    .then(response => response.json())
    .then(data => {
        aliensData = data;
        displayAlienInfo(alienIndex);
    });

function displayAlienInfo(index) {
    const alien = aliensData[index];
    document.getElementById('alienName').textContent = alien.name;
    document.getElementById('alienPower').textContent = "Power: " + alien.power;
    document.getElementById('alienDescription').textContent = "Description: " + alien.description;
    document.getElementById('alienDebut').textContent = "Debut Episode: " + alien.debut;
    document.getElementById('alienFirstWin').textContent = "First Win: " + alien.firstWin;
    document.getElementById('alienImage').src = alien.image;
}

window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
        document.getElementById('content-wrapper').style.display = 'flex';
    }, 6000); // Change this to the desired loading time
});

document.addEventListener("keydown", function(event) {
    if (event.key === "e" || event.key === "E") {
        isPrimed = !isPrimed; // Toggle isPrimed value
        
        if (isPrimed) {
            green.style.boxShadow = "inset 8px 8px 15px 6px rgba(0, 255, 0, .9)";
            alienInfo.classList.add('show');
            primeSound.play(); // Play the sound
            contentWrapper.classList.add('shifted');
            green.style.transform = "rotate(180deg)";
        } else {
            green.style.boxShadow = "none";
            alienInfo.classList.remove('show');
            contentWrapper.classList.remove('shifted');
            green.style.boxShadow = "inset 4px 4px 18px 7px rgba(0, 0, 0, .9)";
            primeSound.pause(); // Optional: pause the sound when toggled off
            green.style.transform = "rotate(-180deg)";
            primeSound.currentTime = 0; // Reset the sound to the beginning
        }
    }
});

document.addEventListener("keydown", function(event) {
    if (isPrimed) {
        if (event.key === "ArrowLeft") {
            primeSound.play(); // Play the sound
            alienIndex = (alienIndex > 0) ? alienIndex - 1 : aliensData.length - 1;
            currentRotation -= 180; // Decrease the rotation angle by 180 degrees
            green.style.transform = `rotate(${currentRotation}deg)`;
            displayAlienInfo(alienIndex);
            primeSound.currentTime = 0; // Reset the sound to the beginning
        } else if (event.key === "ArrowRight") {
            primeSound.play(); // Play the sound
            alienIndex = (alienIndex < aliensData.length - 1) ? alienIndex + 1 : 0;
            currentRotation += 180; // Increase the rotation angle by 180 degrees
            green.style.transform = `rotate(${currentRotation}deg)`;
            displayAlienInfo(alienIndex);
            primeSound.currentTime = 0; // Reset the sound to the beginning
        }
    }
    // currentRotation = 0;
});