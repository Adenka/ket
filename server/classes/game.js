const { Card } = require("./card");
const {v4: uuidv4} = require("uuid");
const { broadcastToPlayers, getPlayersInfo } = require("../utils");

class Game {
    #SET_AMOUNT = 3;
    #DECK_AMOUNT = 81;

    #gameId;
    #gamemode;
    cards;
    #startTime;
    #cardsUsed;
    cardsOnTable;
    players;

    constructor(players, gamemode) {
        this.#gameId = uuidv4();
        this.#gamemode = gamemode;
        this.cards = this.#shuffleCards();
        this.#startTime = Date.now();
        this.#cardsUsed = 12;
        this.cardsOnTable = this.#layTheTable(this.cards);
        this.players = players;
    }

    get gameId() {
        return this.#gameId;
    }

    get gamemode() {
        return this.#gamemode;
    }

    get startTime() {
        return this.#startTime;
    }

    #generateCards = () => {
        let cards = new Array();

        const traits = {
            numbers:    ["1",       "2",        "3"],
            colors:     ["red",     "green",    "purple"],
            shapes:     ["oval",    "wave",     "diamond"],
            fills:      ["none",    "striped",  "full"]
        }

        for (const number of traits.numbers) {
            for (const color of traits.colors) {
                for (const shape of traits.shapes) {
                    for (const fill of traits.fills) {
                        cards.push(
                            new Card(
                                number, color, shape, fill
                            )
                        );
                    }
                }
            }
        }

        return cards;
    }

    #shuffleCards = () => {
        let cards = this.#generateCards();

        for (let i = cards.length - 1; i > 0; --i) {
            let j = Math.floor(Math.random() * i);

            let swapper = cards[i];
            cards[i] = cards[j];
            cards[j] = swapper;
        }

        return cards;
    }

    #complimentaryTrait = (type, trait1 , trait2) => {
        if (trait1 == trait2) {
            return trait1;
        }

        const traits = {
            "numbers": ["1", "2", "3"],
            "colors": ["red", "green", "purple"],
            "shapes": ["oval", "wave", "diamond"],
            "fills": ["none", "striped", "full"]
        }

        const trait3 = traits[type].filter(trait => trait != trait1 && trait != trait2);

        return trait3[0];
    }

    #complimentaryToSet = (card1, card2) => {
        return new Card(
            this.#complimentaryTrait("numbers",  card1.number,  card2.number),
            this.#complimentaryTrait("colors",   card1.color,   card2.color),
            this.#complimentaryTrait("shapes",   card1.shape,   card2.shape),
            this.#complimentaryTrait("fills",    card1.fill,    card2.fill)
        );
    }

    #includesCard = (cardsOnTable, card) => {
        return cardsOnTable.some(cardOnTable => cardOnTable.name == card.name);
    }

    #isSetOnTable = (cardsOnTable) => {
        for (let i = 0; i < cardsOnTable.length; ++i) {
            for (let j = i + 1; j < cardsOnTable.length; ++j) {
                const complimentaryCard
                    = this.#complimentaryToSet(cardsOnTable[i], cardsOnTable[j]);

                if (this.#includesCard(cardsOnTable, complimentaryCard)) {
                    return true;
                }
            }
        }

        return false;
    }
    
    #addCardToTable = (cardsOnTable) => {
        while (!this.#isSetOnTable(cardsOnTable) && this.#cardsUsed < this.#DECK_AMOUNT) {
            cardsOnTable.push(this.cards[this.#cardsUsed]);
            cardsOnTable.push(this.cards[this.#cardsUsed + 1]);
            cardsOnTable.push(this.cards[this.#cardsUsed + 2]);
            
            this.#cardsUsed += this.#SET_AMOUNT;
        }

        return !this.#isSetOnTable(cardsOnTable);
    }

    #layTheTable = (cards) => {
        let cardsOnTable = cards.slice(0, 12);

        this.#addCardToTable(cardsOnTable);

        return cardsOnTable;
    }

    #cardsMap = (cards) => {
        const cardsData = cards.map(card => card.cardMap());

        return cardsData;
    }

    initialInfo = () => {
        const cardsData = this.#cardsMap(this.cardsOnTable);
        return {
            cardsOnTable: cardsData,
            cardsUsed: this.#cardsUsed,
            gamemode: this.#gamemode,
            startTime: this.#startTime
        };
    }

    #handleSelectedSet = (set) => {
        let indexes = new Array(this.#SET_AMOUNT);
        for (let i = 0; i < this.#SET_AMOUNT; ++i) {
            indexes[i] = this.cardsOnTable.findIndex(card => card.name == set[i].name);
        }

        indexes.sort((elem1, elem2) => elem2 - elem1);

        if (this.#cardsUsed < this.#DECK_AMOUNT && this.cardsOnTable.length == 12) {
            for (let i = 0; i < this.#SET_AMOUNT; ++i) {
                this.cardsOnTable[indexes[i]] = this.cards[this.#cardsUsed];
                ++this.#cardsUsed;
            }
        }
        else {
            for (let i = 0; i < this.#SET_AMOUNT; ++i) {
                this.cardsOnTable.splice(indexes[i], 1);
            }
        }

        return this.#addCardToTable(this.cardsOnTable);
    }

    #isCardOnTable = (cardName) => {
        return (this.cardsOnTable.some(cardOnTable => cardOnTable.name == cardName));
    }

    #cardsOnTableInfo = () => {
        let cardsOnTableInfo = new Array();
        this.cardsOnTable.forEach(card => {
            cardsOnTableInfo.push(
                new Card(card.number, card.color, card.shape, card.fill)
            );
        });

        Object.values(this.players).forEach(player => {
            for (let i = 0; i < player.selections.length; ++i) {
                const cardIndex = cardsOnTableInfo.findIndex(
                    card => card.name === player.selections[i].name
                );
                
                cardsOnTableInfo[cardIndex].addClicked(player);
            }
        });

        cardsOnTableInfo = this.#cardsMap(cardsOnTableInfo);

        return cardsOnTableInfo;
    }

    #cardClicked = (data) => {
        const cardName = data.cardName;
        
        const playerId = data.playerId;
        const player = this.players[playerId];

        if (!this.#isCardOnTable(cardName)) {
            player.websocket.send(JSON.stringify({type: "error", content: "cardNotOnTable"}));
            return;
        }

        const card = this.cardsOnTable.find(card => card.name == cardName);
        player.select(card);

        if (player.isSetSelected()) {
            const playerSelections = [...player.selections];
            player.addPoint();
            Object.values(this.players).forEach(otherPlayer => {
                otherPlayer.removeSetFromSelections(playerSelections);
            });
            const isGameOver = this.#handleSelectedSet(playerSelections);
            //const isGameOver = true;
            broadcastToPlayers("players", getPlayersInfo(this.players), this.players);
            broadcastToPlayers(
                "gotSet",
                {cardsUsed: this.#cardsUsed, isGameOver: isGameOver, time: Date.now()},
                this.players
            );
        }
        
        broadcastToPlayers("cardClicked", this.#cardsOnTableInfo(), this.players);
    }

    handleGameMessage = (data) => {
        switch(data.type) {
            case "cardOnClick": {
                console.log("kliknieto karte ", data.cardName, " w ", data.roomId);
                this.#cardClicked(data);
            }
        }
    }
}

module.exports = { Game }