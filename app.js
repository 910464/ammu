// =============================================
// A LITTLE PLACE FOR AMMU — VERSION 2
// Change the personal settings below.
// =============================================

// Set this to the date/time you will next see her.
const nextMeeting = "2026-11-01T18:30:00+05:30";

const missMessages = [
  "I miss you too, Ammu. More than this button can explain. ❤️",
  "Come here, Kuttyma. Consider this your emergency Abiii hug. 🫂",
  "En kanmani, distance is temporary. Us is not. ❤️",
  "Paaaa is thinking about you right now. Probably smiling like an idiot. 😌",
  "If I could teleport, I'd be beside you already. ❤️"
];

const presenceMessages = [
  "You're loved. You're important. And you're never really alone.",
  "Somewhere, Paaaa is thinking about his Ammu. ❤️",
  "No matter how quiet the house feels, my love isn't quiet.",
  "You have a permanent place in my heart, Wifey.",
  "One day at a time, Kuttyma. I'm with you."
];

const questions = [
  "What is one tiny thing about Paaaa that secretly makes you smile?",
  "If we could disappear for one weekend, where would you take me?",
  "What is your favourite memory of us so far?",
  "What's one thing you want us to do together this year?",
  "What nickname of mine makes you smile the most?",
  "If tonight were a date night at home, what would we do?"
];

const activities = [
  "Make your favourite drink and send Paaaa a photo. ☕",
  "Put on one song that reminds you of us. 🎵",
  "Go look at one old photo of us and tell me the story behind it. 📸",
  "Get a snack, get comfortable, and watch something you love. 🍿",
  "Send Paaaa a completely random 'I love you' message. He won't complain. 😌",
  "Take five slow breaths and give yourself a tiny break. 🌷"
];

// Welcome screen
document.getElementById("enterBtn").addEventListener("click", () => {
  document.getElementById("welcome").classList.add("hidden");
  setTimeout(() => document.getElementById("home").scrollIntoView({ behavior: "smooth" }), 300);
});

// Mobile navigation
document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("nav").classList.toggle("open");
});
document.querySelectorAll("#nav a").forEach(a => {
  a.addEventListener("click", () => document.getElementById("nav").classList.remove("open"));
});

// Hearts
function showFloatingHeart(x = window.innerWidth / 2, y = window.innerHeight / 2) {
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.textContent = ["❤️", "💗", "💕", "💖", "🌷"][Math.floor(Math.random() * 5)];
  heart.style.left = `${x + (Math.random() * 70 - 35)}px`;
  heart.style.top = `${y}px`;
  document.getElementById("heartLayer").appendChild(heart);
  setTimeout(() => heart.remove(), 2200);
}

// Miss button
const missBtn = document.getElementById("missBtn");
const heroNote = document.getElementById("heroNote");
missBtn.addEventListener("click", (e) => {
  heroNote.textContent = missMessages[Math.floor(Math.random() * missMessages.length)];
  for (let i = 0; i < 9; i++) setTimeout(() => showFloatingHeart(e.clientX, e.clientY), i * 80);
});

// Rotating presence
const presenceMessage = document.getElementById("presenceMessage");
setInterval(() => {
  presenceMessage.textContent = presenceMessages[Math.floor(Math.random() * presenceMessages.length)];
}, 6500);

