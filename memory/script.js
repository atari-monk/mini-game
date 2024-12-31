import { Menu } from "./Menu.js";

let flippedCards = [];
let matchedCards = 0;
let isProcessing = false; // Flag to prevent clicks during processing
const gameContainer = document.querySelector("#game-container");
const menuDiv = document.querySelector("#menu");
const gridIndicator = document.querySelector("#grid-indicator");
const winOverlay = document.querySelector("#win-overlay");

const menu = new Menu(menuDiv, (option) => {
    generateGrid(option.rows, option.columns, option.cardSize);
});

// Fetch and render the menu options
await menu.fetchGridOptions("grid-options.json");

// Function to generate and render the grid based on rows, columns, and cardSize
function generateGrid(rows, columns, cardSize) {
    matchedCards = 0;
    flippedCards = [];
    isProcessing = false; // Reset flag for new game
    gameContainer.innerHTML = ""; // Clear any existing game

    const totalCards = rows * columns;
    const cardsArray = createCards(totalCards);

    // Set up grid layout dynamically
    gameContainer.style.gridTemplateColumns = `repeat(${columns}, ${cardSize}px)`;
    gameContainer.style.gridTemplateRows = `repeat(${rows}, ${cardSize}px)`;

    // Create card elements
    cardsArray.forEach((cardValue) => {
        const card = document.createElement("div");
        card.classList.add("card", "hidden");
        card.dataset.card = cardValue;
        card.style.width = `${cardSize}px`;
        card.style.height = `${cardSize}px`; // Set dynamic card size
        gameContainer.appendChild(card);

        // Add click event for each card
        card.addEventListener("click", () => flipCard(card));
    });

    // Show the game grid
    document.getElementById("grid-wrapper").style.display = "block";
    updateGridIndicator(true); // Set the indicator to green initially (clickable)
}

// Function to create the cards array
function createCards(totalCards) {
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

// Function to flip a card
function flipCard(card) {
    // Prevent flipping if there are already 2 flipped cards or if the game is processing
    if (
        flippedCards.length >= 2 ||
        card.classList.contains("flipped") ||
        isProcessing
    ) {
        return;
    }

    card.classList.add("flipped");
    card.innerText = card.dataset.card;
    flippedCards.push(card);

    // If two cards are flipped, show the red indicator
    if (flippedCards.length === 2) {
        updateGridIndicator(false); // Show red indicator when cards are being compared
        isProcessing = true; // Block further clicks until comparison is made
        checkMatch();
    }
}

// Function to unflip a card
function unflipCard(card) {
    card.classList.remove("flipped");
    card.innerText = "";
}

// Function to check if the two flipped cards match
function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.card === secondCard.dataset.card) {
        matchedCards += 2;
        if (matchedCards === gameContainer.children.length) {
            setTimeout(() => {
                showWinOverlay();
            }, 1000);
        }
    } else {
        setTimeout(() => {
            unflipCard(firstCard);
            unflipCard(secondCard);
        }, 1000); // Delay to give time for player to see both cards
    }

    flippedCards = [];

    // After processing, re-enable the ability to flip cards
    setTimeout(() => {
        isProcessing = false; // Re-enable flipping after the delay
        updateGridIndicator(true); // Set the indicator to green (clickable)
    }, 1000); // Time interval to block clicks (1 second)
}

// Function to show the win overlay
function showWinOverlay() {
    winOverlay.style.display = "block";
    setTimeout(() => {
        winOverlay.style.display = "none";
        // Hide the grid and show the menu again
        document.getElementById("grid-wrapper").style.display = "none";
        menuDiv.style.display = "block";
    }, 2000); // Display the overlay for 2 seconds
}

// Function to update the state of the grid indicator
function updateGridIndicator(isClickable) {
    if (isClickable) {
        gridIndicator.style.backgroundColor = "green"; // Green circle (clickable)
    } else {
        gridIndicator.style.backgroundColor = "red"; // Red circle (blocked)
    }
}
