const {v4: uuidv4} = require("uuid");

class Player {
    #playerId;
    #username;
    websocket;
    #points;
    selections;
    #colorNumber;

    constructor(username, websocket) {
        this.#playerId = uuidv4();
        this.#username = username;
        this.websocket = websocket;
        this.websocket.playerId = this.#playerId;
        this.#points = 0;
        this.selections = [];
        this.#colorNumber = -1;
    }

    get playerId() {
        return this.#playerId;
    }

    get username() {
        return this.#username;
    }

    get points() {
        return this.#points;
    }

    get colorNumber() {
        return this.#colorNumber;
    }

    set colorNumber(number) {
        console.log("ustawiam kolorek");
        this.#colorNumber = number;
    }

    addPoint = () => {
        this.#points = this.#points + 1;
    }

    #addSelection = (card) => {
        if (this.selections.length < 3) {
            this.selections.push(card);
            return;
        }

        this.selections[0] = this.selections[1];
        this.selections[1] = this.selections[2];
        this.selections[2] = card;
    }

    #removeSelection = (card) => {
        this.selections = this.selections.filter(selectedCard => selectedCard.name != card.name);
    }

    select = (card) => {
        if (!this.selections.some(cardSelected => cardSelected.name === card.name)) {
            console.log("dodaje karte");
            this.#addSelection(card);
        }
        else {
            console.log("usuwam karte");
            this.#removeSelection(card);
        }
    }

    #isTraitOK = (type) => {
        return (
            (
                this.selections[0][type] === this.selections[1][type]
                && this.selections[1][type] === this.selections[2][type]
            )
            ||
            (
                this.selections[0][type] !== this.selections[1][type]
                && this.selections[1][type] !== this.selections[2][type]
                && this.selections[0][type] !== this.selections[2][type]
            )
        );
    }

    removeSetFromSelections = (set) => {
        set.forEach(setCard => {
            this.#removeSelection(setCard);
        });

        console.log("players selections: ", this.selections.map((card) => card.cardMap()));
    }

    isSetSelected = () => {
        if (this.selections.length < 3) {
            return false;
        }

        return (
            this.#isTraitOK("number")
            &&
            this.#isTraitOK("color")
            &&
            this.#isTraitOK("shape")
            &&
            this.#isTraitOK("fill")
        );
    }

    resetForRematch = () => {
        this.#points = 0;
        this.selections = [];
    }
}

module.exports = { Player }