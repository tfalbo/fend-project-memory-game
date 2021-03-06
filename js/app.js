// Variables for cards and lists
let card = document.getElementsByClassName("card");
let cards = [...card];
const cardsList = document.getElementById("cardsList");
let openCards = [];
let matchedCards = [];
let moveCount = 0;
let counter = document.querySelector(".moves");
let modal = document.getElementsByClassName("modal");
let starCount = 3;
let modalStars = document.getElementsByClassName("score_stars");
let modalTime = document.getElementsByClassName("score_time");

//Timer
let timer = new Timer();
timer.start();
timer.addEventListener('secondsUpdated', function (e) {
    document.getElementById("gameTimer").innerHTML = timer.getTimeValues().toString();
});


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



// Display cards when clicked.
function displayCard() {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
 }

// Check Stars
function checkStars (){
    let starsLi = document.getElementsByClassName("stars")[0];
    if (moveCount == 5) {
        starsLi.childNodes[5].classList.toggle("hidden");
        starCount = 2;
        modalStars.innerHTML = '<i class="fa fa-star"></i><i class="fa fa-star"></i>';
    }
    if (moveCount == 10) {
        starsLi.childNodes[3].classList.toggle("hidden");
        starCount = 1;
        modalStars.innerHTML = '<i class="fa fa-star"></i>';

    } 
    if (moveCount == 15) {
        starsLi.childNodes[1].classList.toggle("hidden");
        starCount = 0;
        modalStars.innerHTML = '';

    } 
    if (moveCount == 0){
        starsLi.childNodes[5].classList.remove("hidden");
        starsLi.childNodes[3].classList.remove("hidden");
        starsLi.childNodes[1].classList.remove("hidden");
        starCount = 3;
        modalStars.innerHTML = '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';
    }
}

// Resets move counter
function resetCounter(){
    moveCount = 0;
    counter.innerHTML = moveCount;
    checkStars();
}


 // Increments move counter
function moveCounter(){
    moveCount++;
    counter.innerHTML = moveCount;
    checkStars();
}

// Lock matched cards
function lockCards(){
    for(i=0;i<2;i++){
        openCards[i].classList.add("match");
        openCards[i].classList.remove("show", "open");
    }
    openCards = [];
}

// Hides unmatched cards
 function hideCards(){
    for(i=0;i<2;i++){
        openCards[i].classList.remove("show", "open");
    }
    openCards = [];
 }
 
// Matches cards
function matchCards() {
    matchedCards.push.apply(matchedCards,openCards);
    lockCards();
}

// Opens cards
function openCard() {
    if(openCards.length < 2){
        openCards.push(this);
    }
    setTimeout(function() {
        if(openCards.length === 2){
            if(openCards[0].type === openCards[1].type){
                matchCards();
            } else {
                hideCards();
            }
            moveCounter();
        }
    }, 1000);
    
}

document.body.onload = startGame();

// Starts game and apply shuffled cards
function startGame(){
     resetCounter(); // Reset Move Counter
     timer.reset(); // Reset Timer
     cards = shuffle(cards);
     cardsList.innerHTML = "";
     for (var i = 0; i < cards.length; i++){
        [].forEach.call(cards, function(item) {
            cardsList.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match");
    }
}

function showModal() {
    modalTime.innerHTML = document.getElementById("gameTimer").innerHTML;
    modal[0].classList.remove("hidden");
}

function closeModal() {
    modal[0].classList.add("hidden");
}

// Finishes games
function finishGame() {
    if(matchedCards.length === 16){
        showModal();
    }
}

 // Listeners for Events
 for (var i = 0; i < cards.length; i++){
    cards[i].addEventListener("click", displayCard);
    cards[i].addEventListener("click", openCard);
    cards[i].addEventListener("click", finishGame);
  };
 