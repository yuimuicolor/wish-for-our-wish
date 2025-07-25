// 🌠 배경 위츄 떨어지기
const container = document.querySelector(".wichu-fall-bg");

function spawnWichu() {
  const wichu = document.createElement("div");
  wichu.classList.add("wichu-float");

  const randomLeft = Math.random() * window.innerWidth;
  wichu.style.left = `${randomLeft}px`;
  wichu.style.top = `-50px`;

  container.appendChild(wichu);

  setTimeout(() => {
    wichu.remove();
  }, 6000);
}

setInterval(spawnWichu, 400);

// 🌠 멤버 목록 & 상태값
const members = ["sion", "riku", "yushi", "jaehee", "ryo", "sakuya"];
let currentMember = null;
let currentAudio = null;

// 🌠 모달 요소들
const modal = document.getElementById("modal");
const startButton = document.querySelector(".start-button");
const closeBtn = modal.querySelector(".close-btn");
const modalCard = modal.querySelector(".modal-card");

// 🌠 이미지 요소
const bg = modal.querySelector(".modal-bg");
const closeBtnImg = modal.querySelector(".close-btn-img");
const title = modal.querySelector(".title-img");
const tamaBg = modal.querySelector(".tamagochi-bg");
const tamaImg = modal.querySelector(".tamagochi-img");const buttonStars = modal.querySelectorAll(".button-star");
const sub = modal.querySelector(".subtitle-img");

// 🌠 보이스 버튼들
const voiceButtons = document.querySelectorAll(".voice-button");

// 🌠 모달 열기 함수
const openRandomModal = () => {
  const key = members[Math.floor(Math.random() * members.length)];
  currentMember = key;

  // 이미지 교체
  bg.src = `./assets/images/todays-wish/background_${key}.png`;
  closeBtnImg.src = `./assets/images/todays-wish/close-btn-${key}.png`;
  title.src = `./assets/images/todays-wish/title_${key}.png`;
  tamaBg.src = `./assets/images/todays-wish/tamagochi_${key}.png`;
  tamaImg.src = `./assets/images/todays-wish/small_${key}.png`;
  buttonStars.forEach((img) => {
    img.src = `./assets/images/todays-wish/star_${key}.png`;
  });

  sub.src = `./assets/images/todays-wish/subtitle_${key}.png`;


  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
};

// 🌠 모달 닫기 함수
const closeModal = () => {
  modal.classList.add("hidden");
  document.body.style.overflow = "auto";

  // 오디오 정지
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
};

// 🌠 이벤트 연결

// 뽑기 버튼
startButton.addEventListener("click", openRandomModal);

// 닫기 버튼
closeBtn.addEventListener("click", closeModal);

// 모달 배경 클릭 → 닫힘
modal.addEventListener("click", closeModal);

// 모달 내부 클릭 → 닫힘 방지
modalCard.addEventListener("click", (e) => {
  e.stopPropagation();
});

// 보이스 버튼 클릭 이벤트
voiceButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (!currentMember) return;

    // 기존 오디오 정지
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    const voiceIndex = index + 1;
    const audio = new Audio(
      `../assets/voices/${currentMember}_${voiceIndex}.m4a`
    );
    currentAudio = audio;
    audio.play();
  });
});
