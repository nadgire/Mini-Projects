"use strick";

const Scramble = [
  { Word: "ABANDON", Hint: "To leave behind or forsake." },
  { Word: "ANIMAL", Hint: "A living creature, typically one that is not a human." },
  { Word: "BALLOON", Hint: "A flexible container filled with air." },
  { Word: "CABINET", Hint: "A piece of furniture for storage." },
  { Word: "CHURCH", Hint: "A place of worship." },
  { Word: "CIRCUS", Hint: "A traveling show with animals and performers." },
  { Word: "DANGER", Hint: "The possibility of harm or injury." },
  { Word: "GARDEN", Hint: "An area where plants are grown." },
  { Word: "HORIZON", Hint: "The line where the earth and sky seem to meet." },
  { Word: "JOURNAL", Hint: "A personal daily record of events or thoughts." },
  { Word: "KITCHEN", Hint: "A room used for cooking." },
  { Word: "LANTERN", Hint: "A portable light source." },
  { Word: "MONSTER", Hint: "A frightening creature." },
  { Word: "MUSEUM", Hint: "A place for displaying art or historical objects." },
  { Word: "OPINION", Hint: "A personal view or belief." },
  { Word: "PENCIL", Hint: "A tool for writing or drawing." },
  { Word: "PLAYER", Hint: "A person participating in a game." },
  { Word: "RANDOM", Hint: "Happening without any specific pattern." },
  { Word: "SCHOOL", Hint: "An institution for educating children." },
  { Word: "TIGER", Hint: "A large wild cat with stripes." },
  { Word: "ANALYZE", Hint: "To examine something in detail." },
  { Word: "BOTTLE", Hint: "A container, typically for liquids." },
  { Word: "CIRCLE", Hint: "A round shape with no corners." },
  { Word: "DOLPHIN", Hint: "A playful sea mammal." },
  { Word: "EFFECT", Hint: "A change that has occurred because of something." },
  { Word: "FAMILY", Hint: "A group of related people." },
  { Word: "GUITAR", Hint: "A stringed musical instrument." },
  { Word: "HISTORY", Hint: "The study of past events." },
  { Word: "ISLAND", Hint: "A piece of land surrounded by water." },
  { Word: "JUNGLE", Hint: "A dense, tropical forest." },
  { Word: "KINGDOM", Hint: "A region or domain ruled by a monarch." },
  { Word: "LANTERN", Hint: "A portable light used outdoors." },
  { Word: "MOBILE", Hint: "Able to move or be moved." },
  { Word: "NATURE", Hint: "The natural world, especially animals and plants." },
  { Word: "OCTOBER", Hint: "The tenth month of the year." },
  { Word: "PICTURE", Hint: "A visual representation of something." },
  { Word: "QUIETLY", Hint: "In a calm or silent manner." },
  { Word: "RESCUE", Hint: "To save from harm or danger." },
  { Word: "THEATER", Hint: "A place for watching plays or movies." },
  { Word: "AMOUNT", Hint: "A quantity or sum." },
  { Word: "BEGINNER", Hint: "Someone just starting something." },
  { Word: "COLDNESS", Hint: "The state of being cold." },
  { Word: "DOUBT", Hint: "To question or be uncertain." },
  { Word: "EFFECTS", Hint: "Changes brought about by something." },
  { Word: "GATHER", Hint: "To collect or assemble." },
  { Word: "HARVEST", Hint: "To gather crops." },
  { Word: "INSIGHT", Hint: "A deep understanding of something." },
  { Word: "JOURNEY", Hint: "A trip or voyage from one place to another." },
  { Word: "KITCHEN", Hint: "A room used for cooking food." },
  { Word: "LITTLE", Hint: "Small in size or amount." },
  { Word: "MYSTERY", Hint: "Something that is not easily understood." },
  { Word: "NECESS", Hint: "Required or essential." },
  { Word: "OPTIMAL", Hint: "The best or most effective." },
  { Word: "PRIORITY", Hint: "Something that is considered more important." },
  { Word: "QUESTION", Hint: "A sentence or phrase used to inquire." },
  { Word: "RECEIVE", Hint: "To get or be given something." },
  { Word: "SIMPLE", Hint: "Easy to understand or do." },
  { Word: "TOURIST", Hint: "A person traveling for pleasure." },
  { Word: "UNIQUE", Hint: "One of a kind, unlike anything else." },
  { Word: "VILLAGE", Hint: "A small community or settlement." },
  { Word: "WRITER", Hint: "Someone who writes stories, books, or articles." },
  { Word: "ADVANCE", Hint: "To move forward or make progress." },
  { Word: "BEAUTY", Hint: "A quality that pleases the senses." },
  { Word: "CIRCUM", Hint: "A prefix meaning 'around' or 'about.'" },
  { Word: "DEFINES", Hint: "To describe or explain the meaning." },
  { Word: "EXPLAIN", Hint: "To make something clear or easy to understand." },
  { Word: "FANTASY", Hint: "Imagination, especially the creation of unrealistic scenarios." },
  { Word: "GLASSES", Hint: "Eyewear used to correct vision." },
  { Word: "HARDEST", Hint: "The most difficult or challenging." },
  { Word: "INCLUDE", Hint: "To contain as part of a whole." },
  { Word: "JOURNAL", Hint: "A personal record of events or thoughts." },
  { Word: "LITTLE", Hint: "Small in size or amount." },
  { Word: "MAGNET", Hint: "An object that attracts certain metals." },
  { Word: "NEEDLE", Hint: "A sharp, pointed object used for sewing." },
  { Word: "ORANGE", Hint: "A color or a type of fruit." },
  { Word: "PRISON", Hint: "A place for holding criminals." },
  { Word: "REPEAT", Hint: "To do something again." },
  { Word: "STUDYING", Hint: "The act of learning or reviewing material." },
  { Word: "TOWARDS", Hint: "In the direction of." },
  { Word: "UNKNOWN", Hint: "Not recognized or identified." },
  { Word: "VILLAGE", Hint: "A small settlement." },
  { Word: "WILDLY", Hint: "In an uncontrolled or chaotic manner." },
  { Word: "XENOPHOBIA", Hint: "A fear or hatred of strangers or foreigners." },
  { Word: "YOUNGER", Hint: "A person or thing that is less old." },
  { Word: "ZEBRA", Hint: "A black and white striped animal." },
  { Word: "ACCEPTS", Hint: "To agree to receive something." },
  { Word: "BALANCE", Hint: "A state of being even or equal." },
  { Word: "CAROUSE", Hint: "To engage in lively, merry-making." },
  { Word: "DETAINER", Hint: "One who holds someone in custody." },
  { Word: "ENLIGHTEN", Hint: "To give someone greater knowledge or understanding." },
  { Word: "FATHER", Hint: "A male parent." },
  { Word: "GLITTER", Hint: "To shine with a bright, shimmering reflected light." },
  { Word: "HARMONY", Hint: "A pleasing arrangement of parts." },
  { Word: "INCITE", Hint: "To provoke or stir up (feelings or actions)." },
  { Word: "JOINED", Hint: "Formed a connection or link." },
  { Word: "KNOWLEDGE", Hint: "Facts, information, and skills acquired by a person." },
  { Word: "LEADER", Hint: "A person who leads or commands a group." },
  { Word: "MYSTIC", Hint: "Relating to mysteries or hidden truths." },
  { Word: "NATION", Hint: "A large group of people with common identity." },
  { Word: "OUTLOOK", Hint: "A view or perspective on something." },
  { Word: "PRIOR", Hint: "Existing or occurring before in time." },
  { Word: "QUICKLY", Hint: "At a fast pace." },
  { Word: "RUSHING", Hint: "Moving with great speed." },
  { Word: "STRIVE", Hint: "To make great efforts toward a goal." },
  { Word: "TEMPER", Hint: "A state of emotional agitation." },
  { Word: "UNDERSTANDING", Hint: "The ability to comprehend something." },
  { Word: "VIGOROUS", Hint: "Full of energy or force." },
  { Word: "WISDOM", Hint: "The ability to make good judgments based on experience." },
  { Word: "XENON", Hint: "A colorless, inert gas." },
  { Word: "YOUTHFUL", Hint: "Characteristic of being young." },
  { Word: "ZEALOT", Hint: "A person who is fanatical in their pursuit of a cause." }
];

