const songs = [
    { title: 'Aayi Nai', artist: 'Song-by : Sachin, Jigar', src: './music/Aayi Nai.mp3', cover: './cover/cover4.jpg' },
    { title: 'Hauli Hauli', artist: 'Song-by : Garry Sandhu, Neha Kakkar', src: './music/Hauli Hauli.mp3', cover: './cover/cover2.jpg' },
    { title: 'Ram Siya Ram', artist: 'Song-by : Parampara, Sanchet', src: './music/Ram Siya Ram.mp3', cover: './cover/cover3.jpg' }
];

let songIndex = 0;
const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const coverImage = document.getElementById('cover-image');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressContainer = document.getElementById('progress');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = song.src;
    coverImage.src = song.cover;
}

function playSong() {
    audio.play();
    playBtn.innerText = 'Pause';
    playBtn.classList.add('playing');
}

function pauseSong() {
    audio.pause();
    playBtn.innerText = 'Play';
    playBtn.classList.remove('playing');
}

playBtn.addEventListener('click', () => {
    const isPlaying = playBtn.classList.contains('playing');
    isPlaying ? pauseSong() : playSong();
});

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

  
    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);

    currentTimeEl.innerText = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    durationEl.innerText = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
}

function setProgress(e) {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}


audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);

loadSong(songs[songIndex]);
