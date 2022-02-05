let isPlay = true;
let playNum = 0;
const tracks = ['./assets/audio/beyonce.mp3', './assets/audio/dontstartnow.mp3'];
const tracksObj = {
    0 : ["Beyonce", "Don't Hurt Yourself", "./assets/img/lemonade.png"],
    1 : ["Dua Lipa", "Don't Start Now", "./assets/img/dontstartnow.png"]
}
const playPauseBtn = document.querySelector('.play-pause');
const nextBtn = document.querySelector('.next-song');
const prevBtn = document.querySelector('.previous-song');
const audio = new Audio();
const timeline = document.querySelector('.progress-bar');
const thumbnail = document.querySelector('.thumbnail');
const artist = document.querySelector('.song-artist');
const title = document.querySelector('.song-title');
const backgroundImage = document.querySelector('.background-image');
var valueOfSong = 0;

function playPause(playNum) {
    valueOfSong = timeline.getAttribute("value");
    if (isPlay) {
    audio.src = tracks[playNum];
    backgroundImage.src = tracksObj[playNum][2];
    thumbnail.src = tracksObj[playNum][2];
    thumbnail.style.transform = 'scale(1.15)';
    artist.textContent = tracksObj[playNum][0];
    title.textContent = tracksObj[playNum][1];

    audio.currentTime = valueOfSong;
    audio.play();
    isPlay = !isPlay;
    playPauseBtn.classList.add('pause');
    }
    else {
        audio.pause();
        thumbnail.style.transform = 'scale(1)';
        isPlay = !isPlay;
        playPauseBtn.classList.remove('pause');
    }
    
    

}
function playNext() {
    timeline.setAttribute("value", 0);
    if(!isPlay) {isPlay = true;}
    playPauseBtn.classList.add('pause');
    playNum++;

    if (playNum >= tracks.length) {
        playNum = 0;
    }
    playPause(playNum);
}
function playPrev() {
    timeline.setAttribute("value", 0);
    if(!isPlay) {isPlay = true;}
    playPauseBtn.classList.add('pause');
    playNum--;
    if (playNum < 0) {
        playNum = tracks.length - 1;
    }
    playPause(playNum);
}

audio.addEventListener("ended", playNext);

playPauseBtn.addEventListener('click', () => { playPause(playNum);});
nextBtn.addEventListener('click', playNext);
prevBtn.addEventListener('click', playPrev);


audio.addEventListener(
    "loadeddata",
    () => {
      document.querySelector('.durationTime').innerHTML = getTimeCodeFromNum(
        audio.duration
      );
      timeline.setAttribute("max", audio.duration);
    },
    false
  );


timeline.addEventListener("click", e => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
    audio.currentTime = timeToSeek;
    
    // timeline.setAttribute("value", audio.currentTime); 
}, false);



setInterval(WhilePlaying = () => {
    timeline.setAttribute("value", audio.currentTime);
    
    document.querySelector(".currentTime").innerHTML = getTimeCodeFromNum(
      audio.currentTime
    );
}, 500);

audio.addEventListener("timeupdate", () => {
      timeline.value = audio.currentTime;
    }
);

function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;
  
    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
      seconds % 60
    ).padStart(2, 0)}`;
  }