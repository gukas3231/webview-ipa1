
const slots = [
  "Gates of Olympus", "Sweet Bonanza", "The Dog House", "Book of Dead", "Fruit Party",
  "Legacy of Dead", "Big Bass Bonanza", "Starlight Princess", "Madame Destiny", "Buffalo King",
  "Bonanza Billion", "Aztec Magic", "Sugar Rush", "Wanted Dead or a Wild", "Money Train 2",
  "Book of Ra", "Reactoonz", "Fire Joker", "Razor Shark", "Chaos Crew",
  "The Dog House Megaways", "Wild West Gold", "Juicy Fruits", "Tombstone", "Fat Santa",
  "Floating Dragon", "Lucky Lady Moon", "Gates of Troy", "Mega Joker", "Power of Thor"
];

const usedSlots = new Set();

const winTypes = [
  { type: "Big Win", chance: 40, spins: [10, 40], bet: [150, 300] },
  { type: "Mega Win", chance: 25, spins: [30, 60], bet: [200, 400] },
  { type: "Super Win", chance: 15, spins: [50, 80], bet: [250, 500] },
  { type: "Epic Win", chance: 10, spins: [70, 100], bet: [300, 600] },
  { type: "MAX WIN", chance: 5, spins: [100, 150], bet: [350, 1000] },
  { type: "none", chance: 5 }
];

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getPrediction() {
  const slot = document.getElementById("slotSelect").value;
  const resultDiv = document.getElementById("result");
  const loadingDiv = document.getElementById("loading");

  if (!slot || slot === "Выбери слот") return;

  if (usedSlots.has(slot)) {
    resultDiv.innerHTML = `Для слота <strong>${slot}</strong> прогноз уже получен.`;
    return;
  }

  usedSlots.add(slot);
  resultDiv.innerHTML = "";
  loadingDiv.style.display = "block";

  
    const messages = ["Считаем...", "Получаем отчёт...", "Обновляем данные...", "Проверяем слот...", "Формируем прогноз..."];
    let messageIndex = 0;
    const loadingText = document.createElement("div");
    loadingText.id = "loadingText";
    loadingText.style.marginTop = "15px";
    loadingText.style.color = "#aaa";
    loadingText.textContent = messages[0];
    document.getElementById("loading").appendChild(loadingText);

    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      loadingText.textContent = messages[messageIndex];
    }, 4000);

    let delay = 15000 + Math.random() * 2000; // немного "тормозим"
    setTimeout(() => {
      clearInterval(interval);
      loadingText.remove();

    loadingDiv.style.display = "none";
    let roll = Math.random() * 100;
    let cumulative = 0;
    for (let win of winTypes) {
      cumulative += win.chance;
      if (roll <= cumulative) {
        if (win.type === "none") {
          const date = new Date().toLocaleDateString("ru-RU");
          resultDiv.innerHTML = `Сегодня, ${date}, слот <strong>${slot}</strong> не выдаст крупный выигрыш.`;
          return;
        } else {
          const spins = getRandomInRange(...win.spins);
          const bet = getRandomInRange(...win.bet);
          resultDiv.innerHTML = `<strong>${win.type}</strong> через <strong>${spins}</strong> прокрутов, ставка <strong>${bet}₽</strong>.<br>Слот: <strong>${slot}</strong>`;
          return;
        }
      }
    }
  }, delay);
}

function startApp() {
  const id = document.getElementById("userId").value.trim();
  const email = document.getElementById("userEmail").value.trim();
  if (!id || !email) {
    alert("Введите ID и почту");
    return;
  }
  document.getElementById("registerSection").style.display = "none";
  document.getElementById("mainApp").style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("slotSelect");
  slots.forEach(slot => {
    const option = document.createElement("option");
    option.value = slot;
    option.textContent = slot;
    select.appendChild(option);
  });

  document.getElementById("predictBtn").addEventListener("click", getPrediction);
});
