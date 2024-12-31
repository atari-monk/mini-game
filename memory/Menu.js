export class Menu {
    constructor(menuElement, onOptionSelected) {
        this.menuElement = menuElement;
        this.onOptionSelected = onOptionSelected;
    }

    async fetchGridOptions(jsonPath) {
        const response = await fetch(jsonPath);
        const gridOptions = await response.json();
        this.renderMenu(gridOptions);
    }

    renderMenu(gridOptions) {
        const buttonContainer = this.menuElement.querySelector("#menu-buttons");
        buttonContainer.innerHTML = "";

        gridOptions.forEach((option) => {
            const button = document.createElement("button");
            button.classList.add("menu-button");
            button.dataset.rows = option.rows;
            button.dataset.columns = option.columns;
            button.dataset.cardSize = option.cardSize;
            button.textContent = option.label;
            button.addEventListener("click", () => {
                this.menuElement.style.display = "none";
                this.onOptionSelected(option);
            });
            buttonContainer.appendChild(button);
        });
    }
}
