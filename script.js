// Create floating elements
function createFloatingElements() {
  const container = document.getElementById('floatingElements');
  for (let i = 0; i < 15; i++) {
    const element = document.createElement('div');
    element.className = 'floating-element';
    
    // Random properties
    const size = Math.random() * 100 + 50;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    const opacity = Math.random() * 0.2 + 0.05;
    
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.left = `${posX}%`;
    element.style.top = `${posY}%`;
    element.style.animationDuration = `${duration}s`;
    element.style.animationDelay = `${delay}s`;
    element.style.opacity = opacity;
    
    // Random shape
    if (Math.random() > 0.5) {
      element.style.borderRadius = '50%';
    }
    
    container.appendChild(element);
  }
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Tic-Tac-Toe Game Logic
let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let scores = { x: 0, o: 0, ties: 0 };

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

// DOM Elements
const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('gameStatus');
const resetBtn = document.getElementById('resetBtn');
const playerXScore = document.getElementById('playerXScore');
const playerOScore = document.getElementById('playerOScore');
const tiesScore = document.getElementById('tiesScore');

// Event Listeners
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

resetBtn.addEventListener('click', resetGame);

// Functions
function handleCellClick(e) {
  const clickedCell = e.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
  
  // If cell already filled or game not active, ignore click
  if (gameState[clickedCellIndex] !== "" || !gameActive) return;
  
  // Update game state and UI
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  clickedCell.classList.add(currentPlayer.toLowerCase());
  
  // Check for win or draw
  checkResult();
}

function checkResult() {
  let roundWon = false;
  
  // Check all winning conditions
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    
    if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") continue;
    
    if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
      roundWon = true;
      
      // Highlight winning cells
      cells[a].classList.add('winner');
      cells[b].classList.add('winner');
      cells[c].classList.add('winner');
      break;
    }
  }
  
  // If won, update scores and status
  if (roundWon) {
    gameStatus.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    
    // Update scores
    if (currentPlayer === "X") {
      scores.x++;
      playerXScore.querySelector('.score-value').textContent = scores.x;
      playerXScore.classList.add('active');
      setTimeout(() => playerXScore.classList.remove('active'), 1000);
    } else {
      scores.o++;
      playerOScore.querySelector('.score-value').textContent = scores.o;
      playerOScore.classList.add('active');
      setTimeout(() => playerOScore.classList.remove('active'), 1000);
    }
    
    return;
  }
  
  // Check for draw
  if (!gameState.includes("")) {
    gameStatus.textContent = "Game ended in a draw!";
    gameActive = false;
    scores.ties++;
    tiesScore.querySelector('.score-value').textContent = scores.ties;
    tiesScore.classList.add('active');
    setTimeout(() => tiesScore.classList.remove('active'), 1000);
    return;
  }
  
  // Switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  gameStatus.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameStatus.textContent = "Player X's turn";
  
  // Clear cells
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove('x', 'o', 'winner');
  });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
  createFloatingElements();
  
  // Animate elements when they come into view
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.feature-card, .section-title');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial styles for animation
  const animatedElements = document.querySelectorAll('.feature-card, .section-title');
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
  });
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on load
});