// Letter modal
const modal = document.getElementById("letterModal");
const modalTitle = document.getElementById("modalTitle");
const modalMessage = document.getElementById("modalMessage");
document.querySelectorAll(".letter-card").forEach(card => {
  card.addEventListener("click", () => {
    modalTitle.textContent = card.dataset.title;
    modalMessage.textContent = card.dataset.message;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});
function closeModal(id) {
  const el = document.getElementById(id);
  el.classList.remove("open");
  el.setAttribute("aria-hidden", "true");
}
document.getElementById("closeModal").addEventListener("click", () => closeModal("letterModal"));
document.querySelector("#letterModal .modal-backdrop").addEventListener("click", () => closeModal("letterModal"));
document.getElementById("modalHeart").addEventListener("click", (e) => {
  for (let i = 0; i < 10; i++) setTimeout(() => showFloatingHeart(e.clientX, e.clientY), i * 70);
  modalMessage.textContent = "Heart received. ❤️ Now go give me a real one when you see me.";
});

// Little things
document.getElementById("questionBtn").addEventListener("click", () => {
  document.getElementById("questionText").textContent = questions[Math.floor(Math.random() * questions.length)];
});
document.getElementById("activityBtn").addEventListener("click", () => {
  document.getElementById("activityText").textContent = activities[Math.floor(Math.random() * activities.length)];
});
document.getElementById("hugBtn").addEventListener("click", (e) => {
  for (let i = 0; i < 18; i++) setTimeout(() => showFloatingHeart(e.clientX, e.clientY), i * 60);
  document.getElementById("activityText").textContent = "Hug successfully delivered. 🫂❤️";
});

// Chat — local-only in V2
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
const CHAT_KEY = "ammu-little-place-chat";

function renderChat() {
  const saved = JSON.parse(localStorage.getItem(CHAT_KEY) || "[]");
  saved.forEach(item => addBubble(item.text, item.type, false));
}
function addBubble(text, type, save = true) {
  const bubble = document.createElement("div");
  bubble.className = `bubble ${type}`;
  bubble.textContent = text;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  if (save) {
    const saved = JSON.parse(localStorage.getItem(CHAT_KEY) || "[]");
    saved.push({ text, type });
    localStorage.setItem(CHAT_KEY, JSON.stringify(saved.slice(-50)));
  }
}
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  addBubble(text, "you");
  chatInput.value = "";
  setTimeout(() => addBubble("I got your message, Ammu. ❤️ Paaaa will see this here.", "them"), 650);
});
renderChat();

// Comfort mode
const comfortBtn = document.getElementById("comfortBtn");
const breathing = document.getElementById("breathing");
const breathText = document.getElementById("breathText");
const breathTimer = document.getElementById("breathTimer");
let breathingInterval;
comfortBtn.addEventListener("click", () => {
  breathing.hidden = false;
  comfortBtn.textContent = "Breathe with me ❤️";
  clearInterval(breathingInterval);
  let phase = "in";
  let count = 4;
  breathText.textContent = "Breathe in...";
  breathTimer.textContent = count;
  breathingInterval = setInterval(() => {
    count--;
    breathTimer.textContent = count;
    if (count <= 0) {
      phase = phase === "in" ? "out" : "in";
      count = 4;
      breathText.textContent = phase === "in" ? "Breathe in..." : "Breathe out...";
      breathTimer.textContent = count;
    }
  }, 1000);
});

// Countdown
function updateCountdown() {
  const target = new Date(nextMeeting).getTime();
  const distance = target - Date.now();
  const fields = ["days", "hours", "minutes", "seconds"];
  if (distance <= 0) {
    fields.forEach(id => document.getElementById(id).textContent = "00");
    return;
  }
  document.getElementById("days").textContent = String(Math.floor(distance / 86400000)).padStart(2, "0");
  document.getElementById("hours").textContent = String(Math.floor((distance % 86400000) / 3600000)).padStart(2, "0");
  document.getElementById("minutes").textContent = String(Math.floor((distance % 3600000) / 60000)).padStart(2, "0");
  document.getElementById("seconds").textContent = String(Math.floor((distance % 60000) / 1000)).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Secret
const secretModal = document.getElementById("secretModal");
document.getElementById("secretBtn").addEventListener("click", () => {
  secretModal.classList.add("open");
  secretModal.setAttribute("aria-hidden", "false");
});
document.getElementById("closeSecret").addEventListener("click", () => closeModal("secretModal"));
document.querySelector("#secretModal .modal-backdrop").addEventListener("click", () => closeModal("secretModal"));

// Escape closes either modal
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeModal("letterModal");
    closeModal("secretModal");
  }
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
