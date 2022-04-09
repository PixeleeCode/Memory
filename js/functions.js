/**
 * FUNCTIONS
 */

let check = [];

/**
 * The Fisher-Yates algorithm
 *
 * @param array
 * @returns {array}
 */
const shuffledArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

/**
 * Counts the number of active cards
 */
const countCardsActivated = () => {
  const cardActivated = document.querySelectorAll(".flip-content-bg-fade");

  if (cardActivated.length === nbCards) {
    const body = document.querySelector("body");

    const overlay = document.createElement("div");
    overlay.className = "winner";

    const paragraph = document.createElement("p");
    paragraph.textContent = "Bravo ! 🥳";

    const button = document.createElement("a");
    button.textContent = "Voulez-vous rejouer ?";
    button.addEventListener("click", () => {
      location.reload();
    });

    overlay.appendChild(paragraph);
    overlay.appendChild(button);
    body.appendChild(overlay);

    setTimeout(() => {
      overlay.classList.add("view");
    }, 350);
  }
};

/**
 * Checks if cards are similar
 *
 * @param i
 * @param el
 * @returns {null}
 */
const checkCard = (i, el) => {
  // Création d'un tableau pour les comparaisons
  const cardSelected = [i, el];

  if (check.length === 0) {
    // Ajoute au tableau de comparaison
    check.push(cardSelected);
  } else {
    // Si les index sont différents, on sauvegarde
    if (check[0][0] !== i) {
      check.push(cardSelected);
    }

    if (check.length === 2) {
      const number1 = shuffledNumbers[check[0][0]];
      const number2 = shuffledNumbers[check[1][0]];

      if (number1 === number2) {
        check.forEach((card) => {
          setTimeout(() => {
            card[1].children[1].classList.add("flip-content-bg-fade");
            console.log(card[1].parentElement);
            card[1].parentElement.removeEventListener("click", flipContent);
            countCardsActivated();
          }, 350);
        });
      } else {
        check.forEach((card) => {
          setTimeout(() => {
            card[1].classList.remove("flip-content-rotate");
          }, 350);
        });
      }

      check = [];
    }
  }
};

/**
 * Turn over the card
 *
 * @param e
 * @returns {null}
 */
const flipContent = (e) => {
  const parent =
    e.target.localName === "span"
      ? e.target.parentElement.parentElement
      : e.target.parentElement;

  parent.classList.add("flip-content-rotate");

  const index = parent.querySelector(".flip-back span").id;
  checkCard(Number(index), parent);
};

/**
 * Add events listeners on cards
 *
 * @param cards
 * @returns {null}
 */
const addEventListenerCards = (cards) => {
  cards.forEach((card) => card.addEventListener("click", flipContent));
};
