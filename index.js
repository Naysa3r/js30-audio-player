let isPlay = true;
let playNum = 0;
const tracks = ['./assets/audio/beyonce.mp3', './assets/audio/dontstartnow.mp3'];

const playPauseBtn = document.querySelector('.play-pause');
const nextBtn = document.querySelector('.next-song');
const prevBtn = document.querySelector('.previous-song');
const audio = new Audio();

function playPause(playNum) {
    
    if (isPlay) {
    audio.src = tracks[playNum];
    audio.currentTime = 0;
    audio.play();
    isPlay = !isPlay;
    playPauseBtn.classList.add('pause');
    }
    else {
        audio.pause();
        isPlay = !isPlay;
        playPauseBtn.classList.remove('pause');
    }
    
    

}
function playNext() {
    if(!isPlay) {isPlay = true;}
    playPauseBtn.classList.add('pause');
    playNum++;
    if (playNum >= tracks.length) {
        playNum = tracks.length - 1;
    }
    playPause(playNum);
}
function playPrev() {
    if(!isPlay) {isPlay = true;}
    playPauseBtn.classList.add('pause');
    playNum--;
    if (playNum < 0) {
        playNum = 0;
    }
    playPause(playNum);
}
playPauseBtn.addEventListener('click', () => { playPause(playNum);});
nextBtn.addEventListener('click', playNext);
prevBtn.addEventListener('click', playPrev);
