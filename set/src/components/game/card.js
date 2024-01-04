import React, { useContext, useRef } from "react";
import { Fade, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { kolorki } from "../../assets/kolorki"
import { GameContext } from "../contexts/gameContext";
import { SizeContext } from "../contexts/size";
import { useTheme } from "@emotion/react";
import { shapeMapBig, shapeMapSmall } from "../../assets/shapes";

// 192 - scores, 88 - top menu, 24 - padding between cards, 48 - top and bottom wrapper margin
const heightBig = "min(calc((100vh - 10rem - 88px - 24px - 48px)/3), 12.5rem)";

const widthSmall = "calc((100vw - 48px)/3)";

const useStyles = makeStyles({
    rootBig: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        padding: "1rem",
        height: `${heightBig}`,
        width: `calc(4*${heightBig}/5)`,
        margin: "0.25rem",

        position: "relative",

        "&:hover": {
            background: "#f0f0f0",
        }
    },

    cardWrapBig: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        padding: "0.25rem",
        height: "100%",
    },

    rootSmall: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: `calc((2*${widthSmall})/3)`,
        width: `${widthSmall}`,
        margin: "min(0.25rem, 1vw)",

        position: "relative",

        "&:hover": {
            background: "#f0f0f0",
        }
    },

    cardWrapSmall: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        padding: `calc(${widthSmall}/75)`,
        height: "100%",
    },

    dots: {
        position: "absolute",
        top: "0.5rem",
        right: "0.5rem",
        display: "flex"
    },

    dot: {
        borderRadius: "100rem",
        height: "0.75rem",
        width: "0.75rem",
        marginLeft: "0.125rem",
    }
});

const Card = ({cardObject, onClickFun}) => {
    const classes = useStyles();
    const theme = useTheme();
    const { amIClicked, amIInHelperSet, returnPlayer } = useContext(GameContext);
    const { isSmall } = useContext(SizeContext);
    const shapeMap = isSmall ? shapeMapSmall : shapeMapBig;

    const presentInClicked = amIClicked(cardObject);
    const presentInHelperSet = amIInHelperSet(cardObject);

    let playerInRes = returnPlayer();

    const prevent = useRef(false);
    const handleOnTouchStart = (event) => {
        prevent.current = true;
        onClickFun();
    }

    const handleOnClick = () => {
        if (prevent.current) {
            prevent.current = false;
            return;
        }
        
        onClickFun();
    }

    return <Paper
        className = {isSmall ? classes.rootSmall : classes.rootBig}
        sx = {{
            transition: theme.transitions.create(["outline"], {
                easing: theme.transitions.easing.sharp,
                duration: "0.125s"
            }),
            
            outline:
                presentInClicked
                ? `solid min(0.75vw, 0.25rem) ${kolorki[playerInRes.colorNumber][500]}`
                : `solid 0 white`,
            backgroundColor:
                presentInHelperSet
                ? theme.palette.secondary.light
                : "white",
        }}
        onTouchStart = {handleOnTouchStart}
        onClick = {handleOnClick}
        >   
            <div className = {classes.dots}>
            {Object.values(cardObject.clicked).filter(
                click => click.playerId !== playerInRes.playerId
            ).map((click, index) =>
                <Fade in={true} style={{transitionDuration: "0.25s"}} key={index}>
                    <div
                        key = {click.playerId}
                        className = {classes.dot}
                        style = {{
                            transition: theme.transitions.create(["backgroundColor"], {
                                easing: theme.transitions.easing.sharp,
                                duration: "1s"
                            }),
                            backgroundColor: kolorki[click.color][500],
                        }}
                    />
                </Fade>
                )}
            </div>
            {Array.from(Array(parseInt(cardObject.number))).map((_, index) =>
            <div key = {index} className = {isSmall ? classes.cardWrapSmall : classes.cardWrapBig}>
                <svg
                    width = {isSmall ? `calc(${widthSmall}/4)` : `calc(${heightBig}/2)`}
                    height = {isSmall ? `calc(${widthSmall}/1.5)` : "auto"}
                    viewBox={shapeMap[cardObject.shape].viewBox}
                >
                    <defs>
                        <pattern
                            id = {`stripes${cardObject.color}${cardObject.shape}${cardObject.number}`}
                            patternUnits = "userSpaceOnUse"
                            width = "25"
                            height = "1"
                        >
                            <line
                                x1 = "0"
                                y = "0"
                                x2 = "0"
                                y2 = "9.5"
                                stroke = {cardObject.color}
                                strokeWidth = "25"
                            />
                        </pattern>
                    </defs>
                    <g transform = {shapeMap[cardObject.shape].transform}>
                        <path
                            d = {shapeMap[cardObject.shape].d} 
                            fill = {cardObject.fill === "none" ? "none" :
                                (cardObject.fill === "striped"
                                    ?`url(#stripes${cardObject.color}${cardObject.shape}${cardObject.number})`
                                    : `${cardObject.color}`
                                )
                            }
                            stroke = {cardObject.color}
                            strokeWidth = {isSmall ? "13" : "11"}
                        />
                    </g>
                </svg>
            </div>
        )}
    </Paper>
}

export default Card;