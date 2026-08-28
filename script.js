const questions = [
    "What is something that always makes you happy?",
    "What is something you could never live without?",
    "What is your favorite memory?",
    "if you where an animal what will you be.",
    "What is something you wish more people knew about you?",
    "What's something you really love about yourselfٍ?"
];


let currentQuestion = 0;
let userName = "";
let answers = [];


function showPage(pageId) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");
}


function startQuiz() {

    const input =
        document.getElementById("nameInput");

    const name =
        input.value.trim();

    if (name === "") {

        alert("Please enter your name.");

        return;
    }

    userName = name;

    currentQuestion = 0;

    answers = [];


    // نخلي Firebase يشوف البيانات
    window.userName = userName;

    window.answers = answers;
    const music = document.getElementById("backgroundMusic");

music.volume = 0.35;
music.play();


    showQuestion();

    showPage("questionPage");
}


function showQuestion() {

    document.getElementById("questionNumber").textContent =
        `Question ${currentQuestion + 1} / ${questions.length}`;

    document.getElementById("questionText").textContent =
        questions[currentQuestion];

    document.getElementById("answerInput").value = "";
}


function nextQuestion() {

    const input =
        document.getElementById("answerInput");

    const answer =
        input.value.trim();


    if (answer === "") {

        alert("Write something first.");

        return;
    }


    answers.push(answer);

    // تحديث البيانات اللي Firebase هيحفظها
    window.answers = answers;


    currentQuestion++;


    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        createResult();

        showPage("resultPage");


        // حفظ الإجابات في Firebase
        if (window.saveAnswers) {

            window.saveAnswers();

        } else {

            console.error(
                "Firebase is not ready yet."
            );

        }

    }
}


function createResult() {

    document.getElementById("resultName").textContent =
        userName;

    document.getElementById("chartName").textContent =
        userName;


    for (let i = 0; i < 6; i++) {

        const card =
            document.getElementById(
                `answer${i + 1}`
            );

        card.textContent =
            answers[i] || "";

    }
}


function showBoxes() {

    showPage("boxesPage");
}


const messages = {

    1: "i like your eyes",

    2: "You're doing better than you think.",

    3: "There is more to you than you realize.",

    4: "You make things a little brighter just by being here."

};


function openBox(number) {

    document.getElementById("messageBox").textContent =
        messages[number];

    showPage("messagePage");
}


function showFinal() {

    showPage("finalPage");

    document.getElementById("finalMessage").textContent =
        "";
}


function yesClicked() {

    document.getElementById("finalMessage").textContent =
        "I knew it. ♡";

    setTimeout(() => {

        document.getElementById("happinessMessage").style.display =
            "flex";

    }, 800);
}


function runAway() {

    const button =
        document.getElementById("noButton");


    const maxX =
        window.innerWidth - 150;

    const maxY =
        window.innerHeight - 100;


    const randomX =
        Math.floor(Math.random() * maxX);

    const randomY =
        Math.floor(Math.random() * maxY);


    button.style.position = "fixed";

    button.style.left =
        `${randomX}px`;

    button.style.top =
        `${randomY}px`;
}