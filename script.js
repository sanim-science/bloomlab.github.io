// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Quiz functionality
function startQuiz(subject) {
    const quizzes = {
        physics: [
            {
                question: "What is the acceleration due to gravity on Earth?",
                options: ["9.8 m/s²", "10 m/s²", "8.9 m/s²", "11.2 m/s²"],
                correct: 0
            },
            {
                question: "Which law states that for every action, there is an equal and opposite reaction?",
                options: ["First Law", "Second Law", "Third Law", "Fourth Law"],
                correct: 2
            },
            {
                question: "What is the speed of light in vacuum?",
                options: ["3 × 10⁸ m/s", "2 × 10⁸ m/s", "4 × 10⁸ m/s", "1 × 10⁸ m/s"],
                correct: 0
            }
        ],
        engineering: [
            {
                question: "What is the primary purpose of a heat exchanger?",
                options: ["Generate heat", "Transfer heat between fluids", "Store heat", "Measure heat"],
                correct: 1
            },
            {
                question: "Which material property describes resistance to deformation?",
                options: ["Ductility", "Brittleness", "Stiffness", "Hardness"],
                correct: 2
            },
            {
                question: "What does CAD stand for?",
                options: ["Computer Aided Design", "Computer Analysis Design", "Computer Automated Design", "Computer Applied Design"],
                correct: 0
            }
        ],
        programming: [
            {
                question: "What does HTML stand for?",
                options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
                correct: 0
            },
            {
                question: "Which of the following is not a programming language?",
                options: ["Python", "JavaScript", "HTML", "C++"],
                correct: 2
            },
            {
                question: "What is the time complexity of binary search?",
                options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
                correct: 1
            }
        ]
    };

    const quiz = quizzes[subject];
    if (!quiz) {
        alert('Quiz not available yet!');
        return;
    }

    let currentQuestion = 0;
    let score = 0;

    function showQuestion() {
        const q = quiz[currentQuestion];
        const modal = document.createElement('div');
        modal.className = 'quiz-modal';
        modal.innerHTML = `
            <div class="quiz-content">
                <div class="quiz-header">
                    <h3>${subject.charAt(0).toUpperCase() + subject.slice(1)} Quiz</h3>
                    <span class="quiz-close">&times;</span>
                </div>
                <div class="quiz-progress">
                    <div class="progress-bar" style="width: ${((currentQuestion + 1) / quiz.length) * 100}%"></div>
                </div>
                <div class="quiz-question">
                    <h4>Question ${currentQuestion + 1} of ${quiz.length}</h4>
                    <p>${q.question}</p>
                    <div class="quiz-options">
                        ${q.options.map((option, index) => `
                            <button class="quiz-option" onclick="selectAnswer(${index})">
                                ${option}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Add styles for quiz modal
        const style = document.createElement('style');
        style.textContent = `
            .quiz-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
            }
            .quiz-content {
                background: white;
                border-radius: 15px;
                padding: 2rem;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            }
            .quiz-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
                border-bottom: 2px solid #f0f0f0;
                padding-bottom: 1rem;
            }
            .quiz-close {
                font-size: 2rem;
                cursor: pointer;
                color: #999;
            }
            .quiz-progress {
                width: 100%;
                height: 10px;
                background: #f0f0f0;
                border-radius: 5px;
                margin-bottom: 2rem;
                overflow: hidden;
            }
            .progress-bar {
                height: 100%;
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                transition: width 0.3s ease;
            }
            .quiz-question h4 {
                color: var(--primary-color);
                margin-bottom: 1rem;
            }
            .quiz-question p {
                font-size: 1.1rem;
                margin-bottom: 1.5rem;
                line-height: 1.6;
            }
            .quiz-options {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            .quiz-option {
                padding: 1rem;
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                background: white;
                cursor: pointer;
                transition: all 0.3s ease;
                text-align: left;
            }
            .quiz-option:hover {
                border-color: var(--primary-color);
                background: #f8f9ff;
            }
        `;
        document.head.appendChild(style);

        // Close modal functionality
        modal.querySelector('.quiz-close').onclick = () => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        };

        // Global function for answer selection
        window.selectAnswer = (selectedIndex) => {
            if (selectedIndex === q.correct) {
                score++;
            }
            
            currentQuestion++;
            document.body.removeChild(modal);
            document.head.removeChild(style);
            
            if (currentQuestion < quiz.length) {
                setTimeout(showQuestion, 300);
            } else {
                showResults();
            }
        };
    }

    function showResults() {
        const percentage = Math.round((score / quiz.length) * 100);
        let message = '';
        let emoji = '';
        
        if (percentage >= 80) {
            message = 'Excellent work!';
            emoji = '🎉';
        } else if (percentage >= 60) {
            message = 'Good job!';
            emoji = '👍';
        } else {
            message = 'Keep studying!';
            emoji = '📚';
        }

        alert(${emoji} Quiz Complete!\n\nScore: ${score}/${quiz.length} (${percentage}%)\n${message});
    }

    showQuestion();
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(102, 126, 234, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
        navbar.style.backdropFilter = 'none';
    }
});

