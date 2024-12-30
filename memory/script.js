let flippedCards = [];
let matchedCards = 0;

// Game settings (you can change these values to define the grid size)
const rows = 4; // Number of rows
const columns = 4; // Number of columns
const totalCards = rows * columns;
const gameContainer = document.querySelector(".game-container");

// Create an array of card values
function createCards() {
    const cardsArray = [];
    const totalPairs = totalCards / 2;

    // Fill with pairs of numbers
    for (let i = 1; i <= totalPairs; i++) {
        cardsArray.push(i, i);
    }

    // Shuffle the cards
    cardsArray.sort(() => Math.random() - 0.5);

    return cardsArray;
}

// Create and display cards on the grid
function generateGrid() {
    const cardsArray = createCards();

    // Set up grid layout
    gameContainer.style.gridTemplateColumns = `repeat(${columns}, 100px)`;
    gameContainer.style.gridTemplateRows = `repeat(${rows}, 100px)`;

    // Create card elements
    cardsArray.forEach((cardValue, index) => {
        const card = document.createElement("div");
        card.classList.add("card", "hidden");
        card.dataset.card = cardValue;
        gameContainer.appendChild(card);

        // Add click event for each card
        card.addEventListener("click", () => flipCard(card));
    });
}

// Flip a card
function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
        card.classList.add("flipped");
        card.innerText = card.dataset.card;
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

// Unflip a card
function unflipCard(card) {
    card.classList.remove("flipped");
    card.innerText = "";
}

// Check if two flipped cards match
function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.card === secondCard.dataset.card) {
        matchedCards += 2;
        if (matchedCards === totalCards) {
            setTimeout(() => alert("You win! Play again."), 500);
        }
    } else {
        setTimeout(() => {
            unflipCard(firstCard);
            unflipCard(secondCard);
        }, 1000);
    }

    flippedCards = [];
}

// Initialize the game
generateGrid();
