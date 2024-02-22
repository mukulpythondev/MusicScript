var audio;
var arr = [
    { name: "Softly", url: "./songs/Softly.mp3", img: "./images/softly.jfif" },
    { name: "Phle bhi mein", url: "./songs/Pehle Bhi Main.mp3", img: "./images/animal.jpg" },
    { name: "Arjan Vailly Ne", url: "./songs/Arjan Vailly Ne.mp3", img: "./images/arjanvailly.jfif" },
    { name: "Sari Duniya jala denge", url: "./songs/Saari Duniya Jala Denge.m4a", img: "./images/duniyajaladenge.jpg" },
    { name: "Ram Siya Ram", url: "./songs/Ram Siya Ram.mp3", img: "./images/ram.jpg" },
    { name: "One Love", url: "./songs/onelove.m4a", img: "https://i.pinimg.com/564x/f3/7a/34/f37a34cc66fb5fc32e0b147c93cb9604.jpg" },
    { name: "Maan Meri Jaan", url: "./songs/maanmerijaan.mp3", img: "./images/manmerijaan.jpg" },
    { name: "Kahani Suno 2.0", url: "./songs/kahanisuno.mp3", img: "./images/kahanisuno.jfif" },
    { name: "Tu Hai Kahan", url: "./songs/tuhaikahan.mp3", img: "./images/tuhaikahan.jfif" },
    { name: "Apa Phir Milange", url: "./songs/apafirmilange.mp3", img: "./images/phermilange.jfif" },
    { name: "Husn", url: "./songs/husn.mp3", img: "./images/husn.jfif" },
    { name: "Mann Bharrya", url: "./songs/Mannbharya.mp3", img: "./images/Mannbharya.jpg" },
];

var songcard = document.querySelector("#all-songs");
var selectedsong = 0;
var play = document.querySelector("#play");
var forward = document.querySelector("#forward");
var back = document.querySelector("#backward");
var poster = document.querySelector("#posterimg");
var progress = document.querySelector(".progress");
var currenttime = document.getElementById("currenttime");
var totaltime = document.getElementById("totaltime");
var flag = 0;
let lastPlayedTime = 0;

function loadSongCard() {
    var clutter = "";

    arr.forEach(function (song, index) {
        // var songElementId = `duration-${index}`;
        clutter += `<div class="song-card" id="${index}" onclick="playSong(${index})">
            <div class="part1">
                <img src="${song.img}" alt="">
                <h2 id="song-name-${index}">${song.name}</h2>
            </div>
           
        </div>`;
        //    Logic for song time
        // var tempAudio = new Audio(song.url);
        // tempAudio.addEventListener("loadedmetadata", () => {
        //     const minutes = Math.floor(tempAudio.duration / 60);
        //     const seconds = Math.floor(tempAudio.duration % 60);
        //     document.getElementById(songElementId).textContent = `${minutes}:${seconds}`;
        // });
    });
    songcard.innerHTML = clutter;
    document.querySelector("#right").innerHTML+=`  <div class="all-songs-end">
    <p>Listen More Songs? <span>V2 Coming Soon...<span> </p>
</div>`

}

window.addEventListener("load", loadSongCard);

function playSong(index) {
    
    selectedsong = index;
    forward.style.opacity = (index === arr.length - 1) ? 0.3 : 1;
    back.style.opacity = (index === 0) ? 0.3 : 1;
    document.querySelector("#player").display="flex"
    if (audio) {
        audio.pause();
    }
   
    audio = new Audio(arr[selectedsong].url);
    poster.src = arr[selectedsong].img;
    document.querySelector(".overlay-text").style.display='none'
    play.innerHTML = '<i class="ri-pause-mini-fill"></i>';
    flag = 1;
    document.querySelector("#player").style.display = "flex";
    audio.addEventListener("loadedmetadata", () => {
        const minutes = Math.floor(audio.duration / 60);
        const seconds = Math.floor(audio.duration % 60);
        totaltime.textContent = `${minutes}:${seconds}`;
    });

    audio.addEventListener("timeupdate", () => {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${progressPercent}%`;

        const currentMinutes = Math.floor(audio.currentTime / 60);
        const currentSeconds = Math.floor(audio.currentTime % 60);
        currenttime.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    });

    progress.parentElement.addEventListener("click", (e) => {
        const clickX = e.clientX - progress.parentElement.getBoundingClientRect().left;
        const percent = (clickX / progress.parentElement.offsetWidth) * 100;
        audio.currentTime = (percent / 100) * audio.duration;
        flag = 1;
        updatePlayButtonIcon();
        audio.play();
    });

    audio.addEventListener("ended", () => {
        progress.style.width = "0%";
        if (selectedsong < arr.length - 1) {
            selectedsong++;
            playSong(selectedsong);
            audio.play();
            back.style.opacity = (selectedsong === 0) ? 0.3 : 1;
            forward.style.opacity = (selectedsong === arr.length-1) ? 0.3 : 1;
        }
      
    });

    audio.play();
    document.querySelectorAll(".song-card").forEach(card => {
        card.classList.remove("selected-song");
    });

    // Add "selected-song" class to the currently playing song card
    document.getElementById(index).classList.add("selected-song");
    for (let i = 0; i < arr.length; i++) {
        document.getElementById(`song-name-${i}`).style.color = 'white';
    }

    // Set color of the currently playing song to purple
    document.getElementById(`song-name-${index}`).style.color = 'rgb(156, 47, 156)';
}


function updatePlayButtonIcon() {
    play.innerHTML = flag ? '<i class="ri-pause-mini-fill"></i>' : '<i class="ri-play-mini-fill"></i>';
}

window.addEventListener("load", loadSongCard);

play.addEventListener("click", function () {
    if (flag == 0) {
        audio.currentTime = lastPlayedTime;
        audio.play();
        flag = 1;
        updatePlayButtonIcon();
    } else {
        lastPlayedTime = audio.currentTime;
        audio.pause();
        flag = 0;
        updatePlayButtonIcon();
    }
});

forward.addEventListener("click", function () {
    if (selectedsong < arr.length - 1) {
        selectedsong++;
        back.style.opacity = 1; // Reset opacity when moving forward
    }

    if (selectedsong === arr.length - 1) {
        forward.style.opacity = 0.3;
    }

    playSong(selectedsong);
});

back.addEventListener("click", function () {
    if (selectedsong > 0) {
        selectedsong--;
        forward.style.opacity = 1; // Reset opacity when moving backward
    }

    if (selectedsong === 0) {
        back.style.opacity = 0.3;
    }

    playSong(selectedsong);
});



  

