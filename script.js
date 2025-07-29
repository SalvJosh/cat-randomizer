console.log("Script loaded");

const img = document.getElementById("cat-img");
const fact = document.getElementById("cat-fact");
const imageBtn = document.getElementById("new-cat-img-btn");
const factBtn = document.getElementById("new-cat-fact-btn");

const saveImageBtn = document.getElementById("save-image-btn");
const saveFactBtn = document.getElementById("save-fact-btn");

const loadSavedBtn = document.getElementById("load-saved-btn");
const savedCatsDiv = document.getElementById("saved-cats");

// Load a new image from the API
async function loadImage() {
  try {
    const res = await fetch("/api/cats/image");
    const data = await res.json();
    console.log("Image response:", data);
    img.src = data.image;
  } catch (err) {
    console.error("Failed to load image:", err);
  }
}

// Load a new fact from the API
async function loadFact() {
  try {
    const res = await fetch("/api/cats/fact");
    const data = await res.json();
    fact.textContent = data.fact;
  } catch (err) {
    console.error("Failed to load fact:", err);
  }
}

// Save only the image
saveImageBtn?.addEventListener("click", async () => {
  const imageUrl = img?.src;
  if (!imageUrl || imageUrl === window.location.href) {
    alert("No image to save!");
    return;
  }

  try {
    const res = await fetch("/api/cats/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: imageUrl }),
    });

    const data = await res.json();
    if (res.ok) alert("Image saved!");
    else alert("Error: " + data.error);
  } catch (err) {
    console.error("Save image failed:", err);
    alert("Failed to save image.");
  }
});

// Save only the fact
saveFactBtn?.addEventListener("click", async () => {
  const factText = fact?.textContent;
  if (!factText || factText === "Loading...") {
    alert("No fact to save!");
    return;
  }

  try {
    const res = await fetch("/api/cats/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fact: factText }),
    });

    const data = await res.json();
    if (res.ok) alert("Fact saved!");
    else alert("Error: " + data.error);
  } catch (err) {
    console.error("Save fact failed:", err);
    alert("Failed to save fact.");
  }
});

// Load saved cats (only on saved.html)
if (loadSavedBtn && savedCatsDiv) {
  loadSavedBtn.addEventListener("click", async () => {
    try {
      const res = await fetch("/api/cats/saved");
      const cats = await res.json();

      if (cats.length === 0) {
        savedCatsDiv.innerHTML = "<p>No saved cats yet.</p>";
        return;
      }

      savedCatsDiv.innerHTML = cats
        .map(
          (cat) => `
          <div class="saved-cat">
            ${cat.image_url ? `<img src="${cat.image_url}" width="150" />` : ""}
            ${cat.fact ? `<p>${cat.fact}</p>` : ""}
          </div>
        `
        )
        .join("");
    } catch (err) {
      console.error("Failed to load saved cats:", err);
      savedCatsDiv.innerHTML = "<p>Error loading saved cats.</p>";
    }
  });
}

// Initial image/fact load
window.addEventListener("load", () => {
  loadImage();
  loadFact();
});

imageBtn.addEventListener("click", loadImage);
factBtn.addEventListener("click", loadFact);
