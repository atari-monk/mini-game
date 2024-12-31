import { Menu } from "./Menu.js";
import { Grid } from "./Grid.js";

const gameContainer = document.querySelector("#game-container");
const gridIndicator = document.querySelector("#grid-indicator");
const winOverlay = document.querySelector("#win-overlay");
const menuDiv = document.querySelector("#menu");

const grid = new Grid(gameContainer, gridIndicator, winOverlay);

const menu = new Menu(menuDiv, (option) => {
    grid.generate(option.rows, option.columns, option.cardSize);
});

await menu.fetchGridOptions("grid-options.json");
