import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { GameContext } from "./contexts/gameContext";

export function Singleplayer() {
    const navigate = useNavigate();

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
    const [ cardsInUse, setCardsInUse ]         = useState(12);
    const [ cardsOnTable, setCardsOnTable ]     = useState([]);

    const gamemode = "Singleplayer";
    const [ isGameOver, setIsGameOver ]         = useState(false);
    const [ gameId, setGameId ]                 = useState(0);
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

            const shuffledCards = shuffleCards();
            setCards(shuffledCards);
            setCardsInUse(12);
            setCardsOnTable(layTheTable(shuffledCards, 12));
            
            setGameId(gameId => gameId + 1);
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

    const addCardToTable = (_cards, _cardsOnTable, _cardInUse) => {
        while (!isSetOnTable(_cardsOnTable) && _cardInUse < DECK_AMOUNT) {
            _cardsOnTable.push(_cards[_cardInUse]);
            _cardsOnTable.push(_cards[_cardInUse + 1]);
            _cardsOnTable.push(_cards[_cardInUse + 2]);
            
            _cardInUse += SET_AMOUNT;
        }

        setCardsInUse(_cardInUse);

        return !isSetOnTable(_cardsOnTable);
    }


    const layTheTable = (_cards, _cardsInUse) => {
        let _cardsOnTable = _cards.slice(0, 12);

        addCardToTable(_cards, _cardsOnTable, _cardsInUse);

        return _cardsOnTable;
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
        let indexesOfSet = new Array(SET_AMOUNT);
        for (let i = 0; i < SET_AMOUNT; ++i) {
            indexesOfSet[i] = cardsOnTable.findIndex(card => card.name === set[i].name);
        }

        indexesOfSet.sort((elem1, elem2) => elem2 - elem1);
        
        const _cardsOnTable = [...cardsOnTable];
        let _cardsInUse = cardsInUse;
        
        if (cardsInUse < DECK_AMOUNT && _cardsOnTable.length === 12) {
            for (let i = 0; i < SET_AMOUNT; ++i) {
                _cardsOnTable[indexesOfSet[i]] = cards[_cardsInUse++];
            }
        }
        else {
            for (let i = 0; i < SET_AMOUNT; ++i) {
                _cardsOnTable.splice(indexesOfSet[i], 1);
            }
        }
        
        const _isGameOver = addCardToTable(cards, _cardsOnTable, _cardsInUse);
        setCardsOnTable(_cardsOnTable);

        return _isGameOver;
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
        username: localStorage.getItem("username")
    }

    return <GameContext.Provider
        value = {{
            players: [player],
            cardsOnTable,
            cardsLeft: DECK_AMOUNT - cardsInUse,
            cardOnClick,

            gamemode,
            gameId,
            amI: (cardObject) => selections.some(cardSelected => cardSelected.name === cardObject.name),
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