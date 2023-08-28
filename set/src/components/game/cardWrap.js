import React, { useContext } from "react";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import Card from "./card.js"
import { SizeContext } from "../contexts/size.js";
import { GameContext } from "../contexts/gameContext.js";

const useStyles = makeStyles({
    cardWrap: {
        width: "100vw",
        height: "calc(100vh - 88px - 10rem)",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },

    cards: {
        display: "flex",
        flexWrap: "wrap",
        alignContent: "center",
        justifyContent: "center",
    },

    cardsBig: {
        flexDirection: "column",
        height: "calc(100vh - 10rem - 88px)",
        width: "100%",
        margin: "1.5rem",
    },

    cardsSmall: {
        height: "100%",
        width: "100%",
        margin: "0.5rem"
    },
})

const CardWrap = () => {
    const { isSmall } = useContext(SizeContext);
    const classes = useStyles();
    const { cardsOnTable, cardOnClick } = useContext(GameContext);

    return <div className = {classes.cardWrap}>
        <div className = {clsx(classes.cards, isSmall ? classes.cardsSmall : classes.cardsBig)}>
            {cardsOnTable.map(card =>
                <Card cardObject = {card} onClickFun = {() => cardOnClick(card.name)} />
            )}
        </div>
    </div>
}
export default CardWrap;