const playButton = document.getElementById("play");
const song = document.getElementById("song");
const coverPlay = document.getElementById("player")
const pauseButton = document.getElementById("pause");
const nextButton =  document.getElementById("forward");
const previousButton =  document.getElementById("backward");
const songName = document.getElementById("song-name");
const songThumbnail = document.getElementById("thumbnail-image");
const coverThumbnail = document.getElementById("thumbnail-cover");
const controlThumbnail = document.getElementById("thumbnail-control");
const currentSong = document.getElementsByClassName("song-list");
const progressBar = document.getElementById("progress-bar");



var songsQueue = ['Mehrama - Love Aaj kal.mp3', 'Rahogi Meri - Love Aaj Kal.mp3','Shayad - Love Aaj Kal.mp3'], 
    songsQueueIndex = 0,
    thumbnails = ['mehrama.jpg', 'rahogi-meri.jpg','shayad.jpg']
    title = ['Mehrama - Love Aaj kal | Darshan RaWal', 'Rahogi Meri - Love Aaj Kal | Arijit Singh','Shayad - Love Aaj Kal | Arijit Singh'];

var isPlaying = true;
const playPause = () => {
    if (isPlaying){
        song.play();
        isPlaying = false;
        playButton.style.display = "none";
        pauseButton.style.display = "block";
    }
    else {
        song.pause();
        isPlaying = true;
        pauseButton.style.display = "none";
        playButton.style.display = "block";
    }
    
}

const nextSong = () =>{
    songsQueueIndex++;
    if(songsQueueIndex > songsQueue.length-1 ) songsQueueIndex = 0;
    song.src = songsQueue[songsQueueIndex];
    songName.innerText = title[songsQueueIndex];
    songThumbnail.src = thumbnails[songsQueueIndex];
    coverThumbnail.src = thumbnails[songsQueueIndex];
    controlThumbnail.src = thumbnails[songsQueueIndex];
    console.log(songsQueueIndex);
    if(songsQueueIndex != 0) currentSong[songsQueueIndex - 1].classList.remove("active");
    else currentSong[songsQueueIndex + songsQueue.length-1].classList.remove("active");
    currentSong[songsQueueIndex].classList.add("active");
    isPlaying = true;
    playPause();
    console.log(songsQueueIndex);

}

const previousSong = () =>{
    songsQueueIndex--;
    if(songsQueueIndex < 0 ) songsQueueIndex = songsQueue.length-1;
    song.src = songsQueue[songsQueueIndex];
    songName.innerText = title[songsQueueIndex];
    songThumbnail.src = thumbnails[songsQueueIndex];
    coverThumbnail.src = thumbnails[songsQueueIndex];
    controlThumbnail.src = thumbnails[songsQueueIndex];
    console.log(songsQueueIndex);
    if(songsQueueIndex != songsQueue.length-1) currentSong[songsQueueIndex+1].classList.remove("active");
    else currentSong[songsQueueIndex -(songsQueue.length-1)].classList.remove("active");
    currentSong[songsQueueIndex].classList.add("active");
    isPlaying = true;
    playPause();
    // console.log(songsQueueIndex);

}

playButton.onclick = () =>{
    playPause();
   
}

pauseButton.onclick = () =>{
    playPause();
    
}

coverPlay.onclick = () =>{
    playPause();
}

nextButton.onclick = () =>{
    nextSong();

}

previousButton.onclick = () =>{
    previousSong();
}


currentSong[0].onclick = () =>{
    songsQueueIndex = -1;
    nextSong();    
}
currentSong[1].onclick = () =>{
    songsQueueIndex = 0;
    nextSong();
}
currentSong[2].onclick = () =>{
    songsQueueIndex = 1;
    nextSong();
}

const updateProgress = ()=>{
    progressBar.max = song.duration;
    progressBar.value = song.currentTime;
}

setInterval(updateProgress, 700);


progressBar.addEventListener('change',()=>{
    song.currentTime = progressBar.value;
    if(song.currentTime === song.duration){
        nextSong();
    }
})

progressBar.addEventListener('click',()=>{
    song.currentTime = progressBar.value;
})

song.addEventListener("ended", ()=>{
    nextSong();
})