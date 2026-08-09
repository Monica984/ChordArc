const songs = {
  perfect: {
    title: "Perfect",
    artist: "Ed Sheeran",
    vibe: "sad",
    progression: ["G", "Em", "C", "D"]
  }
};

const $ = (id) => document.getElementById(id);
const modal = $("modal");
const toast = $("toast");
const searchResults = $("searchResults");

function showSong(key) {
  const song = songs[key];
  if (!song || !modal) return;

  document.body.dataset.vibe = song.vibe;
  const eyebrow = $("modalEyebrow");
  if (eyebrow) eyebrow.textContent = "SONG • GUITAR";
  if ($("modalTitle")) $("modalTitle").textContent = song.title;
  if ($("modalArtist")) $("modalArtist").textContent = song.artist;
  if ($("modalProgression")) {
    $("modalProgression").innerHTML = song.progression.map(chord => `<b>${chord}</b>`).join("");
  }
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = "";
  document.body.dataset.vibe = "home";
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

if ($("searchForm")) {
  $("searchForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!searchResults || !$("songSearch")) return;
    const query = $("songSearch").value.trim().toLowerCase();
    searchResults.innerHTML = "";
    if (!query) {
      showToast("Type a song or artist to search.");
      return;
    }

    const matches = Object.entries(songs).filter(([, song]) =>
      `${song.title} ${song.artist}`.toLowerCase().includes(query)
    );

    if (!matches.length) {
      searchResults.innerHTML = `<div class="search-result">No match yet. Try another song or artist.</div>`;
      return;
    }

    matches.forEach(([key, song]) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "search-result";
      item.textContent = `${song.title} — ${song.artist}`;
      item.addEventListener("click", () => showSong(key));
      searchResults.appendChild(item);
    });
  });
}

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && !modal.hidden) closeModal();
});
