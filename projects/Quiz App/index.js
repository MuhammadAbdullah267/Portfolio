document.addEventListener("DOMContentLoaded", () => {

    const allQuestions = [
        {
            question: "What does HTML stand for?",
            options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tool Markup Language", "Home Text Markup Language"],
            answer: "Hyper Text Markup Language"
        },
        {
            question: "Which tag is used to create a hyperlink in HTML?",
            options: ["<link>", "<a>", "<href>", "<url>"],
            answer: "<a>"
        },
        {
            question: "Which CSS property changes text color?",
            options: ["font-color", "text-color", "color", "background-color"],
            answer: "color"
        },
        {
            question: "Which language is used to make websites interactive?",
            options: ["HTML", "CSS", "JavaScript", "SQL"],
            answer: "JavaScript"
        },
        {
            question: "Which symbol is used for ID selector in CSS?",
            options: [".", "#", "*", "&"],
            answer: "#"
        },
        {
            question: "Which symbol is used for Class selector in CSS?",
            options: ["#", ".", "*", "$"],
            answer: "."
        },
        {
            question: "How do you write a comment in JavaScript?",
            options: ["// Comment", "<!-- Comment -->", "** Comment **", "## Comment"],
            answer: "// Comment"
        },
        {
            question: "Which method is used to select an element by ID?",
            options: ["getElementById()", "queryClass()", "selectElement()", "findById()"],
            answer: "getElementById()"
        },
        {
            question: "Which HTML tag is used for images?",
            options: ["<image>", "<img>", "<pic>", "<src>"],
            answer: "<img>"
        },
        {
            question: "Which property makes a flex container in CSS?",
            options: ["display:flex", "flex-container", "position:flex", "layout:flex"],
            answer: "display:flex"
        },
        {
            question: "Which company developed JavaScript?",
            options: ["Microsoft", "Netscape", "Google", "Apple"],
            answer: "Netscape"
        },
        {
            question: "Which keyword declares a variable in JavaScript?",
            options: ["var", "int", "string", "define"],
            answer: "var"
        },
        {
            question: "What does CSS stand for?",
            options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
            answer: "Cascading Style Sheets"
        },
        {
            question: "Which HTML element is used for the largest heading?",
            options: ["<h1>", "<h6>", "<heading>", "<head>"],
            answer: "<h1>"
        },
        {
            question: "Which JavaScript function shows a popup message?",
            options: ["message()", "popup()", "alert()", "show()"],
            answer: "alert()"
        },
        {
            question: "Which CSS property changes the background color?",
            options: ["color", "bgcolor", "background-color", "fill"],
            answer: "background-color"
        },
        {
            question: "Which HTML tag creates a line break?",
            options: ["<break>", "<br>", "<lb>", "<newline>"],
            answer: "<br>"
        },
        {
            question: "Which JavaScript event occurs when a button is clicked?",
            options: ["onchange", "onmouseover", "onclick", "onload"],
            answer: "onclick"
        },
        {
            question: "Which HTML tag is used for an unordered list?",
            options: ["<ol>", "<ul>", "<li>", "<list>"],
            answer: "<ul>"
        },
        {
            question: "Which CSS property controls text size?",
            options: ["font-size", "text-size", "size", "font-style"],
            answer: "font-size"
        },
        {
            question: "Which HTML tag is used to create a form?",
            options: ["<form>", "<input>", "<fieldset>", "<label>"],
            answer: "<form>"
        },
        {
            question: "Which input type hides typed characters?",
            options: ["text", "email", "password", "number"],
            answer: "password"
        },
        {
            question: "Which CSS property is used to make text bold?",
            options: ["font-style", "font-weight", "text-bold", "bold"],
            answer: "font-weight"
        },
        {
            question: "Which JavaScript keyword is used for constants?",
            options: ["let", "var", "const", "fixed"],
            answer: "const"
        },
        {
            question: "Which HTML tag is used to play videos?",
            options: ["<media>", "<movie>", "<video>", "<play>"],
            answer: "<video>"
        },
        {
            question: "Which CSS property adds space inside an element?",
            options: ["margin", "padding", "spacing", "border"],
            answer: "padding"
        },
        {
            question: "Which CSS property adds space outside an element?",
            options: ["padding", "margin", "border", "spacing"],
            answer: "margin"
        },
        {
            question: "Which JavaScript operator checks equality and type?",
            options: ["==", "=", "===", "!="],
            answer: "==="
        },
        {
            question: "Which HTML tag is used for tables?",
            options: ["<tb>", "<table>", "<tr>", "<td>"],
            answer: "<table>"
        },
        {
            question: "Which CSS value centers a flex item horizontally?",
            options: ["align-items:center", "justify-content:center", "text-align:center", "margin:auto"],
            answer: "justify-content:center"
        }
    ];

    function getRandomQuestions() {
        return [...allQuestions]
            .sort(() => Math.random() - 0.5)
            .slice(0, 10);
    }

    let quizData = getRandomQuestions();

    let currentQuestion = 0;
    let score = 0;
    let attempted = 0;
    let userAnswers = [];
    let timeLeft = 15;
    let timerInterval;
    let streak = 0;

    const timerEl = document.getElementById("time");
    const questionEl = document.querySelector(".question");
    const optionsEl = document.querySelector(".options");
    const feedbackEl = document.getElementById("feedback");
    const resultEl = document.querySelector(".result");
    const scoreEl = document.getElementById("score");
    const totalEl = document.getElementById("total");
    const percentEl = document.getElementById("percent");
    const summaryEl = document.getElementById("summary");
    const reviewEl = document.getElementById("review");
    const restartBtn = document.querySelector(".restart-btn");
    const streakEl = document.getElementById("streak-count");
    const progressFill = document.getElementById("progress-fill");
    const questionNumberEl = document.getElementById("question-number");

    function clearFeedback() {
        feedbackEl.textContent = "";
        feedbackEl.className = "feedback";
    }

    function setFeedback(correct) {
        feedbackEl.textContent = correct ? "Correct ✓" : "Wrong ✗";
        feedbackEl.className = correct
            ? "feedback correct"
            : "feedback wrong";
    }

    function startTimer() {
        clearInterval(timerInterval);

        timeLeft = 15;
        timerEl.textContent = timeLeft;

        timerInterval = setInterval(() => {

            timeLeft--;
            timerEl.textContent = timeLeft;

            if (timeLeft <= 0) {

                clearInterval(timerInterval);

                recordAnswer(null);

                currentQuestion++;

                loadQuestion();
            }

        }, 1000);
    }

    function recordAnswer(selected) {

        const q = quizData[currentQuestion];

        const isCorrect = selected === q.answer;

        attempted++;

        userAnswers.push({
            question: q.question,
            selected,
            correct: q.answer,
            isCorrect
        });

        if (isCorrect) {
            score++;
            streak++;
        } else {
            streak = 0;
        }

        streakEl.textContent = streak;
    }

    function loadQuestion() {

        if (currentQuestion >= quizData.length) {
            endQuiz();
            return;
        }

        clearFeedback();

        questionNumberEl.textContent =
            `Question ${currentQuestion + 1} of ${quizData.length}`;

        progressFill.style.width =
            `${(currentQuestion / quizData.length) * 100}%`;

        const currentQuiz = quizData[currentQuestion];

        questionEl.textContent = currentQuiz.question;

        optionsEl.innerHTML = "";

        currentQuiz.options.forEach(option => {

            const button = document.createElement("button");

            button.classList.add("option");

            button.textContent = option;

            button.addEventListener("click", () =>
                handleOptionClick(button, option)
            );

            optionsEl.appendChild(button);

        });

        startTimer();
    }

    function handleOptionClick(button, selectedOption) {

        clearInterval(timerInterval);

        const correctAnswer = quizData[currentQuestion].answer;

        const isCorrect = selectedOption === correctAnswer;

        document
            .querySelectorAll(".option")
            .forEach(btn => {
                btn.disabled = true;

                if (btn.textContent === correctAnswer) {
                    btn.classList.add("correct");
                }
            });

        if (!isCorrect) {
            button.classList.add("wrong");
        }

        setFeedback(isCorrect);

        recordAnswer(selectedOption);

        setTimeout(() => {

            currentQuestion++;

            loadQuestion();

        }, 1000);
    }

    function endQuiz() {

        clearInterval(timerInterval);

        progressFill.style.width = "100%";

        questionNumberEl.textContent =
            `Question ${quizData.length} of ${quizData.length}`;

        questionEl.style.display = "none";
        optionsEl.style.display = "none";
        feedbackEl.style.display = "none";

        resultEl.style.display = "block";
        restartBtn.style.display = "block";

        const total = quizData.length;
        const percent = Math.round((score / total) * 100);

        scoreEl.textContent = score;
        totalEl.textContent = total;
        percentEl.textContent = percent;

        summaryEl.textContent =
            `${score}/${total} correct • ${percent}% Score`;

        reviewEl.innerHTML = "<div class='review-title'>Answer Review</div>";

        quizData.forEach((q, index) => {

            const answer = userAnswers[index];

            const item = document.createElement("div");

            item.className =
                `review-item ${answer?.isCorrect ? "is-correct" : "is-wrong"}`;

            item.innerHTML = `
<div class="review-question">
${index + 1}. ${q.question}
</div>

<div class="review-line">
<strong>Your answer:</strong>
${answer?.selected ?? "Unanswered"}
</div>

<div class="review-line">
<strong>Correct:</strong>
${q.answer}
</div>
`;

            reviewEl.appendChild(item);

        });
    }

    restartBtn.addEventListener("click", () => {

        currentQuestion = 0;
        score = 0;
        attempted = 0;
        userAnswers = [];
        streak = 0;

        quizData = getRandomQuestions();

        streakEl.textContent = "0";

        questionEl.style.display = "block";
        optionsEl.style.display = "flex";
        feedbackEl.style.display = "block";

        resultEl.style.display = "none";
        restartBtn.style.display = "none";

        loadQuestion();
    });

    loadQuestion();

});