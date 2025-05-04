This is the official website for BloomLab 
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow p-4 flex justify-between">
          <h1 className="text-xl font-bold text-blue-600">BloomLab</h1>
          <div className="space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/resources" className="text-gray-700 hover:text-blue-600">Resources</Link>
            <Link to="/quizzes" className="text-gray-700 hover:text-blue-600">Quizzes</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/quizzes" element={<Quizzes />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-semibold mb-4">Welcome to BloomLab</h2>
      <p className="text-gray-700">Your hub for Physics, Engineering, and Programming resources and challenges.</p>
    </div>
  );
}

function Resources() {
  const links = [
    { title: "Khan Academy - Physics", url: "https://www.khanacademy.org/science/physics" },
    { title: "MIT OpenCourseWare - Engineering", url: "https://ocw.mit.edu/courses/find-by-topic/#cat=engineering" },
    { title: "freeCodeCamp - Programming", url: "https://www.freecodecamp.org/" },
  ];

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Resources</h2>
      <ul className="list-disc list-inside space-y-2">
        {links.map((link, idx) => (
          <li key={idx}>
            <a href={link.url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Quizzes() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

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

  const handleAnswer = (option) => {
    if (option === questions[questionIndex].answer) {
      setScore(score + 1);
    }
    const nextIndex = questionIndex + 1;
    if (nextIndex < questions.length) {
      setQuestionIndex(nextIndex);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Quiz</h2>
      {!showResult ? (
        <div>
          <p className="mb-2">{questions[questionIndex].question}</p>
          <div className="space-y-2">
            {questions[questionIndex].options.map((option, idx) => (
              <button
                key={idx}
                className="block w-full bg-white border border-gray-300 rounded px-4 py-2 hover:bg-blue-100"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p className="text-lg">Your score: {score} / {questions.length}</p>
        </div>
      )}
    </div>
  );
}

export default App;
