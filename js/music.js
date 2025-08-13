// 샘플 음악 데이터
const songs = [
  {
    title: "WISH (Korean Version)",
    duration: "03:05",
    src: "../assets/musics/WISH (Korean Version).mp3",
  },
  {
    title: "WISH (Japanese Version)",
    duration: "03:05",
    src: "../assets/musics/WISH (Japanese Version).mp3",
  },
  {
    title: "Songbird (Korean Version)",
    duration: "03:01",
    src: "../assets/musics/Songbird (Korean Version).mp3",
  },
  { 
    title: "Songbird (Japanese Version)",
    duration: "03:01",
    src: "../assets/musics/Songbird (Japanese Version).mp3",
  },
  {
    title: "Dunk Shot",
    duration: "02:59",
    src: "../assets/musics/Dunk Shot.mp3",
  },
  {
    title: "Steady",
    duration: "02:59",
    src: "../assets/musics/Steady.mp3",
  },
  {
    title: "NASA",
    duration: "03:03",
    src: "../assets/musics/NASA.mp3",
  },
  {
    title: "Melt Inside My Pocket",
    duration: "03:11",
    src: "../assets/musics/Melt Inside My Pocket.mp3",
  },
  {
    title: "poppop",
    duration: "03:02",
    src: "../assets/musics/poppop.mp3",
  }
];

let currentIndex = 0;
let isPlaying = false;

const audio = new Audio(songs[currentIndex].src);

const playButton = document.querySelector(
  ".button-box .button-item:nth-child(2)"
);
const prevButton = document.querySelector(
  ".button-box .button-item:nth-child(1)"
);
const nextButton = document.querySelector(
  ".button-box .button-item:nth-child(3)"
);
const icon = document.querySelector(".status-icon img");
const playImg = "./assets/images/music/button-play.png";
const pauseImg = "./assets/images/music/button-pause.png";
const playIcon = "./assets/images/music/icon-play.png";
const pauseIcon = "./assets/images/music/icon-pause.png";
const titleText = document.querySelector(".title-text");
const timeText = document.querySelector(".playing-time-title span");
const listContainer = document.querySelector(".list-container");

const volumeBar = document.querySelector(".volume-bar");
const volumePointer = document.querySelector(".volume-pointer");

let isDragging = false;

audio.addEventListener("ended", () => {
  if (currentIndex < songs.length - 1) {
    playNext();
  } else {
    // 마지막 곡일 경우 첫 곡으로
    playSong(0);
  }
});

audio.addEventListener("timeupdate", updateCurrentTime);

function updateCurrentTime() {
  const current = audio.currentTime;
  const minutes = Math.floor(current / 60);
  const seconds = Math.floor(current % 60);
  const formatted =
    `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  timeText.textContent = formatted;
}



function updateVolume(e) {
  e.preventDefault(); // 터치 이벤트 기본 스크롤 방지

  let clientX;

  if (e.touches) {
    // 터치 이벤트일 때 첫 번째 터치 좌표 사용
    clientX = e.touches[0].clientX;
  } else {
    // 마우스 이벤트일 때
    clientX = e.clientX;
  }

  const barRect = volumeBar.getBoundingClientRect();
  let x = clientX - barRect.left;

  x = Math.max(0, Math.min(x, barRect.width));

  const pointerHalf = volumePointer.offsetWidth / 2;
  volumePointer.style.left = `${x - pointerHalf}px`;

  const volume = x / barRect.width;
  audio.volume = volume;
}

// 마우스 드래그 시작
volumeBar.addEventListener("mousedown", (e) => {
  isDragging = true;
  updateVolume(e);
  document.body.style.userSelect = "none";
});

// 터치 드래그 시작
volumeBar.addEventListener("touchstart", (e) => {
  isDragging = true;
  updateVolume(e);
  document.body.style.userSelect = "none";
});

// 마우스 드래그 중
document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  updateVolume(e);
});

// 터치 드래그 중
document.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  updateVolume(e);
  e.preventDefault(); // 이게 꼭 있어야 함!
}, { passive: false });

// 마우스 드래그 끝
document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.userSelect = "";
});

// 터치 드래그 끝
document.addEventListener("touchend", () => {
  isDragging = false;
  document.body.style.userSelect = "";
});

function renderPlaylist() {
  listContainer.innerHTML = "";
  songs.forEach((song, index) => {
    const item = document.createElement("div");
    item.classList.add("list-item");

    const titleWrapper = document.createElement("div");
    titleWrapper.classList.add("list-title-wrapper");

    const title = document.createElement("div");
    title.classList.add("list-title");
    title.textContent = `${index + 1}. ${song.title}`;

    const time = document.createElement("div");
    time.classList.add("list-time");
    time.innerHTML = `<span>${song.duration}</span>`;

    titleWrapper.appendChild(title);
    item.appendChild(titleWrapper);
    item.appendChild(time);

    item.addEventListener("click", () => playSong(index));
    listContainer.appendChild(item);

    requestAnimationFrame(() => {
      if (title.scrollWidth > titleWrapper.clientWidth) {
        title.classList.add("scrolling-title");
      } else {
        title.classList.remove("scrolling-title");
      }
    });
  });
}

function updateUI() {
  const song = songs[currentIndex];
  titleText.textContent = song.title;
  timeText.textContent = "00:00";

  const allItems = document.querySelectorAll(".list-item");
  allItems.forEach((item, index) => {
    item.classList.toggle("now-playing", index === currentIndex);
  });

  // 스크롤 애니메이션 처리 for music-title
  // updateUI 함수 내부
  const musicTitleBox = document.querySelector(".music-title");
  const musicTitleText = document.querySelector(".title-text");
  if (musicTitleText.scrollWidth > musicTitleBox.clientWidth) {
    musicTitleText.classList.add("scrolling-title");
  } else {
    musicTitleText.classList.remove("scrolling-title");
  }
}

function togglePlayPause() {
  if (isPlaying) {
    audio.pause();
    playButton.querySelector("img").src = playImg;
    icon.src = pauseIcon;
  } else {
    audio.play();
    playButton.querySelector("img").src = pauseImg;
    icon.src = playIcon;
  }
  isPlaying = !isPlaying;
}

function playSong(index) {
  if (index < 0 || index >= songs.length) return;
  currentIndex = index;
  audio.src = songs[index].src;
  audio.load();
  updateUI();
  audio.play();
  icon.src = pauseIcon;
  playButton.querySelector("img").src = pauseImg;
  isPlaying = true;
}

function playNext() {
  if (currentIndex < songs.length - 1) {
    playSong(currentIndex + 1);
  }
}

function playPrev() {
  if (currentIndex > 0) {
    playSong(currentIndex - 1);
  }
}


// 첫 볼륨 세팅
function setPointerByVolume(volume) {
  const barWidth = volumeBar.offsetWidth;
  const pointerHalf = volumePointer.offsetWidth / 2;
  const x = barWidth * volume;
  volumePointer.style.left = `${x - pointerHalf}px`;
}



playButton.addEventListener("click", togglePlayPause);
nextButton.addEventListener("click", playNext);
prevButton.addEventListener("click", playPrev);

renderPlaylist();
audio.volume = 0.8;
setPointerByVolume(0.8);
updateUI();


