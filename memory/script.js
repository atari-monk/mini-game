let flippedCards = [];
let matchedCards = 0;
let isProcessing = false; // Flag to prevent clicks during processing
const gameContainer = document.querySelector("#game-container");
const menuDiv = document.querySelector("#menu");

// Fetch the grid options from the JSON file
async function fetchGridOptions() {
    const response = await fetch("grid-options.json");
    const gridOptions = await response.json();
    renderMenu(gridOptions);
}

// Render the grid size options as buttons
function renderMenu(gridOptions) {
    gridOptions.forEach((option) => {
        const button = document.createElement("button");
        button.classList.add("menu-button");
        button.dataset.rows = option.rows;
        button.dataset.columns = option.columns;
        button.textContent = option.label;
        button.addEventListener("click", () => {
            // Hide the menu and show the grid
            document.getElementById("menu").style.display = "none";
            generateGrid(option.rows, option.columns);
        });
        menuDiv.appendChild(button);
    });
}

// Function to generate and render the grid based on rows and columns
function generateGrid(rows, columns) {
    matchedCards = 0;
    flippedCards = [];
    isProcessing = false; // Reset flag for new game
    gameContainer.innerHTML = ""; // Clear any existing game

    const totalCards = rows * columns;
    const cardsArray = createCards(totalCards);

    // Set up grid layout dynamically
    gameContainer.style.gridTemplateColumns = `repeat(${columns}, 100px)`;
    gameContainer.style.gridTemplateRows = `repeat(${rows}, 100px)`;

    // Create card elements
    cardsArray.forEach((cardValue) => {
        const card = document.createElement("div");
        card.classList.add("card", "hidden");
        card.dataset.card = cardValue;
        gameContainer.appendChild(card);

        // Add click event for each card
        card.addEventListener("click", () => flipCard(card));
    });

    // Show the game grid
    gameContainer.style.display = "grid";
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

    // Check if two cards are flipped
    if (flippedCards.length === 2) {
        isProcessing = true; // Block further clicks
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
                alert("You win! Play again.");
                // Hide the grid and show the menu again
                gameContainer.style.display = "none";
                document.getElementById("menu").style.display = "block";
            }, 500);
        }
        // No need to unflip, cards stay flipped
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
    }, 1000); // Time interval to block clicks (1 second)
}

// Initialize the game
fetchGridOptions();
