import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UsernameContext } from "./App";
import { GameContext } from "./gameContext";

export function Singleplayer() {
    const navigate = useNavigate();

    const { username } = useContext(UsernameContext);

    const DECK_AMOUNT = 81;
    const SET_AMOUNT = 3;

    const traits = {
        "numbers":  [ "1",      "2",        "3"         ],
        "colors":   [ "red",    "green",    "purple"    ],
        "shapes":   [ "oval",   "wave",     "diamond"   ],
        "fills":    [ "none",   "striped",  "full"      ]
    }

    const createCard = (number, color, shape, fill) => {
        return {
            name: number + color + shape + fill,
            number,
            color,
            shape,
            fill,
            clicked: {}
        }
    }

    const generateCards = () => {
        let cards = new Array();

        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 3; ++j) {
                for (let k = 0; k < 3; ++k) {
                    for (let l = 0; l < 3; ++l) {
                        cards.push(
                            createCard(
                                traits.numbers[i],
                                traits.colors[j],
                                traits.shapes[k],
                                traits.fills[l]
                            )
                        );
                    }
                }
            }
        }

        return cards;
    }

    const shuffleCards = () => {
        let cards = generateCards();

        for (let i = cards.length - 1; i > 0; --i) {
            let j = Math.floor(Math.random() * i);

            let swapper = cards[i];
            cards[i] = cards[j];
            cards[j] = swapper;
        }

        return cards;
    }

    const [ cards, setCards ]                   = useState(shuffleCards());
    const [ cardsUsed, setCardsUsed ]           = useState(12);
    const [ cardsOnTable, setCardsOnTable ]     = useState([]);

    const gamemode = "Singleplayer";
    const [ isGameOver, setIsGameOver ]         = useState(false);
    const [ gameStartTime, setGameStartTime]    = useState(0);
    const [ gameOverTime, setGameOverTime ]     = useState(0);

    const [ selections, setSelections ]         = useState([]);
    const [ points, setPoints ]                 = useState(0);
    const [ colorNumber, setColorNumber ]       = useState(0);

    useEffect(() => {
        if (!isGameOver) {
            setPoints(0);
            setSelections([]);
            setColorNumber(Math.floor(Math.random() * 6));

            const aaaaaaaaaaaaaaaaa = shuffleCards()
            setCards(aaaaaaaaaaaaaaaaa);
            setCardsUsed(12);
            setCardsOnTable(layTheTable(aaaaaaaaaaaaaaaaa));


            console.log(aaaaaaaaaaaaaaaaa)

            setGameStartTime(Date.now());
        }
    }, [isGameOver])

    const complimentaryTrait = (type, trait1 , trait2) => {
        if (trait1 === trait2) {
            return trait1;
        }

        const trait3 = traits[type].filter(trait => trait !== trait1 && trait !== trait2);

        return trait3[0];
    }

    const complimentaryToSet = (card1, card2) => {
        return createCard(
            complimentaryTrait("numbers",   card1.number,   card2.number),
            complimentaryTrait("colors",    card1.color,    card2.color),
            complimentaryTrait("shapes",    card1.shape,    card2.shape),
            complimentaryTrait("fills",     card1.fill,     card2.fill)
        );
    }

    const includesCard = (cardsssOnTable, card) => {
        return cardsssOnTable.some(cardOnTable => cardOnTable.name === card.name);
    }

    const isSetOnTable = (cardsssOnTable) => {
        for (let i = 0; i < cardsssOnTable.length; ++i) {
            for (let j = i + 1; j < cardsssOnTable.length; ++j) {
                const complimentaryCard
                    = complimentaryToSet(cardsssOnTable[i], cardsssOnTable[j]);

                if (includesCard(cardsssOnTable, complimentaryCard)) {
                    return true;
                }
            }
        }

        return false;
    }

    const addCardToTable = (cardsssOnTable, cardsUsedCopy) => {
        while (!isSetOnTable(cardsssOnTable) && cardsUsedCopy < DECK_AMOUNT) {
            cardsssOnTable.push(cards[cardsUsedCopy]);
            cardsssOnTable.push(cards[cardsUsedCopy + 1]);
            cardsssOnTable.push(cards[cardsUsedCopy + 2]);
            
            cardsUsedCopy += SET_AMOUNT;
        }

        setCardsUsed(cardsUsedCopy);

        return !isSetOnTable(cardsssOnTable);
    }


    const layTheTable = (cardsss) => {
        let cardsssOnTable = cardsss.slice(0, 12);

        addCardToTable(cardsssOnTable, cardsUsed);

        return cardsssOnTable;
    }

    const cardOnClick = (cardName) => {
        const card = cardsOnTable.find(card => card.name === cardName);

        select(card);
    }

    const addSelection = (card) => {
        const newCard = card
        if (selections.length < 3) {
            setSelections(selections.concat([ newCard ]));
            return selections.concat([ newCard ]);
        }

        setSelections([selections[1], selections[2], newCard]);
        return [selections[1], selections[2], newCard];
    }
    
    const removeSelection = (card) => {
        setSelections(
            selections => selections.filter(selectedCard => selectedCard.name !== card.name)
        );
    }

    const isTraitOK = (newSelections, type) => {
        return (
            (
                newSelections[0][type] === newSelections[1][type]
                && newSelections[1][type] === newSelections[2][type]
            )
            ||
            (
                newSelections[0][type] !== newSelections[1][type]
                && newSelections[1][type] !== newSelections[2][type]
                && newSelections[0][type] !== newSelections[2][type]
            )
        );
    }

    const isSetSelected = (newSelections) => {
        console.log(newSelections)
        if (newSelections.length < 3) {
            return false;
        }

        return (
            isTraitOK(newSelections, "number")
            &&
            isTraitOK(newSelections, "color")
            &&
            isTraitOK(newSelections, "shape")
            &&
            isTraitOK(newSelections, "fill")
        );
    }

    const handleSelectedSet = (set) => {
        let indexes = new Array(SET_AMOUNT);
        for (let i = 0; i < SET_AMOUNT; ++i) {
            indexes[i] = cardsOnTable.findIndex(card => card.name === set[i].name);
        }

        indexes.sort((elem1, elem2) => elem2 - elem1);
        
        const cardsOnTableCopy = [...cardsOnTable];
        let cardsUsedCopy = cardsUsed;
        
        if (cardsUsed < DECK_AMOUNT && cardsOnTableCopy.length === 12) {
            for (let i = 0; i < SET_AMOUNT; ++i) {
                cardsOnTableCopy[indexes[i]] = cards[cardsUsedCopy++];
            }
        }
        else {
            for (let i = 0; i < SET_AMOUNT; ++i) {
                cardsOnTableCopy.splice(indexes[i], 1);
            }
        }
        
        const isssGameOver = addCardToTable(cardsOnTableCopy, cardsUsedCopy);
        setCardsOnTable(cardsOnTableCopy);

        return isssGameOver;
    }

    const select = (card) => {
        if (!selections.some(cardSelected => cardSelected.name === card.name)) {
            const newSelections = addSelection(card);

            if (isSetSelected(newSelections)) {
                setPoints(points => points + 1);
                setSelections([]);
                const isssGameOver = handleSelectedSet(newSelections);
                setIsGameOver(isssGameOver);

                if (isssGameOver) {
                    setGameOverTime(Date.now());
                }
            }
        }
        else {
            removeSelection(card);
        }
    }

    const leave = () => {
        navigate("/");
    }

    const player = {
        colorNumber,
        points,
        selections,
        username
    }

    console.log("karty ad fontes", cardsOnTable, selections);

    return <GameContext.Provider
        value = {{
            players: [player],
            cardsOnTable,
            cardsLeft: DECK_AMOUNT - cardsUsed,
            cardOnClick,

            gamemode,
            aaamI: (cardObject) => selections.some(cardSelected => cardSelected.name === cardObject.name),
            returnPlayer: () => player,

            isGameOver,
            gameStartTime,
            gameOverTime,

            rematch: () => setIsGameOver(false),
            leave
        }}
    >
        <Outlet/>
    </GameContext.Provider>
}