// 샘플 음악 데이터
const songs = [
  {
    title: "Tears Are Falldddddddddding (Japanese ver.)",
    duration: "4:25",
    src: "./music/sample1.mp3",
  },
  {
    title: "Shining Star (Korean ver.)",
    duration: "3:52",
    src: "./music/sample2.mp3",
  },
  {
    title: "With U Forever",
    duration: "5:10",
    src: "./music/sample3.mp3",
  },
  {
    title: "Tears Are Falldddddddddding (Japanese ver.)",
    duration: "4:25",
    src: "./music/sample1.mp3",
  },
  {
    title: "Shining Star (Korean ver.)",
    duration: "3:52",
    src: "./music/sample2.mp3",
  },
  {
    title: "With U Forever",
    duration: "5:10",
    src: "./music/sample3.mp3",
  },
  {
    title: "Tears Are Falldddddddddding (Japanese ver.)",
    duration: "4:25",
    src: "./music/sample1.mp3",
  },
  {
    title: "Shining Star (Korean ver.)",
    duration: "3:52",
    src: "./music/sample2.mp3",
  },
  {
    title: "With U Forever",
    duration: "5:10",
    src: "./music/sample3.mp3",
  },
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
const playImg = "./images/music/button-play.png";
const pauseImg = "./images/music/button-pause.png";
const playIcon = "./images/music/icon-play.png";
const pauseIcon = "./images/music/icon-pause.png";
const titleText = document.querySelector(".title-text");
const timeText = document.querySelector(".playing-time-title span");
const listContainer = document.querySelector(".list-container");

const volumeBar = document.querySelector(".volume-bar");
const volumePointer = document.querySelector(".volume-pointer");

let isDragging = false;

function updateVolume(e) {
  const barRect = volumeBar.getBoundingClientRect();
  let x = e.clientX - barRect.left;

  x = Math.max(0, Math.min(x, barRect.width));

  const pointerHalf = volumePointer.offsetWidth / 2;
  volumePointer.style.left = `${x - pointerHalf}px`;

  const volume = x / barRect.width;
  audio.volume = volume;
}

// 드래그 시작
volumeBar.addEventListener("mousedown", (e) => {
  isDragging = true;
  updateVolume(e);
  document.body.style.userSelect = "none";
});

// 드래그 중
document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  updateVolume(e);
});

// 드래그 끝
document.addEventListener("mouseup", () => {
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
  timeText.textContent = song.duration;

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
    icon.src = playIcon;
  } else {
    audio.play();
    playButton.querySelector("img").src = pauseImg;
    icon.src = pauseIcon;
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
setPointerByVolume(audio.volume);
updateUI();


