// FLOATING HEARTS & FIREFLIES
const heartsContainer = document.querySelector('.hearts') || document.body;

function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = Math.random() * 100 + 'vw';

  const size = 12 + Math.random() * 6;
  heart.style.width = size + 'px';
  heart.style.height = size + 'px';

  heart.style.animationDuration = (8 + Math.random() * 7) + 's';
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 15000);
}

function createFirefly() {
  const firefly = document.createElement('div');
  firefly.classList.add('firefly');

  // Random starting position
  firefly.style.left = Math.random() * 100 + 'vw';
  firefly.style.top = Math.random() * 100 + 'vh';

  // Vary size and animation speed
  const size = 5 + Math.random() * 5;
  firefly.style.width = size + 'px';
  firefly.style.height = size + 'px';
  firefly.style.animationDuration = (10 + Math.random() * 10) + 's, ' + (1 + Math.random() * 2) + 's';

  document.body.appendChild(firefly);
  setTimeout(() => firefly.remove(), 25000);
}

setInterval(createHeart, 1500);
setInterval(createFirefly, 3000);

// Initialize a few fireflies
for (let i = 0; i < 5; i++) createFirefly();

// PAGE NAVIGATION
function goTo(page) {
  document.body.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = page;
  }, 400);
}

window.addEventListener("pageshow", function () {
  document.body.classList.remove("fade-out");
});

// CANDLE INTERACTION
let blownCount = 0;
function blowCandle(candle) {
  if (!candle.classList.contains("blown")) {
    candle.classList.add("blown");
    candle.innerHTML = "";
    blownCount++;
  }
  if (blownCount === 21) {
    setTimeout(() => {
      document.getElementById("afterWish").style.display = "block";
    }, 1000);
  }
}

// PRESS HOLD FINAL PAGE
let holdTimer;
function startHold() {
  holdTimer = setTimeout(() => {
    document.getElementById("finalText").innerText = "Day 366 starts now.";
  }, 1500);
}

function endHold() {
  clearTimeout(holdTimer);
}


// ================= PRESS & HOLD HEART =================

const heart = document.getElementById("heart");
const starsContainer = document.getElementById("starsContainer");
const afterWish = document.getElementById("afterWish");

let starsLit = 0;

if(heart){

heart.addEventListener("mousedown", () => {
  holdTimer = setTimeout(() => {
    heart.classList.add("active");
    starsContainer.style.display = "flex";
    document.getElementById("starInstruction").style.display = "block";
    createStars();
  }, 2000);
});

heart.addEventListener("mouseup", () => {
  clearTimeout(holdTimer);
});

heart.addEventListener("mouseleave", () => {
  clearTimeout(holdTimer);
});

}

// ================= CREATE 21 STARS =================

function createStars() {
  starsContainer.innerHTML = "";
  starsLit = 0;

  for (let i = 0; i < 21; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    star.addEventListener("click", function () {
      if (!star.classList.contains("active")) {
        star.classList.add("active");
        starsLit++;
        if (starsLit === 21) {
          setTimeout(() => {
            afterWish.style.display = "block";
          }, 800);
        }
      }
    });

    starsContainer.appendChild(star);
  }
}

function checkQuiz() {

  const answers = {
    q1: "a",
    q2: "c",
    q3: "c",
    q4: "b",
    q5: "a"
  };

  let correct = 0;

  document.querySelectorAll(".question").forEach(q => {
    q.style.border = "none";
  });

  for (let q in answers) {

    let selected = document.querySelector(`input[name="${q}"]:checked`);

    if (selected && selected.value === answers[q]) {
      correct++;
    } else {
      document.querySelector(`input[name="${q}"]`).closest(".question").style.border = "2px solid #ff4fa3";
    }

  }

  if (correct === 5) {

    document.getElementById("quizMessage").innerText = "Perfect. You know us well hehe";
    document.getElementById("finalAccess").style.display = "block";

  } else {

    document.getElementById("quizMessage").innerText = "Almost! Some answers are wrong. Try again";
  }
}
const music = document.querySelector("#bgMusic");

if(music){

window.addEventListener("DOMContentLoaded", () => {

  const savedTime = localStorage.getItem("musicTime");
  const wasPlaying = localStorage.getItem("musicPlaying");

  if(savedTime){
    music.currentTime = parseFloat(savedTime);
  }

  if(wasPlaying){
    music.volume = 0.4;
    music.play().catch(()=>{});
  }

});

// Start music on first click
document.addEventListener("click", () => {

  if(!localStorage.getItem("musicPlaying")){
    music.volume = 0.4;

    music.play().then(()=>{
      localStorage.setItem("musicPlaying","true");
    }).catch(()=>{});

  }

});

document.addEventListener("click", () => {

  if(!localStorage.getItem("musicPlaying")){
    music.volume = 0.4;

    music.play().then(()=>{
      localStorage.setItem("musicPlaying","true");
    }).catch(()=>{});

  }

});

// Save time continuously
music.addEventListener("timeupdate", () => {
  localStorage.setItem("musicTime", music.currentTime);
});

}

const video = document.getElementById("specialVideo");

if(video){

  // Pause music when video starts
  video.addEventListener("play", () => {
    if(music && !music.paused){
      music.pause();
    }
  });

  // Resume music when video ends
  video.addEventListener("ended", () => {
    if(music){
      music.play().catch(()=>{});
    }
  });

  // Resume music if video paused midway
  video.addEventListener("pause", () => {
    if(music && video.currentTime < video.duration){
      music.play().catch(()=>{});
    }
  });

}

const names = document.querySelectorAll(".names-grid .love-text");

names.forEach((name, index) => {

  setTimeout(() => {
    name.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    name.style.opacity = "1";
    name.style.transform = "translateY(0)";
  }, index * 200);

});

function startMusic(){

  const music = document.getElementById("bgMusic");

  if(!music) return;

  music.volume = 0.4;

  music.play().then(()=>{
    localStorage.setItem("musicPlaying","true");
  }).catch(()=>{});

}