const loadingAnim = document.getElementById("loadingAnim");
const loadingPercentage = document.getElementById("loadingPercentage");
const loadDiv = document.getElementById("loadDiv");
const header = document.getElementById("header");
const anim = document.getElementById("anim");
const game = document.getElementById("game");
const scrambledWord = document.getElementById("scrambledWord");
const hint = document.getElementById("hint");
const userInput = document.getElementById("userInput");
const headerHearts = document.getElementsByClassName("headerHearts");
const btnEndGame = document.querySelector("#footer input[type=button]")
const btnPlay = document.querySelector("#anim button");

var score = 0;
var count = 0;
var timer;
var randomWord;
var playedWords = [];
var index;

var lives = 3;
var hearts = 0;

btnPlay.addEventListener("click", function () {
  count = 0;
  loadDiv.classList.remove("hidden");
  timer = setInterval(playAnim, 25);
})

userInput.lastElementChild.addEventListener("click", function () {
  var x = userInput.firstElementChild.value;
  if (x == "") {
    alert("Please enter your answer!")
  }
  else {
    userInput.firstElementChild.setAttribute("disabled", "");
    userInput.lastElementChild.setAttribute("disabled", "");
    userInput.lastElementChild.style.backgroundColor = "gray";
    if (randomWord.Word == x.toUpperCase()) {
      userInput.firstElementChild.style.color = "green";
      score++;
      header.lastElementChild.textContent = "SCORE : " + score;

      setTimeout(() => {
        userInput.firstElementChild.style.color = "white";
        playGame();
      }, 2000);
    }
    else {
      incorrctAnswer();
    }
  }
})

