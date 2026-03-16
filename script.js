// ============================================================
// ANES GRAPHICS — Script.js
// Slider interactif + interactions UI
// ============================================================

// ============================================================
// CONFIGURATION FACILE — Modifiez ces valeurs ici
// ============================================================
const DISCORD_LINK = "https://discord.gg/GEgBQjeGy4";

const SLIDER_IMAGES = [
  {
    src: "https://media.discordapp.net/attachments/1481603541490602045/1481672396183437322/IMG_1153.png?ex=69b8c7b3&is=69b77633&hm=df13863629b18701251171b026ced1f6f257418abcf0df6d724377f5a5b82a03&=&format=webp&quality=lossless",
    alt: "Aperçu dossier FiveM — Image 1"
  },
  {
    src: "https://media.discordapp.net/attachments/1481603671837114509/1481672577985548459/IMG_1150.png?ex=69b8c7de&is=69b7765e&hm=5fb9a3596f899c7c80e581476f8bd90974a12dcb4fd47a52e9b1ca799956bf8a&=&format=webp&quality=lossless&width=550&height=309",
    alt: "Aperçu dossier FiveM — Image 2"
  },
  {
    src: "https://media.discordapp.net/attachments/1481603671837114509/1481672692477464647/IMG_1156.png?ex=69b8c7fa&is=69b7767a&hm=10088a5893bd89e883f261fb336c198bc3aa8cce7d94fa3103aaa88baba61cb6&=&format=webp&quality=lossless",
    alt: "Aperçu dossier FiveM — Image 3"
  },
  {
    src: "https://media.discordapp.net/attachments/1481603541490602045/1481672351874551989/fb_mara.png?ex=69b8c7a8&is=69b77628&hm=eef9b46d1b8258f2b872bf978f4dbd66ed1fc5003154cc397cea579cdc533bfa&=&format=webp&quality=lossless&width=550&height=309",
    alt: "Aperçu dossier FiveM — Image 4"
  },
  {
    src: "https://media.discordapp.net/attachments/1481603541490602045/1481672440190074890/9392E934-7424-44B6-A33F-69DF93900C9B.png?ex=69b8c7bd&is=69b7763d&hm=8329d7284e79ec488101adbb7e6b739cbb39b089db64ebc55cbf85cb3e8d57f3&=&format=webp&quality=lossless",
    alt: "Aperçu dossier FiveM — Image 5"
  }
];

const TIKTOK_CONFIG = {
  link: "https://vm.tiktok.com/ZNRHwHxbd/",
  thumbnail: "https://media.discordapp.net/attachments/1481603671837114509/1481672505453318275/IMG_1149.png?ex=69b8c7cd&is=69b7764d&hm=4224b1f57f51b689fae685fe3e609bfde4fd461a6288013eedb84d9ccfe7ed44&=&format=webp&quality=lossless&width=550&height=313",
  title: "Dernier dossier FiveM disponible 🔥",
  buttonText: "Voir le TikTok",
  username: "@.bftss"
};
// ============================================================

// === SLIDER STATE ===
let currentIndex = 0;
let isTransitioning = false;

// === DOM REFS ===
const sliderImg = document.getElementById('slider-img');
const slideCounter = document.getElementById('slide-counter');
const progressBar = document.getElementById('slider-progress-bar');
const dotsContainer = document.getElementById('slider-dots');

// === RENDER SLIDER ===
function updateSlider() {
  if (!sliderImg) return;

  sliderImg.classList.add('fade-out');

  setTimeout(() => {
    sliderImg.src = SLIDER_IMAGES[currentIndex].src;
    sliderImg.alt = SLIDER_IMAGES[currentIndex].alt;
    sliderImg.classList.remove('fade-out');
  }, 175);

  // Counter
  if (slideCounter) slideCounter.textContent = `${currentIndex + 1} / ${SLIDER_IMAGES.length}`;

  // Progress bar
  if (progressBar) {
    const pct = ((currentIndex + 1) / SLIDER_IMAGES.length) * 100;
    progressBar.style.width = pct + '%';
  }

  // Dots
  if (dotsContainer) {
    const dots = dotsContainer.querySelectorAll('.slider-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }
}

function goTo(index) {
  if (isTransitioning) return;
  isTransitioning = true;
  currentIndex = ((index % SLIDER_IMAGES.length) + SLIDER_IMAGES.length) % SLIDER_IMAGES.length;
  updateSlider();
  setTimeout(() => { isTransitioning = false; }, 350);
}

function goNext() { goTo(currentIndex + 1); }
function goPrev() { goTo(currentIndex - 1); }

// === BUILD DOTS ===
function buildDots() {
  if (!dotsContainer) return;
  dotsContainer.innerHTML = '';
  SLIDER_IMAGES.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'slider-dot' + (i === 0 ? ' active' : '');
    btn.setAttribute('aria-label', `Aller à l'image ${i + 1}`);
    btn.addEventListener('click', (e) => { e.stopPropagation(); goTo(i); });
    dotsContainer.appendChild(btn);
  });
}

// === INIT SLIDER ===
function initSlider() {
  buildDots();
  updateSlider();

  // Arrow buttons
  document.getElementById('arrow-prev')?.addEventListener('click', (e) => { e.stopPropagation(); goPrev(); });
  document.getElementById('arrow-next')?.addEventListener('click', (e) => { e.stopPropagation(); goNext(); });

  // Click on image → Discord
  document.getElementById('slider-click-area')?.addEventListener('click', () => {
    window.open(DISCORD_LINK, '_blank', 'noopener,noreferrer');
  });
}

// === INIT TIKTOK ===
function initTikTok() {
  const thumb = document.getElementById('tiktok-thumb');
  const titleEl = document.getElementById('tiktok-title');
  const usernameEl = document.getElementById('tiktok-username');
  const btnEl = document.getElementById('tiktok-btn');
  const linkEls = document.querySelectorAll('.tiktok-link');

  if (thumb) thumb.src = TIKTOK_CONFIG.thumbnail;
  if (titleEl) titleEl.textContent = TIKTOK_CONFIG.title;
  if (usernameEl) usernameEl.textContent = TIKTOK_CONFIG.username;
  if (btnEl) btnEl.textContent = TIKTOK_CONFIG.buttonText;

  linkEls.forEach(el => el.href = TIKTOK_CONFIG.link);
}

// === INIT DISCORD LINKS ===
function initDiscordLinks() {
  document.querySelectorAll('.discord-link').forEach(el => {
    el.href = DISCORD_LINK;
  });
}

// === KEYBOARD NAVIGATION ===
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') goPrev();
  if (e.key === 'ArrowRight') goNext();
});

// === ON LOAD ===
document.addEventListener('DOMContentLoaded', () => {
  initSlider();
  initTikTok();
  initDiscordLinks();
});
