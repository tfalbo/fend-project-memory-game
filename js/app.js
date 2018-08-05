/*
 * Create a list that holds all of your cards
 */
let card = document.getElementsByClassName("card");
let cards = [...card];
let openCards = [];
let matchedCards = [];
let moveCount = 0;
let counter = document.querySelector(".moves");

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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



function displayCard() {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");

 }

 function resetCounter(){
    moveCount = 0;
    counter.innerHTML = moveCount;
 }
 function moveCounter(){
    moveCount++;
    counter.innerHTML = moveCount;
 }

 function lockCards(){
    for(i=0;i<2;i++){
        openCards[i].classList.add("match");
        openCards[i].classList.remove("show", "open");
    }
    openCards = [];
 }

 function hideCards(){
    for(i=0;i<2;i++){
        openCards[i].classList.remove("show", "open");
    }
    openCards = [];
 }
 
function matchCards() {
    matchedCards.push.apply(matchedCards,openCards);
    lockCards();
}

 function openCard() {
    openCards.push(this);
    var len = openCards.length;
    if(len === 2){
        if(openCards[0].type === openCards[1].type){
            matchCards();
        } else {
            hideCards();
        }
        moveCounter();
    }
 }

 document.body.onload = startGame();

 function startGame(){
     resetCounter();
     cards = shuffle(cards);
 }

function finishGame(){
    if(matchedCards.length === 16){
        startGame();
    }
}

 // My Listeners
 for (var i = 0; i < cards.length; i++){
    cards[i].addEventListener("click", displayCard);
    cards[i].addEventListener("click", openCard);
    cards[i].addEventListener("click", finishGame);
  };
 