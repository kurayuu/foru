function startGame() {
  document.getElementById('welcome').classList.remove('active');
  document.getElementById('game').classList.add('active');
  document.getElementById('feedback').textContent = '';
}

function checkAnswer() {
  const guess = document.getElementById('guess').value.trim().toLowerCase();
  const feedback = document.getElementById('feedback');

  if (!guess) {
    feedback.textContent = '';
    return;
  }


  if (guess === 'avocado') {
    alert("Yay! You got it right, Mahal! 🥑💚");
    feedback.textContent = 'Correct! 💚';
    setTimeout(() => {
      document.getElementById('game').classList.remove('active');
      document.getElementById('game2').classList.add('active');
      setupPuzzle();
    }, 1000);
  } else {
    feedback.textContent = 'Not quite, try again! 😊';
  }
}

// Puzzle Logic
function setupPuzzle() {
  const board = document.getElementById('puzzleBoard');
  board.innerHTML = '';

  const positions = [
  '0px 0px', '-100px 0px', '-200px 0px',
  '0px -66px', '-100px -66px', '-200px -66px',
  '0px -132px', '-100px -132px', '-200px -132px'
];


  const pieces = [];

  positions.forEach((pos, i) => {
    const piece = document.createElement('div');
    piece.className = 'piece';
    piece.style.backgroundImage = "url('assets/images/tulips.jpg')";
    piece.style.backgroundPosition = pos;
    piece.setAttribute('data-index', i);
    piece.setAttribute('draggable', true);
    piece.addEventListener('dragstart', handleDragStart);
    piece.addEventListener('dragover', handleDragOver);
    piece.addEventListener('drop', handleDrop);
    piece.addEventListener('dragend', checkCompletion);
    pieces.push(piece);
  });

  // Shuffle pieces
  pieces.sort(() => 0.5 - Math.random());
  pieces.forEach(piece => board.appendChild(piece));
}

let dragSrcEl = null;

function handleDragStart(e) {
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
  e.preventDefault();
  return false;
}

function handleDrop(e) {
  e.preventDefault();
  if (dragSrcEl !== this) {
    const tempIndex = dragSrcEl.style.backgroundPosition;
    dragSrcEl.style.backgroundPosition = this.style.backgroundPosition;
    this.style.backgroundPosition = tempIndex;

    const tempOrder = dragSrcEl.dataset.index;
    dragSrcEl.dataset.index = this.dataset.index;
    this.dataset.index = tempOrder;
  }
  return false;
}

function checkCompletion() {
  const board = document.getElementById('puzzleBoard');
  const pieces = [...board.children];
  const isComplete = pieces.every((piece, i) => parseInt(piece.dataset.index) === i);

  if (isComplete) {
    setTimeout(() => {
      alert("You did it, Mahal! 🌷 You're amazing!");
      document.getElementById('game2').classList.remove('active');
      document.getElementById('final').classList.add('active');
    }, 300);
  }
}
