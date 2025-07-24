const container = document.querySelector(".wichu-fall-bg");

function spawnWichu() {
  const wichu = document.createElement("div");
  wichu.classList.add("wichu-float");

  const randomLeft = Math.random() * window.innerWidth;
  wichu.style.left = `${randomLeft}px`;
  wichu.style.top = `-100px`; // 화면 위에서 시작

  container.appendChild(wichu);

  setTimeout(() => {
    wichu.remove();
  }, 6000);
}

setInterval(() => {
  spawnWichu();
}, 400);

// 모달 관련
const modal = document.getElementById("modal");
const modalImg = modal.querySelector(".modal-image-wrapper img");
const closeBtnImg = modal.querySelector("#closeModal img");
const members = ["sion", "riku", "yushi", "jaehee", "ryo", "sakuya"];
let currentMember = null;

// function openRandomModal() {
//   currentMember = members[Math.floor(Math.random() * members.length)];

//   modalImg.src = `./assets/images/todays-wish/card-${currentMember}.png`;
//   closeBtnImg.src = `./assets/images/todays-wish/close-btn-${currentMember}.png`;

//   modal.classList.remove("hidden");
//   document.body.style.overflow = "hidden";
// }

function openRandomModal() {
  currentMember = members[Math.floor(Math.random() * members.length)];

  // modalImg.style.opacity = "0"; // 이미지 먼저 숨김
  closeBtnImg.style.opacity = "0";

  const realModalImg = `./assets/images/todays-wish/card-${currentMember}.png`;
  const realCloseImg = `./assets/images/todays-wish/close-btn-${currentMember}.png`;

  modalImg.src = "../assets/images/loading.gif"; // 로딩 이미지로 초기화

  // 진짜 이미지 미리 로드
  const preloadMain = new Image();
  const preloadClose = new Image();

  preloadMain.onload = () => {
    modalImg.src = realModalImg;
    // requestAnimationFrame(() => {
    //   modalImg.style.transition = "opacity 0.4s ease-in-out";
    //   modalImg.style.opacity = "1";
    // });
  };

  preloadClose.onload = () => {
    closeBtnImg.src = realCloseImg;
    requestAnimationFrame(() => {
      closeBtnImg.style.transition = "opacity 0.4s ease-in-out";
      closeBtnImg.style.opacity = "1";
    });
  };

  preloadMain.src = realModalImg;
  preloadClose.src = realCloseImg;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}


document
  .querySelector(".start-button")
  .addEventListener("click", openRandomModal);

document.getElementById("closeModal").addEventListener("click", () => {
  modal.classList.add("hidden");
  document.body.style.overflow = "auto";
});

modal.addEventListener("click", () => {
  modal.classList.add("hidden");
  document.body.style.overflow = "auto";
});

modal
  .querySelector(".modal-content-container")
  .addEventListener("click", (e) => {
    e.stopPropagation();
  });

// 보이스 버튼
const voiceButtons = document.querySelectorAll(".voice-button");

voiceButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (!currentMember) return;

    const voiceIndex = index + 1;
    const audio = new Audio(
      `../assets/voices/${currentMember}_${voiceIndex}.m4a`
    );
    audio.play();
  });
});
