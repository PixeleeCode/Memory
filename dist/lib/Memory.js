export default class Memory {
    /**
     * Constructor
     *
     * @param {number} nbCards
     * @param timer
     */
    constructor(nbCards, timer) {
        this.shuffleCards = [];
        this.checkCardSelected = [];
        /**
         * The Fisher-Yates algorithm
         */
        this.shuffledArray = () => {
            for (let i = 1; i <= this.nbCards / 2; i += 1) {
                this.shuffleCards = [...this.shuffleCards, i, i];
            }
            for (let i = this.shuffleCards.length - 1; i > 0; i -= 1) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = this.shuffleCards[i];
                this.shuffleCards[i] = this.shuffleCards[j];
                this.shuffleCards[j] = temp;
            }
            this.createGrid();
            // console.log(this.shuffleCards);
        };
        /**
         * Create a grid
         *
         * Template :
         * ---
         * <div class="flip">
         *    <div class="flip__content">
         *        <div class="flip__content--front">
         *            <span>?</span>
         *        </div>
         *        <div class="flip__content--back">
         *            <span>0</span>
         *        </div>
         *    </div>
         * </div>
         */
        this.createGrid = () => {
            const memoryGrid = document.querySelector(".memory__grid");
            this.shuffleCards.forEach((number, index) => {
                // div.flip
                const flip = document.createElement("div");
                flip.className = "flip";
                // div.flip__content
                const flipContent = document.createElement("div");
                flipContent.className = "flip__content";
                // div.flip__content--front
                const flipContentFront = document.createElement("div");
                flipContentFront.className = "flip__content--front";
                // span
                const spanFront = document.createElement("span");
                spanFront.innerText = "?";
                // spanFront.innerText = String(number);
                // div.flip__content--black
                const flipContentBlack = document.createElement("div");
                flipContentBlack.className = "flip__content--back";
                // span
                const spanBack = document.createElement("span");
                spanBack.innerText = String(number);
                spanBack.id = String(index);
                flipContentBlack.append(spanBack);
                flipContentFront.append(spanFront);
                flipContent.appendChild(flipContentFront);
                flipContent.appendChild(flipContentBlack);
                flip.append(flipContent);
                memoryGrid === null || memoryGrid === void 0 ? void 0 : memoryGrid.append(flip);
            });
            this.addEventListenerCards();
        };
        /**
         * Add events listeners on cards
         */
        this.addEventListenerCards = () => {
            const cards = document.querySelectorAll(".flip");
            cards.forEach((card) => card.addEventListener("click", this.flipCard));
        };
        this.flipCard = (e) => {
            var _a, _b;
            console.log(e, e.target.parentElement);
            const parent = e.target.localName === "span"
                ? (_a = e.target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement
                : e.target.parentElement;
            parent === null || parent === void 0 ? void 0 : parent.classList.add("flip-content-rotate");
            this.timer.start();
            const index = (_b = parent === null || parent === void 0 ? void 0 : parent.querySelector(".flip__content--back span")) === null || _b === void 0 ? void 0 : _b.id;
            this.checkCard(Number(index), parent);
        };
        /**
         *
         */
        this.checkCard = (i, el) => {
            // Création d'un tableau pour les comparaisons
            const cardSelected = [i, el];
            if (this.checkCardSelected.length === 0) {
                // Ajoute au tableau de comparaison
                this.checkCardSelected.push(cardSelected);
            }
            else {
                // Si les index sont différents, on sauvegarde
                if (cardSelected[0][0] !== i) {
                    this.checkCardSelected.push(cardSelected);
                }
                if (this.checkCardSelected.length === 2) {
                    const number1 = this.shuffleCards[this.checkCardSelected[0][0]];
                    const number2 = this.shuffleCards[this.checkCardSelected[1][0]];
                    if (number1 !== number2) {
                        this.checkCardSelected.forEach((card) => {
                            setTimeout(() => {
                                card[1].classList.remove("flip-content-rotate");
                            }, 350);
                        });
                    }
                    else {
                        this.checkCardSelected.forEach((card) => {
                            setTimeout(() => {
                                card[1].children[1].classList.add("flip-content-bg-fade");
                                card[1].parentElement.removeEventListener("click", this.flipCard);
                                this.countCardsReturned();
                            }, 350);
                        });
                    }
                    this.checkCardSelected = [];
                }
            }
        };
        this.countCardsReturned = () => {
            const cardActivated = document.querySelectorAll(".flip-content-bg-fade");
            if (cardActivated.length === this.nbCards) {
                const body = document.querySelector("body");
                const overlay = document.createElement("div");
                overlay.className = "winner";
                const paragraph = document.createElement("p");
                paragraph.textContent = "Bravo ! 🥳";
                const button = document.createElement("a");
                button.textContent = "Voulez-vous rejouer ?";
                button.addEventListener("click", () => {
                    window.location.reload();
                });
                overlay.appendChild(paragraph);
                overlay.appendChild(button);
                body === null || body === void 0 ? void 0 : body.appendChild(overlay);
                setTimeout(() => {
                    overlay.classList.add("view");
                    this.timer.stop();
                }, 350);
            }
        };
        this.nbCards = nbCards;
        this.timer = timer;
        this.shuffledArray();
        // console.log(this.nbCards);
    }
}
