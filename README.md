site is live at 
  https://abhishhek77.github.io/21-Number-Game/

  Race to 21

A turn-based number game against the computer, built to practice loops, conditions, input handling and simple game strategy. It comes in two versions: a Python command-line game and a browser game made with HTML, CSS and JavaScript.

How to play
A running total starts at 0.
On your turn, add 1, 2 or 3 to the total.
The computer then takes its turn.
Whoever makes the total reach exactly 21 wins.
Features
Three difficulty levels: easy (random moves), medium (smart most of the time) and hard (never misses a winning move)
Choose who goes first
Score tracking across rounds
Input validation (CLI) and disabled buttons for illegal moves (web)
Optional "Show safe spots" hint in the web version
Responsive layout with light and dark mode
Run it

Python version

bash
python race_to_21.py

Requires Python 3.6 or newer. No extra packages needed.

Web version

Keep index.html, style.css and script.js in the same folder, then open index.html in any modern browser. No build step or server required.

The strategy

The key idea is the "safe spot". A total is safe when 21 - total is a multiple of 4 (1, 5, 9, 13, 17 and 21). If you leave the total on a safe spot, you can answer any move the opponent makes (1, 2 or 3) with a move that brings the pair of turns to exactly 4, and so stay on the safe track until you reach 21.

The computer finds its move with one line: remaining % 4. If that is 0, no winning move exists and it plays randomly.

Project structure
race-to-21/
├── race_to_21.py   # command-line game
├── index.html      # web game: page structure
├── style.css       # web game: styling
├── script.js       # web game: game logic
└── README.md
Ideas to extend it
Change TARGET or MAX_MOVE and see how the winning strategy shifts
Add a misère mode where reaching the target makes you lose
Let the player pick the target number
Add a two-player mode on the same screen
