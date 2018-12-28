
// __________________________________________________

var quiz = $("#quiz");
var startTime = 30;
var timer;

// __________________________________________________

var questions = [{

  question: "Who is the Most Famous Video Game Character of all Time?",
  choices: ["Link", "Mario", "Donkey Kong", "Sonic"],
  answer: "Mario",
  image: "assets/images/mario.jpg"

}, {

  question: "Who is the hero of the Legend of Zelda Series?",
  choices: ["Ganon", "Luigi", "Link", "Zelda"],
  answer: "Link",
  image: "assets/images/link.jpg"

}, {

  question: "In what Game Series are Golden Rings used as Life-energy and Money",
  choices: ["Sonic the Hedgehog", "Metal Gear Solid", "Super Mario", "Final Fantasy"],
  answer: "Sonic the Hedgehog",
  image: "assets/images/sonic.jpg"

}, {

  question: "Who is the main character of the Metroid series?",
  choices: ["Sheik", "Cloud", "Samuel", "Samus"],
  answer: "Samus",
  image: "assets/images/samus.png"

}, {

  question: "Which Pokemon is easily the most well known?",
  choices: ["Charmander", "Pikachu", "Bulbasaur", "Squirtle"],
  answer: "Pikachu",
  image: "assets/images/pikachu.jpg"

}];

// __________________________________________________

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: startTime,
  correct: 0,
  incorrect: 0,

  // ___________
  
  countdown: function() {

    this.counter--;

    $("#time-left").text(this.counter);

    if (this.counter === 0) {

      console.log("Time is Up!!");

      this.outOfTime();

    }
  },

  // ___________
  
  startGame: function() {

    timer = setInterval(this.countdown.bind(this), 1000);

    quiz.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].choices.length; i++) {

      quiz.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].choices[i] + "'>" + questions[this.currentQuestion].choices[i] + "</button>");

    }
  },

  nextQuestion: function() {

    this.counter = window.startTime;

    $("#time-left").text(this.counter);

    this.currentQuestion++;

    this.startGame.bind(this)();
     console.log(this);
  },

  // ___________
  
  outOfTime: function() {

    clearInterval(window.timer);

    $("#time-left").text(this.counter);

    quiz.html("<h2>You're Out of Time!</h2>");

    quiz.append("<h3>The correct answer is: " + questions[this.currentQuestion].answer);

    quiz.append("<img src'" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {

      setTimeout(this.results, 3 * 1000);

    } else {

      setTimeout(this.nextQuestion, 3 * 1000);

    }
  },

  // ___________
  
  results: function() {

    clearInterval(window.timer);

    quiz.html("<h2>Let's see how you did!</h2>");

    $("#time-left").text(this.counter);

    quiz.append("<h3>Correct: " + this.correct + "</h3>");

    quiz.append("<h3>Incorrect: " + this.incorrect + "</h3>");

    quiz.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");

    quiz.append("<br><button id='restart'>Try Agian?</button>");

  },

  // ___________
  
  clicked: function(event) {

    clearInterval(window.timer);

    if ($(event.target).attr("data-name") === questions[this.currentQuestion].answer) {
      this.correctAnswer();

    } else {

      this.incorrectAnswer();

    }
  },

  // ___________

  correctAnswer: function() {

    clearInterval(window.timer);

    this.correct++;

    quiz.html("<h2>Correct!</h2>");

    quiz.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {

      setTimeout(this.results.bind(this), 3 * 1000);

    } else {

      setTimeout(this.nextQuestion.bind(this), 3 * 1000);

      // console.log(this);
    }
  },

  // ___________

  incorrectAnswer: function() {

    this.incorrect++;

    clearInterval(window.timer);

    quiz.html("<h2>Sorry!</h2>");

    quiz.append("<h3>The correct answer is: " + questions[this.currentQuestion].answer + "</h3>");

    quiz.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {

      setTimeout(this.results.bind(this), 3 * 1000);

    } else {

      setTimeout(this.nextQuestion.bind(this), 3 * 1000);

      // console.log(this);
    }
  },

  // ___________

  restart: function() {

    this.currentQuestion = 0;
    this.counter = startTime;
    this.correct = 0;
    this.incorrect = 0;
    this.startGame();

  }
};

// __________________________________________________

$(document).on("click", "#restart", game.restart.bind(game));

  // ___________
  
$(document).on("click", ".answer-button", function(event) {

  game.clicked.bind(game, event)();

});

  // ___________
  
$(document).on("click", "#start", function() {

  $("#wrapper").prepend("<h2>Time Remaining: <span id='time-left'>30</span> Seconds</h2>");

  game.startGame.bind(game)();

});