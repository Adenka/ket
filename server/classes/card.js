class Card {
    #name;

    #number;
    #color;
    #shape;
    #fill;

    constructor(number, color, shape, fill) {
        this.#name = number + color + shape + fill;
        
        this.#number = number;
        this.#color = color;
        this.#shape = shape;
        this.#fill = fill;

        this.clicked = {};
    }

    get name() {
        return this.#name;
    }


    get number() {
        return this.#number;
    }


    get color() {
        return this.#color;
    }


    get shape() {
        return this.#shape;
    }


    get fill() {
        return this.#fill;
    }


    cardMap = () => {
        return {
            name: this.#name,
            number: this.#number,
            color: this.#color,
            shape: this.#shape,
            fill: this.#fill,
            clicked: this.clicked
        };
    }

    addClicked = (player) => {
        this.clicked[player.playerId] = {playerId: player.playerId, color: player.colorNumber};
    }
}

module.exports = { Card }