btnEndGame.addEventListener("click", function () {
  showResult();
})

function playAnim() {
  count++;
  if (count <= 100) {
    loadingAnim.style.width = count + "%";
    loadingPercentage.textContent = "Loading... " + count + "%";
  }
  else {
    clearInterval(timer);
    loadingPercentage.innerText = "Completed";
    anim.classList.add("hidden");
    game.classList.remove("hidden");
    setGameInitialStage();
  }
}

function setGameInitialStage() {
  playedWords = [];
  hearts = 0;
  score = 0;
  lives = 3;
  header.firstElementChild.firstElementChild.classList.add("fa-solid");
  header.firstElementChild.firstElementChild.nextElementSibling.classList.add("fa-solid");
  header.firstElementChild.lastElementChild.classList.add("fa-solid");
  header.lastElementChild.textContent = "SCORE : " + score;
  playGame();
}

function generateIndex() {
  return Math.floor(Math.random() * Scramble.length);
}

function playGame() {
  userInput.firstElementChild.removeAttribute("disabled", "");
  userInput.lastElementChild.removeAttribute("disabled", "");
  userInput.lastElementChild.style.backgroundColor = "#facc15";
  userInput.firstElementChild.style.color = "white";
  userInput.firstElementChild.value = "";
  scrambledWord.innerHTML = "";
  scrambledWord.textContent = "";
  userInput.firstElementChild.focus();

  index = generateIndex();

  for (let i = 0; i < playedWords.length; i++) {
    if (index == playedWords[i]) {
      i = -1;
      index = generateIndex();
    }
  }

  if (playedWords.length == Scramble.length) {
    showResult();
    // resetGame();
  }

  randomWord = Scramble[index];
  let arr = [];
  for (let i = 0; i < randomWord.Word.length; i++) {
    arr.push(randomWord.Word[i]);
  }

  while (arr.length > 0) {
    var randomIndex = Math.floor(Math.random() * arr.length)
    var d = document.createElement("span");
    var temp = arr.splice(randomIndex, 1);
    d.textContent = temp;
    scrambledWord.appendChild(d);
  }
  hint.textContent = "Hint : " +randomWord.Hint;
  playedWords.push(index);
}

function showResult() {
  alert("Game ended. Your total score is : " + score);
  resetGame();
}

function showCorrectResultOnFail() {
  userInput.firstElementChild.style.color = "yellow";
  userInput.firstElementChild.value = randomWord.Word;
}

function incorrctAnswer() {
  lives--;
  headerHearts[hearts].classList.remove("fa-solid");
  headerHearts[hearts].classList.add("fa-regular");
  hearts++;
  userInput.firstElementChild.style.color = "red";
  if (lives == 0) {
    setTimeout(() => {
      showResult();
    }, 3000);
  }
  setTimeout(() => {
    showCorrectResultOnFail();

  }, 2000);

  setTimeout(() => {
    playGame();
  }, 4000);
}

function resetGame() {
  loadDiv.classList.add("hidden");
  anim.classList.remove("hidden");
  game.classList.add("hidden");
  setGameInitialStage();
}

