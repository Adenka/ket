import React, { useContext } from "react";
import { Paper, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { useTheme } from "@emotion/react";
import { kolorki } from "../../assets/kolorki"
import { GameContext } from "../gameContext";

// 192 - scores, 88 - top menu, 24 - padding between cards, 48 - top and bottom wrapper margin
const heightBig = "min(calc((100vh - 10rem - 88px - 24px - 48px)/3), 12.5rem)";

const widthSmall = "min(calc((100vw - 48px)/3), 14rem)";

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
        padding: "1rem",
        height: `calc((2*${widthSmall})/3)`,
        width: `${widthSmall}`,
        margin: "0.25rem",

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

        padding: "0.25rem",
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

const shapeMapBig = {
    oval: {
        d : "M-306.804 -148.53h136.958s63.076 0 63.076 62.275v0s0 62.275 -63.076 62.275h-136.958s-63.076 0 -63.076 -62.275v0s0 -62.275 63.076 -62.275",
        viewBox: "0 0 278.11 139.55",
        transform: "translate(377.38,156.03)",
    },

    diamond: {
        d: "m-221.51-137.47 130.33 68.949c-65.417 33.662-65.392 33.691-131.23 67.021l-129.49-69.595c64.747-33.577 64.376-33.386 130.39-66.375z",
        viewBox: "0 0 293 152.86",
        transform: "translate(367.96 145.9)",
    },

    wave: {
        d: "m-321.21-10.179c-23.485 6.0661-30.453-21.351-31.798-45.21-1.2695-22.523 22.579-76.873 65.711-75.54 43.132 1.3329 74.468 22.951 101.74 22.279 27.596-0.68004 45.973-12.35 56.885-22.251 7.2626-6.5904 15.51-10.893 26.266-0.87046 10.247 9.548 17.42 23.89 8.0098 52.555-5.0431 15.363-29.849 64.116-87.201 58.457-56.718-5.5957-50.835-15.705-73.902-16.022-17.309-0.23818-25.508 2.1242-40.552 11.921-6.6255 4.3145-13.431 12.151-25.159 14.683z",
        viewBox: "0 0 278.05 144.59",
        transform: "translate(360.57 145.19)",
    }
};

const shapeMapSmall = {
    oval: {
        d : "M-306.804 -148.53h136.958s63.076 0 63.076 62.275v0s0 62.275 -63.076 62.275h-136.958s-63.076 0 -63.076 -62.275v0s0 -62.275 63.076 -62.275",
        viewBox: "0 0 139.55 278.11",
        transform: "rotate(-90 28.38 -127.65)",
    },

    diamond: {
        d: "m-221.51-137.47 130.33 68.949c-65.417 33.662-65.392 33.691-131.23 67.021l-129.49-69.595c64.747-33.577 64.376-33.386 130.39-66.375z",
        viewBox: "0 0 152.86 293",
        transform: "rotate(-90 35.468 -110.44)",
    },

    wave: {
        d: "m-321.21-10.179c-23.485 6.0661-30.453-21.351-31.798-45.21-1.2695-22.523 22.579-76.873 65.711-75.54 43.132 1.3329 74.468 22.951 101.74 22.279 27.596-0.68004 45.973-12.35 56.885-22.251 7.2626-6.5904 15.51-10.893 26.266-0.87046 10.247 9.548 17.42 23.89 8.0098 52.555-5.0431 15.363-29.849 64.116-87.201 58.457-56.718-5.5957-50.835-15.705-73.902-16.022-17.309-0.23818-25.508 2.1242-40.552 11.921-6.6255 4.3145-13.431 12.151-25.159 14.683z",
        viewBox: "0 0 144.59 278.05",
        transform: "rotate(-90 31.338 -113.85)",
    }
};

function Card(props) {
    const classes = useStyles();
    const { amI, returnPlayer } = useContext(GameContext);
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("md"));
    const shapeMap = isSmall ? shapeMapSmall : shapeMapBig;

    const amIInClicked = amI(props.cardObject);

    let playerInRes = returnPlayer();

    return <Paper
        className = {isSmall ? classes.rootSmall : classes.rootBig}
        sx = {{
            transition: theme.transitions.create(["background", "outline"], {
                easing: theme.transitions.easing.sharp,
                duration: "0.125s"
            }),
            
            outline:
                amIInClicked
                ? `solid 0.25rem ${kolorki[playerInRes.colorNumber][500]}`
                : `solid 0 white`,
        }}
        onClick = {props.onClick}
        >   
            <div className = {classes.dots}>
            {Object.values(props.clicked).filter(
                click => click.playerId !== playerInRes.playerId
            ).map((click) => 
                <div
                    key = {click.playerId}
                    className = {classes.dot}
                    style = {{
                        backgroundColor: kolorki[click.color][500]
                    }}
                />
                )}
            </div>
            {Array.from(Array(parseInt(props.amount))).map((_, index) =>
            <div key = {index} className = {isSmall ? classes.cardWrapSmall : classes.cardWrapBig}>
                <svg
                    width = {isSmall ? `calc(${widthSmall}/5)` : `calc(${heightBig}/2)`}
                    height = "auto"
                    viewBox={shapeMap[props.shape].viewBox}
                >
                    <defs>
                        <pattern
                            id = {`stripes${props.color}${props.shape}${props.amount}`}
                            patternUnits = "userSpaceOnUse"
                            width = "20"
                            height = "1"
                        >
                            <line
                                x1 = "0"
                                y = "0"
                                x2 = "0"
                                y2 = "9.5"
                                stroke = {props.color}
                                strokeWidth = "20"
                            />
                        </pattern>
                    </defs>
                    <g transform = {shapeMap[props.shape].transform}>
                        <path
                            d = {shapeMap[props.shape].d} 
                            fill = {props.fill === "none" ? "none" :
                                (props.fill === "striped"
                                    ?`url(#stripes${props.color}${props.shape}${props.amount})`
                                    : `${props.color}`
                                )
                            }
                            stroke = {props.color}
                            strokeWidth = "10"
                        />
                    </g>
                </svg>
            </div>
        )}
    </Paper>
}

export default Card;