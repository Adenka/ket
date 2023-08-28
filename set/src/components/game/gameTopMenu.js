import React, { useContext } from "react";
import { GameContext } from "../contexts/gameContext.js";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Timer from "./timer.js";
import{ ReactComponent as CardIcon} from "../../assets/cardIcon.svg"

const CardsLeft = () => {
    const { cardsLeft } = useContext(GameContext);

    return <div style = {{display: "flex", alignContent: "center", justifyContent: "center", width: "min(16vw, 10rem)"}}>
        <CardIcon/>
        <div
            style = {{
                display: "flex",
                alignItems: "center",
                fontSize: "min(6.25vw, 2.5rem)",
                marginLeft: "min(2vw, 1.25rem)"
            }}
        >
            {cardsLeft}
        </div>
    </div>
}

const GameTopMenu = () => {
    const { leave } = useContext(GameContext);

    return <AppBar
        position = "static"
        sx = {{
            height: "5.5rem",
            display: "flex",
            justifyContent: "center",
        }}
    >
        <Toolbar>
            <div style = {{width: "min(16vw, 10rem)"}}>
            <IconButton>
                <ArrowBackIcon fontSize = "large" color = "black" onClick = {leave}/>
            </IconButton>
            </div>
            <div
                style = {{
                    flex: "1",
                    display: "flex",
                    justifyContent: "center",
                    height: "4rem"
                }}
            >
                <Timer/>
            </div>
            <CardsLeft/>
        </Toolbar>
    </AppBar>
}

export default GameTopMenu;