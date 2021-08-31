const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const preBtn = document.getElementById("prev");
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const progressContainer = document.getElementById('progress-container');
let isPlaying = false;

const songs = [
{
	name: "jacinto-1",
	displayName: "song A",
	artist: "artist A",
},
{
	name: "jacinto-2",
	displayName: "song B",
	artist: "artist B",
},
{
	name: "jacinto-3",
	displayName: "song C",
	artist: "artist C",
},
{
	name: "metric-1",
	displayName: "song D",
	artist: "artist D",
},

];




function playSong(){
	isPlaying = true;
	playBtn.classList.replace("fa-play", "fa-pause");
	playBtn.setAttribute("title", "Pause");
	music.play();
}

function pauseSong(){
	isPlaying = false;
	playBtn.classList.replace("fa-pause", "fa-play");
	playBtn.setAttribute("title", "Play");
	music.pause();
}

playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

function loadSong(song){
	title.textContent = song.displayName;
	artist.textContent = song.artist;
	music.src = `music/${song.name}.mp3`;
	image.src = `img/${song.name}.jpeg`
}

let songIndex = 0;

function prevSong(){
	songIndex--;
	if(songIndex < 0){
		songIndex = songs.length - 1;
	}
	
	loadSong(songs[songIndex]);
	playSong();
}


function nextSong(){
	songIndex++;
	if(songIndex > songs.length - 1){
		songIndex = 0;
	}
	console.log(songIndex);
	loadSong(songs[songIndex]);
	playSong();
}

function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

loadSong(songs[songIndex]);

music.addEventListener("ended", nextSong);
preBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);