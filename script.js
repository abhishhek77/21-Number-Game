const TARGET = 21;
const MAX_MOVE = 3;

const trackEl = document.getElementById("track");
const statusEl = document.getElementById("status");
const logEl = document.getElementById("log");
const moveBtns = [...document.querySelectorAll("#moves button")];
const diffEl = document.getElementById("difficulty");
const starterEl = document.getElementById("starter");
const hintsEl = document.getElementById("hints");

const score = { player: 0, computer: 0 };
let total, turn, over;

// Build the 21 cells once. Safe spots are where (21 - n) is a multiple of 4.
for (let n = 1; n <= TARGET; n++) {
  const li = document.createElement("li");
  li.textContent = n;
  if ((TARGET - n) % (MAX_MOVE + 1) === 0) li.classList.add("safe");
  trackEl.appendChild(li);
}
const cells = [...trackEl.children];

function randomMove(limit) {
  return Math.floor(Math.random() * limit) + 1;
}

function computerMove() {
  const remaining = TARGET - total;
  const limit = Math.min(MAX_MOVE, remaining);
  const difficulty = diffEl.value;

  if (difficulty === "easy") return randomMove(limit);

  const best = remaining % (MAX_MOVE + 1); // leaves a multiple of 4
  if (best === 0) return randomMove(limit); // no winning move exists
  if (difficulty === "medium" && Math.random() < 0.4) return randomMove(limit);
  return best;
}

function addLog(text) {
  const li = document.createElement("li");
  li.textContent = text;
  logEl.prepend(li);
}

function render() {
  cells.forEach((c, i) => c.classList.toggle("now", i === total - 1));
  const remaining = TARGET - total;
  moveBtns.forEach(b => {
    const m = Number(b.dataset.move);
    b.disabled = over || turn !== "player" || m > remaining;
  });
}

function applyMove(who, amount) {
  const cls = who === "player" ? "you" : "cpu";
  for (let n = total + 1; n <= total + amount; n++) cells[n - 1].classList.add(cls);
  total += amount;
  addLog(`${who === "player" ? "You" : "Computer"} added ${amount} → ${total}`);

  if (total >= TARGET) return endGame(who);
  turn = who === "player" ? "computer" : "player";
  nextTurn();
}

function nextTurn() {
  render();
  if (turn === "player") {
    statusEl.textContent = `Your turn. Total is ${total}.`;
  } else {
    statusEl.textContent = "Computer is thinking…";
    setTimeout(() => applyMove("computer", computerMove()), 800);
  }
}

function endGame(winner) {
  over = true;
  score[winner]++;
  document.getElementById("score-p").textContent = score.player;
  document.getElementById("score-c").textContent = score.computer;
  cells[TARGET - 1].classList.add("win");
  statusEl.textContent = winner === "player"
    ? "You reached 21. You win!"
    : "The computer reached 21. Computer wins!";
  render();
}

function newGame() {
  total = 0;
  over = false;
  turn = starterEl.value;
  cells.forEach(c => c.classList.remove("you", "cpu", "now", "win"));
  logEl.innerHTML = "";
  nextTurn();
}

moveBtns.forEach(b =>
  b.addEventListener("click", () => {
    if (!over && turn === "player") applyMove("player", Number(b.dataset.move));
  })
);
hintsEl.addEventListener("change", () =>
  document.body.classList.toggle("show-hints", hintsEl.checked)
);
document.getElementById("new").addEventListener("click", newGame);

newGame();
