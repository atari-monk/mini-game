let flippedCards = [];
let matchedCards = 0;
const cards = document.querySelectorAll(".card");

function flipCard(card) {
    card.classList.add("flipped");
    card.innerText = card.dataset.card;
}

function unflipCard(card) {
    card.classList.remove("flipped");
    card.innerText = "";
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.dataset.card === secondCard.dataset.card) {
        matchedCards += 2;
        if (matchedCards === cards.length) {
            alert("You win! Play again.");
        }
    } else {
        setTimeout(() => {
            unflipCard(firstCard);
            unflipCard(secondCard);
        }, 1000);
    }
    flippedCards = [];
}

cards.forEach((card) => {
    card.addEventListener("click", () => {
        if (!card.classList.contains("flipped") && flippedCards.length < 2) {
            flipCard(card);
            flippedCards.push(card);
            if (flippedCards.length === 2) {
                checkMatch();
            }
        }
    });
});

// Shuffle cards
function shuffleCards() {
    const cardsArray = Array.from(cards);
    cardsArray.sort(() => Math.random() - 0.5);
    cardsArray.forEach((card) =>
        document.querySelector(".game-container").appendChild(card)
    );
}

shuffleCards();
