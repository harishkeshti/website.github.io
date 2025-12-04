// Array of questions
// Make sure these image files exist in the "flags" folder
const questions = [
  {
    image:"ind.png",
    answer: "India",
    options: ["India", "Ireland", "Italy", "Niger"]
  },
  {
    image:"usa.png",
    answer: "United States",
    options: ["Australia", "United States", "United Kingdom", "New Zealand"]
  },
  {
    image:"japan.png",
    answer: "Japan",
    options: ["Japan", "Bangladesh", "Greenland", "South Korea"]
  },
  {
    image:"brazil.png",
    answer: "Brazil",
    options: ["Portugal", "Brazil", "Mexico", "Argentina"]
  },
  {
    image:"germany.png",
    answer: "Germany",
    options: ["Belgium", "Germany", "Spain", "Austria"]
  },
  {
    image:"aus.png",
    answer: "Australia",
    options: ["New Zealand", "Australia", "United Kingdom", "Fiji"]
  }
];

let currentIndex = 0;
let score = 0;
let selected = false;

// DOM elements
const flagImage = document.getElementById("flag-image");
const optionsContainer = document.getElementById("options");
const messageEl = document.getElementById("message");
const scoreText = document.getElementById("score-text");
const nextBtn = document.getElementById("next-btn");
const questionText = document.getElementById("question-text");

// Load first question
loadQuestion();

nextBtn.addEventListener("click", () => {
  currentIndex++;

  if (currentIndex >= questions.length) {
    // Quiz finished
    showFinalResult();
  } else {
    loadQuestion();
  }
});

function loadQuestion() {
  selected = false;
  nextBtn.disabled = true;
  messageEl.textContent = "";
  questionText.textContent = "Which country's flag is this?";

  const currentQuestion = questions[currentIndex];

  // Set image
  flagImage.src = currentQuestion.image;
  flagImage.alt = currentQuestion.answer + " Flag";

  // Clear old options
  optionsContainer.innerHTML = "";

  // Shuffle options so correct answer position changes
  const shuffledOptions = shuffleArray([...currentQuestion.options]);

  // Create option buttons
  shuffledOptions.forEach(optionText => {
    const btn = document.createElement("button");
    btn.textContent = optionText;
    btn.classList.add("option-btn");

    btn.addEventListener("click", () => handleOptionClick(btn, currentQuestion.answer));

    optionsContainer.appendChild(btn);
  });

  // Update score display
  scoreText.textContent = "Score: " + score + " / " + questions.length;
}

function handleOptionClick(button, correctAnswer) {
  if (selected) return; // prevent multiple answers

  selected = true;
  const userAnswer = button.textContent;

  // Disable all buttons
  const allButtons = document.querySelectorAll(".option-btn");
  allButtons.forEach(b => (b.disabled = true));

  if (userAnswer === correctAnswer) {
    button.classList.add("correct");
    messageEl.textContent = "✅ Correct!";
    score++;
  } else {
    button.classList.add("wrong");
    messageEl.textContent = "❌ Wrong! Correct answer: " + correctAnswer;

    // Highlight correct answer
    allButtons.forEach(b => {
      if (b.textContent === correctAnswer) {
        b.classList.add("correct");
      }
    });
  }

  // Update score text immediately
  scoreText.textContent = "Score: " + score + " / " + questions.length;

  // Enable next button
  if (currentIndex === questions.length - 1) {
    nextBtn.textContent = "Show Result";
  } else {
    nextBtn.textContent = "Next ▶";
  }
  nextBtn.disabled = false;
}

function showFinalResult() {
  // After last question
  flagImage.style.display = "none";
  optionsContainer.innerHTML = "";
  nextBtn.style.display = "none";

  questionText.textContent = "Quiz Finished!";
  messageEl.textContent = "Your final score is " + score + " out of " + questions.length + ".";

  // Optionally show a play again button
  const playAgainBtn = document.createElement("button");
  playAgainBtn.textContent = "Play Again 🔁";
  playAgainBtn.classList.add("btn");
  playAgainBtn.style.marginTop = "8px";

  playAgainBtn.addEventListener("click", () => {
    // Reset state
    currentIndex = 0;
    score = 0;
    flagImage.style.display = "block";
    nextBtn.style.display = "inline-block";
    optionsContainer.innerHTML = "";
    messageEl.textContent = "";
    scoreText.textContent = "Score: 0 / " + questions.length;
    playAgainBtn.remove();
    loadQuestion();
  });

  optionsContainer.appendChild(playAgainBtn);
}

// Simple array shuffle
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}