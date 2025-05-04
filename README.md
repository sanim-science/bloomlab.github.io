This is the official website for BloomLab 
// Simple BloomLab website using plain JavaScript and HTML (no React)

const app = document.getElementById('app');

const routes = {
  '/': renderHome,
  '/resources': renderResources,
  '/quizzes': renderQuizzes,
};

function navigate(path) {
  window.history.pushState({}, path, window.location.origin + path);
  routes[path]();
}

function renderNav() {
  return `
    <nav style="display: flex; justify-content: space-between; padding: 1rem; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <h1 style="color: #2563eb; font-weight: bold;">BloomLab</h1>
      <div style="gap: 1rem; display: flex;">
        <a href="#" onclick="navigate('/')">Home</a>
        <a href="#" onclick="navigate('/resources')">Resources</a>
        <a href="#" onclick="navigate('/quizzes')">Quizzes</a>
      </div>
    </nav>
  `;
}

function renderHome() {
  app.innerHTML = `
    ${renderNav()}
    <div style="padding: 2rem; text-align: center;">
      <h2>Welcome to BloomLab</h2>
      <p>Your hub for Physics, Engineering, and Programming resources and challenges.</p>
    </div>
  `;
}

function renderResources() {
  const links = [
    { title: "Khan Academy - Physics", url: "https://www.khanacademy.org/science/physics" },
    { title: "MIT OpenCourseWare - Engineering", url: "https://ocw.mit.edu/courses/find-by-topic/#cat=engineering" },
    { title: "freeCodeCamp - Programming", url: "https://www.freecodecamp.org/" },
  ];
  
  const listItems = links.map(link => `<li><a href="${link.url}" target="_blank">${link.title}</a></li>`).join('');
  
  app.innerHTML = `
    ${renderNav()}
    <div style="padding: 2rem;">
      <h2>Resources</h2>
      <ul>${listItems}</ul>
    </div>
  `;
}

function renderQuizzes() {
  const questions = [
    {
      question: "What is the unit of force?",
      options: ["Newton", "Joule", "Watt", "Pascal"],
      answer: "Newton",
    },
    {
      question: "Which language is used for web development?",
      options: ["Python", "HTML", "C++", "Java"],
      answer: "HTML",
    },
    {
      question: "What does Ohm's Law state?",
      options: ["V = IR", "F = ma", "E = mc^2", "P = VI"],
      answer: "V = IR",
    },
  ];

  let index = 0;
  let score = 0;

  function showQuestion() {
    const q = questions[index];
    const optionsHtml = q.options.map(opt => `<button onclick="checkAnswer('${opt}')">${opt}</button>`).join('<br>');
    app.innerHTML = `
      ${renderNav()}
      <div style="padding: 2rem;">
        <h2>Quiz</h2>
        <p>${q.question}</p>
        ${optionsHtml}
      </div>
    `;
  }

  window.checkAnswer = function (selected) {
    if (selected === questions[index].answer) score++;
    index++;
    if (index < questions.length) {
      showQuestion();
    } else {
      app.innerHTML = `
        ${renderNav()}
        <div style="padding: 2rem;">
          <h2>Quiz Complete</h2>
          <p>Your score: ${score} / ${questions.length}</p>
        </div>
      `;
    }
  };

  showQuestion();
}

// Initial load
window.onpopstate = () => {
  routes[window.location.pathname]();
};

navigate('/');
