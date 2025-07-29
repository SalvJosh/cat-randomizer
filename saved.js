async function loadSavedCats() {
  try {
    const res = await fetch("/api/cats/saved");
    const cats = await res.json();

    const imagesDiv = document.getElementById("saved-images");
    const factsDiv = document.getElementById("saved-facts");

    imagesDiv.innerHTML = "";
    factsDiv.innerHTML = "";

    cats.forEach((cat) => {
      const wrapper = document.createElement("div");
      wrapper.className = "saved-cat";

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.innerHTML = "&times;";
      deleteBtn.title = "Delete";

      deleteBtn.addEventListener("click", async () => {
        const confirmDelete = confirm("Are you sure you want to delete this?");
        if (!confirmDelete) return;

        const res = await fetch(`/api/cats/saved/${cat.id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          wrapper.remove();
        } else {
          alert("Failed to delete.");
        }
      });

      wrapper.appendChild(deleteBtn);

      if (cat.image_url) {
        const img = document.createElement("img");
        img.src = cat.image_url;
        img.alt = "Saved cat image";
        img.className = "saved-img";
        wrapper.appendChild(img);
      }

      if (cat.fact) {
        const p = document.createElement("p");
        p.textContent = cat.fact;
        wrapper.appendChild(p);
      }

      if (cat.image_url && !cat.fact) imagesDiv.appendChild(wrapper);
      else if (cat.fact && !cat.image_url) factsDiv.appendChild(wrapper);
      else {
        // has both
        imagesDiv.appendChild(wrapper.cloneNode(true));
        factsDiv.appendChild(wrapper);
      }
    });
  } catch (err) {
    console.error("Failed to load saved cats:", err);
  }
}

// Modal Elements
const modal = document.getElementById("img-modal");
const modalImg = document.getElementById("modal-img");
const modalText = document.getElementById("modal-text");
const closeModal = document.querySelector(".modal .close");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

let savedImageUrls = [];
let savedFactTexts = [];
let currentIndex = 0;
let isShowingFacts = false;

// Event listener for image or fact click
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("saved-img")) {
    savedImageUrls = [...document.querySelectorAll(".saved-img")].map(
      (img) => img.src
    );
    currentIndex = savedImageUrls.indexOf(e.target.src);
    isShowingFacts = false;
    showModalImage();
  } else if (e.target.tagName === "P" && e.target.closest(".saved-cat")) {
    savedFactTexts = [...document.querySelectorAll(".saved-cat p")].map(
      (p) => p.textContent
    );
    currentIndex = savedFactTexts.indexOf(e.target.textContent);
    isShowingFacts = true;
    showModalFact();
  }
});

function showModalImage() {
  modalImg.style.display = "block";
  modalText.style.display = "none";
  modalImg.src = savedImageUrls[currentIndex];
  modal.style.display = "block";
}

function showModalFact() {
  modalText.style.display = "block";
  modalImg.style.display = "none";
  modalText.textContent = savedFactTexts[currentIndex];
  modal.style.display = "block";
}

// Close modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// Navigate modal content
nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (isShowingFacts) {
    currentIndex = (currentIndex + 1) % savedFactTexts.length;
    showModalFact();
  } else {
    currentIndex = (currentIndex + 1) % savedImageUrls.length;
    showModalImage();
  }
});

prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (isShowingFacts) {
    currentIndex =
      (currentIndex - 1 + savedFactTexts.length) % savedFactTexts.length;
    showModalFact();
  } else {
    currentIndex =
      (currentIndex - 1 + savedImageUrls.length) % savedImageUrls.length;
    showModalImage();
  }
});

// Keyboard controls
document.addEventListener("keydown", (e) => {
  if (modal.style.display !== "block") return;

  switch (e.key) {
    case "ArrowRight":
      if (isShowingFacts) {
        currentIndex = (currentIndex + 1) % savedFactTexts.length;
        showModalFact();
      } else {
        currentIndex = (currentIndex + 1) % savedImageUrls.length;
        showModalImage();
      }
      break;
    case "ArrowLeft":
      if (isShowingFacts) {
        currentIndex =
          (currentIndex - 1 + savedFactTexts.length) % savedFactTexts.length;
        showModalFact();
      } else {
        currentIndex =
          (currentIndex - 1 + savedImageUrls.length) % savedImageUrls.length;
        showModalImage();
      }
      break;
    case "Escape":
      modal.style.display = "none";
      break;
  }
});

window.addEventListener("load", loadSavedCats);
