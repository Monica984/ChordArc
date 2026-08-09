const songs = {
  perfect: {
    title: "Perfect",
    artist: "Ed Sheeran",
    vibe: "sad",
    progression: ["G", "Em", "C", "D"]
  }
};

const modal = document.getElementById("modal");
const toast = document.getElementById("toast");
const searchResults = document.getElementById("searchResults");

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function showSong(key) {
  const song = songs[key];
  if (!song) return;
  document.body.dataset.vibe = song.vibe;
  document.getElementById("modalEyebrow").textContent = "SONG • GUITAR";
  document.getElementById("modalTitle").textContent = song.title;
  document.getElementById("modalArtist").textContent = song.artist;
  document.getElementById("modalProgression").innerHTML = song.progression.map(chord => `<b>${chord}</b>`).join("");
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function openChord(chord) {
  showToast(`${chord} chord lesson is next — we're building the learning library!`);
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
  document.body.dataset.vibe = "home";
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

document.getElementById("searchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const query = document.getElementById("songSearch").value.trim().toLowerCase();
  searchResults.innerHTML = "";
  if (!query) {
    showToast("Type a song or artist to search.");
    return;
  }
  const matches = Object.entries(songs).filter(([, song]) =>
    `${song.title} ${song.artist}`.toLowerCase().includes(query)
  );
  if (!matches.length) {
    searchResults.innerHTML = `<div class="search-result">No songs yet — this is where our community library will grow.</div>`;
    return;
  }
  matches.forEach(([key, song]) => {
    const item = document.createElement("div");
    item.className = "search-result";
    item.textContent = `${song.title} — ${song.artist}`;
    item.addEventListener("click", () => showSong(key));
    searchResults.appendChild(item);
  });
});

document.getElementById("modal").addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) closeModal();
});
