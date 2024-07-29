const image = document.querySelector('img');
const titulo = document.getElementById('titulo');
const artista = document.getElementById('artista');
const music = document.getElementById('audio');

const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');
const tiempoActual = document.getElementById('tiempoActual');
const duracion = document.getElementById('tiempoDuracion');
const botonListaCanciones = document.querySelector('#playList');
const listaCanciones = document.querySelector('#listaDecanciones');

const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const repetirBtn = document.getElementById('mezclar');

const songs = [
    { name: 'song1', displayName: 'Mal Bicho', artista: 'Fabulosos' },
    { name: 'song2', displayName: 'Molinos de Viento', artista: 'Mago de Oz' },
    { name: 'song3', displayName: 'Aguita Amarilla', artista: 'Los Toreros Muertos' },
    { name: 'song4', displayName: 'Sexo', artista: 'los Prisioneros' },
    { name: 'song5', displayName: 'Fabricando Fantasias', artista: 'lTito Nieves' },
    { name: 'song6', displayName: 'Te va a Doler', artista: 'Maelo Ruiz' },
    { name: 'song7', displayName: 'Ella y Tu', artista: 'Joe Arroyo' },
    { name: 'song8', displayName: 'Corazon de Acero', artista: 'Yiyo Sarate' }
];

let isPlaying = false;
let songIndex = 0;

function playSong() {
    isPlaying = true;
    playBtn.classList.remove('fa-play');
    playBtn.classList.add('fa-pause');
    music.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.classList.remove('fa-pause');
    playBtn.classList.add('fa-play');
    music.pause();
}

function loadSong(song) {
    titulo.textContent = song.displayName;
    artista.textContent = song.artista;
    music.src = `audios/${song.name}.mp3`; 
    image.src = `img/${song.name}.jpg`;    
    listaCanciones.classList.remove('active')
}

function prevSongs() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSongs() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function playRandomSong() {
    songIndex = Math.floor(Math.random() * songs.length); 
    loadSong(songs[songIndex]);
    playSong();
}

function updateBarProgres() {
    const { duration, currentTime } = music;
    const porcentajeProgreso = (currentTime / duration) * 100;
    progress.style.width = `${porcentajeProgreso}%`; 

    tiempoActual.textContent = formatTime(currentTime);
    duracion.textContent = formatTime(duration);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function setProgress(e) {
    const width = progressContainer.clientWidth;
    const clickPosition = e.offsetX;
    const duration = music.duration;

    music.currentTime = (clickPosition / width) * duration;
}

document.querySelectorAll('.caratula').forEach(button => {
    button.addEventListener('click', () => {
        const songName = button.getAttribute('data-song');
        const song = songs.find(s => s.name === songName);
        if (song) {
            loadSong(song);
            playSong();
        }
    });
});

document.querySelectorAll('.caratula1').forEach(button => {
    button.addEventListener('click', () => {
        const songName = button.getAttribute('data-song');
        const song = songs.find(s => s.name === songName);
        if (song) {
            loadSong(song);
            playSong();
        }
    });
});



playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener('click', prevSongs);
nextBtn.addEventListener('click', nextSongs);
repetirBtn.addEventListener('click', function() {
    playRandomSong();
});
botonListaCanciones.addEventListener('click', ()=>{
        listaCanciones.classList.toggle('active')
    })
music.addEventListener('ended', nextSongs);
music.addEventListener('timeupdate', updateBarProgres);
progressContainer.addEventListener('click', setProgress);

loadSong(songs[songIndex]);





