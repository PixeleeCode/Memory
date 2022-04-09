/**
 * MEMORY
 */
const nbCards = 20;
let numbers = [];

for (let i = 1; i <= nbCards / 2; i++) {
  numbers = [...numbers, i, i];
}

const shuffledNumbers = shuffledArray(numbers);
const grid = document.querySelector(".grid");

if ("content" in document.createElement("template")) {
  const template = document.querySelector("#card-memory");

  shuffledNumbers.forEach((number, index) => {
    const card = document.importNode(template.content, true);

    const span = card.querySelector(".flip-back > span");
    span.textContent = number;
    span.id = `${index}`;

    /* const cheat = card.querySelector(".flip-front > span");
    cheat.textContent = number; */

    grid.appendChild(card);
  });

  const cards = document.querySelectorAll(".flip");
  addEventListenerCards(cards);
} else {
  const error = document.createElement("h1");
  error.textContent = "Veuillez prendre un navigateur plus récent";
  grid.append(error);
}
