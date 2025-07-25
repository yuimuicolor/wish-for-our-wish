const memberData = {
  sion: {
    name: "SION",
    gradient: ["#AA80FF", "#7A44E6"],
    textColor: "#7A44E6",
    textContents: ["시온 SION シオン", "2002.05.11", "Mokpo, Korea", "🌷"],
    mainImage: "./assets/images/ourwish/sion.jpg",
    images: [
      "./assets/images/ourwish/sion2.jpg",
      "./assets/images/ourwish/sion3.jpg",
      "./assets/images/ourwish/sion4.jpg",
    ],
    smallImages: [
      "./assets/images/ourwish/small-sion2.jpg",
      "./assets/images/ourwish/small-sion3.jpg",
      "./assets/images/ourwish/small-sion4.jpg",
    ],
  },
  riku: {
    name: "RIKU",
    gradient: ["#F6527B", "#E33560"],
    textColor: "#E33560",
    textContents: ["리쿠 RIKU リク", "2003.06.28", "Fukui, Japan", "🐿️🐈‍⬛"],
    mainImage: "./assets/images/ourwish/riku.jpg",
    images: [
      "./assets/images/ourwish/riku2.jfif",
      "./assets/images/ourwish/riku3.jfif",
      "./assets/images/ourwish/riku4.jfif",
    ],
    smallImages: [
      "./assets/images/ourwish/small-riku2.jpg",
      "./assets/images/ourwish/small-riku3.jpg",
      "./assets/images/ourwish/small-riku4.jpg",
    ],
  },
  yushi: {
    name: "YUSHI",
    gradient: ["#35B8EB", "#2D9ECA"],
    textColor: "#2D9ECA",
    textContents: ["유우시 YUSHI ユウシ", "2004.04.05", "Tokyo, Japan", "⭐🐈"],
    mainImage: "./assets/images/ourwish/yushi.jpg",
    images: [
      "./assets/images/ourwish/yushi2.jfif",
      "./assets/images/ourwish/yushi3.jfif",
      "./assets/images/ourwish/yushi4.jfif",
    ],
    smallImages: [
      "./assets/images/ourwish/small-yushi2.jpg",
      "./assets/images/ourwish/small-yushi3.jpg",
      "./assets/images/ourwish/small-yushi4.jpg",
    ],
  },
  jaehee: {
    name: "JAEHEE",
    gradient: ["#47F058", "#1ACA2C"],
    textColor: "#1ACA2C",
    textContents: ["재희 JAEHEE ジェヒ", "2005.06.21", "Daegu, Korea", "🌳"],
    mainImage: "./assets/images/ourwish/jaehee.jpg",
    images: [
      "./assets/images/ourwish/jaehee2.jfif",
      "./assets/images/ourwish/jaehee3.jfif",
      "./assets/images/ourwish/jaehee4.jfif",
    ],
    smallImages: [
      "./assets/images/ourwish/small-jaehee2.jpg",
      "./assets/images/ourwish/small-jaehee3.jpg",
      "./assets/images/ourwish/small-jaehee4.jpg",
    ],
  },
  ryo: {
    name: "RYO",
    gradient: ["#DBEB28", "#CDDE19"],
    textColor: "#CDDE19",
    textContents: ["료 RYO リョウ", "2007.08.04", "Kyoto, Japan", "🦭"],
    mainImage: "./assets/images/ourwish/ryo.jpg",
    images: [
      "./assets/images/ourwish/ryo2.jpg",
      "./assets/images/ourwish/ryo3.jpg",
      "./assets/images/ourwish/ryo4.jpg",
    ],
    smallImages: [
      "./assets/images/ourwish/small-ryo2.jpg",
      "./assets/images/ourwish/small-ryo3.jpg",
      "./assets/images/ourwish/small-ryo4.jpg",
    ],
  },
  sakuya: {
    name: "SAKUYA",
    gradient: ["#FF5ACB", "#EF00A4"],
    textColor: "#EF00A4",
    textContents: [
      "사쿠야 SAKUYA サクヤ",
      "2007.11.18",
      "Saitama, Japan",
      "🥐🐼",
    ],
    mainImage: "./assets/images/ourwish/sakuya.jpg",
    images: [
      "./assets/images/ourwish/sakuya2.jpg",
      "./assets/images/ourwish/sakuya3.jpg",
      "./assets/images/ourwish/sakuya4.jpg",
    ],
    smallImages: [
      "./assets/images/ourwish/small-sakuya2.jpg",
      "./assets/images/ourwish/small-sakuya3.jpg",
      "./assets/images/ourwish/small-sakuya4.jpg",
    ],
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal-template");
  const photoModal = document.getElementById("photoModal");
  const photoModalImg = document.getElementById("photoModalImg");
 
  const textTitles = modal.querySelectorAll(".text-title");
  const textContents = modal.querySelectorAll(".text-content");
  const photoBoxes = modal.querySelectorAll(".photo-box img");
  const mainPhoto = modal.querySelector(
    ".modal-content-box-right .modal-photo-container img"
  );
  const gradientTarget = modal.querySelector(".modal-content-container");
  const nameSpan = modal.querySelector(".modal-name");
  const cards = document.querySelectorAll(".card");

  // 💫 멤버 상세 모달 열기
  const openMemberModal = (memberKey) => {
    const data = memberData[memberKey];
    if (!data) return;

    // 텍스트 색상 & 내용 적용
    textTitles.forEach((el) => (el.style.color = data.textColor || "#000"));
    textContents.forEach((el, i) => {
      el.innerText = data.textContents[i] || "";
    });

    // 사진 적용
    // 썸네일 적용 및 클릭 이벤트 연결
    photoBoxes.forEach((imgEl, i) => {
      // 썸네일 이미지 넣기
      imgEl.src = data.smallImages?.[i] || data.images[i] || "";

      // 클릭하면 원본 이미지로 열리도록
      imgEl.onclick = () => {
        openPhotoModal(data.images[i]);
      };
    });

    mainPhoto.src = data.mainImage || "";

    // 그라디언트 배경
    gradientTarget.style.background = `linear-gradient(180deg, ${data.gradient[0]} 0%, #fff 25%, #fff 73.56%, ${data.gradient[1]} 100%)`;

    // 이름 텍스트
    nameSpan.innerText = data.name;
    nameSpan.style.fontSize =
      memberKey === "sakuya"
        ? "62px"
        : memberKey === "jaehee"
        ? "68px"
        : "80px";

    // 이름 그라디언트
    nameSpan.style.background = `linear-gradient(180deg, ${data.gradient[0]} 0%, #fff 50%, ${data.gradient[1]} 100%)`;
    nameSpan.style.webkitBackgroundClip = "text";
    nameSpan.style.backgroundClip = "text";
    nameSpan.style.webkitTextFillColor = "transparent";

    modal.classList.remove("hidden");
  };

  // 💫 이미지 클릭 시 확대 모달 열기
  const openPhotoModal = (src) => {
    if (!src) return;

    const closeBtn = photoModal.querySelector(".modal-photo-close");
    closeBtn.style.display = "none";

    // 이미지 로딩 완료 후 버튼 보여주기
    photoModalImg.onload = () => {
   
      const imgHeight = photoModalImg.clientHeight;
      const imgTop = photoModalImg.offsetTop;

      // 버튼 위치를 이미지 기준으로 세팅
      closeBtn.style.top = `${imgTop + 10}px`;
      closeBtn.style.right = `10px`;

      closeBtn.style.display = "block";
    };

    photoModalImg.src = src;
    photoModal.classList.remove("hidden");
  };

  mainPhoto.addEventListener("click", () => {
    openPhotoModal(mainPhoto.src);
  });

  // 공통 모달 닫기 처리
  const setupModalClose = (modalElement, closeSelector) => {
    modalElement.querySelectorAll(closeSelector).forEach((btn) => {
      btn.addEventListener("click", () => {
        modalElement.classList.add("hidden");
      });
    });

    modalElement.querySelectorAll(".modal-overlay").forEach((overlay) => {
      overlay.addEventListener("click", () => {
        modalElement.classList.add("hidden");
      });
    });
  };

  // 이벤트 연결
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      openMemberModal(card.dataset.member);
    });
  });

  photoBoxes.forEach((imgEl) => {
    imgEl.addEventListener("click", () => {
      openPhotoModal(imgEl.src);
    });
  });

  // 닫기 이벤트 설정
  setupModalClose(modal, ".modal-close");
  setupModalClose(photoModal, ".modal-photo-close");
});
