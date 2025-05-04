let users = [];
let currentUser = null;
let questions = [];
let currentQuestionIndex = 0;
let selectedStream = "";

function register() {
  const username = document.getElementById("reg-username").value.trim();
  const password = document.getElementById("reg-password").value.trim();
  const error = document.getElementById("register-error");

  if (!username || !password) {
    error.textContent = "Please enter both fields.";
    return;
  }

  if (users.some(u => u.username === username)) {
    error.textContent = "Username already exists.";
    return;
  }

  users.push({ username, password });
  error.textContent = "Registration successful. You can now login.";
}

function showLogin() {
  document.getElementById("register-page").classList.add("hidden");
  document.getElementById("login-page").classList.remove("hidden");
}

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("login-error");

  const match = users.find(u => u.username === username && u.password === password);
  if (match) {
    currentUser = match;
    document.getElementById("login-page").classList.add("hidden");
    document.getElementById("stream-selection").classList.remove("hidden");
  } else {
    error.textContent = "Invalid login.";
  }
}

function startSelectedQuiz() {
  const dropdown = document.getElementById("stream-dropdown");
  const stream = dropdown.value;

  if (!stream) {
    alert("Please select a stream!");
    return;
  }

  startQuiz(stream);
}

function startQuiz(stream) {
  selectedStream = stream;
  questions = questionSets[stream];
  currentQuestionIndex = 0;

  document.getElementById("stream-selection").classList.add("hidden");
  document.getElementById("quiz-area").classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  const q = questions[currentQuestionIndex];
  document.getElementById("question").innerText = q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.className = "option-btn";
    btn.onclick = () => checkAnswer(option);
    optionsDiv.appendChild(btn);
  });

  document.getElementById("result").innerText = "";
}

function checkAnswer(selected) {
  const correct = questions[currentQuestionIndex].answer;
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.innerText === correct) {
      btn.style.backgroundColor = "lightgreen";
    } else if (btn.innerText === selected) {
      btn.style.backgroundColor = "salmon";
    }
  });

  const result = document.getElementById("result");
  result.innerText = selected === correct ? "✅ Correct!" : `❌ Wrong! Correct: ${correct}`;
  result.style.color = selected === correct ? "green" : "red";
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    document.getElementById("quiz-area").innerHTML = `
      <h2>Quiz Completed!</h2>
      <p>Thanks for playing the ${selectedStream} quiz, ${currentUser.username}.</p>
      <button onclick="location.reload()">Restart</button>
    `;
  }
}

const questionSets = {
  dataScience: [
    {
      question: "What is the full form of CSV?",
      options: ["Comma Separated Values", "Common Syntax Validator", "Control System Vector", "Column Standard Value"],
      answer: "Comma Separated Values"
    },
    {
      question: "Which Python library is used for data analysis?",
      options: ["Pandas", "NumPy", "Matplotlib", "Scikit-learn"],
      answer: "Pandas"
    },
    {
      question: "Which term describes cleaning and preparing data?",
      options: ["ETL", "EDA", "Tuning", "Parsing"],
      answer: "ETL"
    },
    {
      question: "Which file format is most common for datasets?",
      options: ["CSV", "TXT", "DOCX", "JPG"],
      answer: "CSV"
    },
    {
      question: "What is the process of exploring datasets visually?",
      options: ["Data Mining", "EDA", "Data Cleaning", "Modeling"],
      answer: "EDA"
    }
  ],
  webDev: [
    {
      question: "What does HTML stand for?",
      options: ["HyperText Markup Language", "HighText Machine Language", "Hyper Tool Multi Language", "HyperType Mark Language"],
      answer: "HyperText Markup Language"
    },
    {
      question: "Which language is used to style web pages?",
      options: ["HTML", "CSS", "Python", "JavaScript"],
      answer: "CSS"
    },
    {
      question: "Which HTML tag is used to create a link?",
      options: ["<a>", "<link>", "<href>", "<url>"],
      answer: "<a>"
    },
    {
      question: "Which language adds interactivity to websites?",
      options: ["Java", "HTML", "CSS", "JavaScript"],
      answer: "JavaScript"
    },
    {
      question: "What does CSS stand for?",
      options: ["Cascading Style Sheets", "Computer Style Sheet", "Creative Style Syntax", "Colorful Style Sheet"],
      answer: "Cascading Style Sheets"
    }
  ]
  // You can add more streams in similar format
};
