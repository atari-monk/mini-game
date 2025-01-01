export class Grid {
    constructor(container, indicator, winOverlay) {
        this.container = container;
        this.indicator = indicator;
        this.winOverlay = winOverlay;
        this.flippedCards = [];
        this.matchedCards = 0;
        this.isProcessing = false;
    }

    generate(rows, columns, cardSize) {
        this.matchedCards = 0;
        this.flippedCards = [];
        this.isProcessing = false;
        this.container.innerHTML = "";

        const totalCards = rows * columns;
        const cardsArray = this.createCards(totalCards);

        this.container.style.gridTemplateColumns = `repeat(${columns}, ${cardSize}px)`;
        this.container.style.gridTemplateRows = `repeat(${rows}, ${cardSize}px)`;

        cardsArray.forEach((cardValue) => {
            const card = document.createElement("div");
            card.classList.add("card", "hidden");
            card.dataset.card = cardValue;
            card.style.width = `${cardSize}px`;
            card.style.height = `${cardSize}px`;
            this.container.appendChild(card);

            card.addEventListener("click", () => this.flipCard(card));
        });

        document.getElementById("grid-wrapper").style.display = "block";
        this.updateIndicator(true);
    }

    createCards(totalCards) {
        const cardsArray = [];
        const totalPairs = totalCards / 2;

        for (let i = 1; i <= totalPairs; i++) {
            cardsArray.push(i, i);
        }

        return cardsArray.sort(() => Math.random() - 0.5);
    }

    flipCard(card) {
        if (
            this.flippedCards.length >= 2 ||
            card.classList.contains("flipped") ||
            this.isProcessing
        ) {
            return;
        }

        card.classList.add("flipped");
        card.innerText = card.dataset.card;
        this.flippedCards.push(card);

        if (this.flippedCards.length === 2) {
            this.updateIndicator(false);
            this.isProcessing = true;
            this.checkMatch();
        }
    }

    unflipCard(card) {
        card.classList.remove("flipped");
        card.innerText = "";
    }

    checkMatch() {
        const [firstCard, secondCard] = this.flippedCards;

        if (firstCard.dataset.card === secondCard.dataset.card) {
            this.matchedCards += 2;
            if (this.matchedCards === this.container.children.length) {
                setTimeout(() => this.showWinOverlay(), 1000);
            }
        } else {
            setTimeout(() => {
                this.unflipCard(firstCard);
                this.unflipCard(secondCard);
            }, 1000);
        }

        this.flippedCards = [];
        setTimeout(() => {
            this.isProcessing = false;
            this.updateIndicator(true);
        }, 1000);
    }

    showWinOverlay() {
        this.winOverlay.style.display = "block";
        setTimeout(() => {
            this.winOverlay.style.display = "none";
            document.getElementById("grid-wrapper").style.display = "none";
            document.querySelector("#menu").style.display = "block";
        }, 2000);
    }

    updateIndicator(isClickable) {
        this.indicator.style.backgroundColor = isClickable ? "green" : "red";
    }
}
