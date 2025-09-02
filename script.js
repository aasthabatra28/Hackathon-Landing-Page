function startCountdown() {
  const targetDate = new Date("2025-09-10T09:00:00").getTime();

  const updateTimer = () => {
    const now = Date.now();
    const difference = targetDate - now;

    if (difference <= 0) {
      document.getElementById("timer").innerText = "Event Started!";
      clearInterval(timerInterval);
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    document.getElementById("timer").innerText =
      `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  updateTimer(); // initial call
  const timerInterval = setInterval(updateTimer, 1000);
}

startCountdown();

const form = document.getElementById("regForm");
const successMsg = document.getElementById("successMessage");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  if (name && email) {
    successMsg.innerText = `Thank you ${name}! Registration successful.`;
    form.reset();
    setTimeout(() => {
      successMsg.innerText = "";
    }, 3000);
  }
});

const filter = document.getElementById("filter");

filter.addEventListener("change", () => {
  const value = filter.value;
  let firstVisible = null;

  document.querySelectorAll(".event-card").forEach((card) => {
    const cardType = card.dataset.type;
    if (value === "all" || cardType === value) {
      card.style.display = "block";
      if (!firstVisible) firstVisible = card;
    } else {
      card.style.display = "none";
    }
    card.classList.remove("highlight");
  });

  if (firstVisible) firstVisible.classList.add("highlight");
});

function highlightUpcomingEvent() {
  const cards = document.querySelectorAll(".event-card");
  cards.forEach((card) => card.classList.remove("highlight"));
  if (cards.length) cards[0].classList.add("highlight");
}

highlightUpcomingEvent();

window.addEventListener("scroll", () => {
  document.querySelectorAll("section h2").forEach((h2) => {
    if (h2.getBoundingClientRect().top < window.innerHeight - 50) {
      h2.classList.add("visible");
    }
  });
});