// Challenge functionality (placeholder)
document.addEventListener('DOMContentLoaded', () => {
    const challengeButtons = document.querySelectorAll('.btn-challenge');
    challengeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const challengeTitle = e.target.parentElement.querySelector('h3').textContent;
            alert(${challengeTitle} coming soon! 🚀\n\nThis feature will be available in the next update.);
        });
    });
});

console.log('🌸 BloomLab loaded successfully! Ready to bloom your knowledge! 🌸');
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
// Quiz functionality
const quizQuestions = [
    {
        question: "What is the speed of light in vacuum?",
        options: ["299,792,458 m/s", "300,000,000 m/s", "299,000,000 m/s", "301,000,000 m/s"],
        correct: 0
    },
    {
        question: "What is Newton's second law of motion?",
        options: ["F = ma", "E = mc²", "v = u + at", "s = ut + ½at²"],
        correct: 0
    },
    {
        question: "What is the unit of electric current?",
        options: ["Volt", "Ampere", "Ohm", "Watt"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const question = quizQuestions[currentQuestion];
    document.getElementById('question-text').textContent = question.question;
    
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.textContent = question.options[index];
        option.className = 'option';
        option.onclick = () => checkAnswer(index);
    });
    
    document.getElementById('quiz-result').textContent = '';
    document.getElementById('next-question').style.display = 'none';
}

function checkAnswer(selectedIndex) {
    const question = quizQuestions[currentQuestion];
    const options = document.querySelectorAll('.option');
    const result = document.getElementById('quiz-result');
    
    options.forEach((option, index) => {
        option.onclick = null;
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex) {
            option.classList.add('incorrect');
        }
    });
    
    if (selectedIndex === question.correct) {
        score++;
        result.textContent = 'Correct! 🎉';
        result.style.color = '#28a745';
    } else {
        result.textContent = 'Incorrect. The correct answer is highlighted.';
        result.style.color = '#dc3545';
    }
    
    document.getElementById('next-question').style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
        loadQuestion();
    } else {
        document.getElementById('question-text').textContent = Quiz Complete! Your score: ${score}/${quizQuestions.length};
        document.querySelector('.options').style.display = 'none';
        document.getElementById('quiz-result').textContent = '';
        document.getElementById('next-question').textContent = 'Restart Quiz';
        document.getElementById('next-question').onclick = restartQuiz;
    }
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.querySelector('.options').style.display = 'grid';
    document.getElementById('next-question').textContent = 'Next Question';
    document.getElementById('next-question').onclick = nextQuestion;
    loadQuestion();
}

// Challenge functionality
function runFizzBuzz(code) {
    try {
        // Simple evaluation for demonstration
        let output = '';
        for (let i = 1; i <= 20; i++) {
            if (i % 15 === 0) output += 'FizzBuzz\n';
            else if (i % 3 === 0) output += 'Fizz\n';
            else if (i % 5 === 0) output += 'Buzz\n';
            else output += i + '\n';
        }
        return 'Expected output (first 20 numbers):\n' + output;
    } catch (error) {
        return 'Error: ' + error.message;
    }
}

function runPalindromeChecker(code) {
    try {
        return 'Test cases:\n' +
               'isPalindrome("racecar") should return true\n' +
               'isPalindrome("hello") should return false\n' +
               'isPalindrome("A man a plan a canal Panama") should return true (ignoring spaces and case)\n\n' +
               'Your function should handle these cases!';
    } catch (error) {
        return 'Error: ' + error.message;
    }
}

// Add click handlers for CTA buttons
document.addEventListener('DOMContentLoaded', function() {
    const exploreBtn = document.querySelector('.btn.primary');
    const quizBtn = document.querySelector('.btn.secondary');
    
    exploreBtn.addEventListener('click', function() {
        document.querySelector('#resources').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    quizBtn.addEventListener('click', function() {
        document.querySelector('#quizzes').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    // Load initial quiz question
    loadQuestion();
    
    // Add next question handler
    document.getElementById('next-question').addEventListener('click', nextQuestion);
    
    // Add challenge handlers
    const runButtons = document.querySelectorAll('.run-code');
    runButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const challengeCard = this.parentElement;
            const code = challengeCard.querySelector('.code-input').value;
            const output = challengeCard.querySelector('.output');
            
            if (index === 0) {
                output.textContent = runFizzBuzz(code);
            } else if (index === 1) {
                output.textContent = runPalindromeChecker(code);
            }
        });
    });
    
    // Add hover effects for feature cards
const featureCards = document.querySelectorAll('.feature-card, .subject-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Simple visit counter
function updateVisitCounter() {
    let visits = localStorage.getItem('bloomlab-visits') || 0;
    visits = parseInt(visits) + 1;
    localStorage.setItem('bloomlab-visits', visits);
    
    // You can display this counter somewhere on your site
    console.log(Total visits: ${visits});
    return visits;
}

// Track page visits
document.addEventListener('DOMContentLoaded', function() {
    updateVisitCounter();
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
header.style.background = 'rgba(102, 126, 234, 0.95)';
    } else {
        header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
});