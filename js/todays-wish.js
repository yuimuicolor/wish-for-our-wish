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

function openRandomModal() {
  currentMember = members[Math.floor(Math.random() * members.length)];

  modalImg.src = `./assets/images/todays-wish/card-${currentMember}.png`;
  closeBtnImg.src = `./assets/images/todays-wish/close-btn-${currentMember}.png`;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

document.querySelector(".start-button").addEventListener("click", openRandomModal);

document.getElementById("closeModal").addEventListener("click", () => {
  modal.classList.add("hidden");
  document.body.style.overflow = "auto";
});

modal.addEventListener("click", () => {
  modal.classList.add("hidden");
  document.body.style.overflow = "auto";
});

modal.querySelector(".modal-content-container").addEventListener("click", (e) => {
  e.stopPropagation();
});

// 보이스 버튼
const voiceButtons = document.querySelectorAll(".voice-button");

voiceButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (!currentMember) return;

    const voiceIndex = index + 1;
    const audio = new Audio(`../assets/voices/${currentMember}_${voiceIndex}.m4a`);
    audio.play();
  });
});
