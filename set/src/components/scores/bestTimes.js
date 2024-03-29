import React, { useContext, useState, useEffect } from "react";
import { Typography, Table, TableHead, TableRow, TableContainer, Paper, TableBody, IconButton } from "@mui/material";
import TableCellHead from "../utils/tableCellHead";
import TableCellBody from "../utils/tableCellBody";
import { getSinglePlayerBestTimeArray } from "./singlePlayerBestTimeArray";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ErrorContext } from "../contexts/errors";
import { MAX_SCORES } from "../utils/constants";
import { SizeContext } from "../contexts/size";

const TimeCell = ({time, dummy, index}) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor(time / 1000) % 60;
    const milliseconds = Math.floor((time / 100) % 10);

    const timeDisplayed = (minutes < 10 ? "0" : "") + minutes + ":" + ("0" + seconds).slice(-2) + "." + milliseconds;

    return <TableCellBody
        text = {dummy === true ? "Pulay moar!" : timeDisplayed}  
        parity = {index % 2}
    />    
}

const RowNumberControlIcon = ({icon, onClick}) => {
    const Icon = icon;
    const { isSmall } = useContext(SizeContext);

    return <IconButton
        onClick = {onClick}
        sx = {{ width: "min(5rem, 15vw)", height: "min(15vw, 5rem)" }}
    >
        <Icon fontSize = {isSmall ? "medium" : "large"} />
    </IconButton>
}

const BestTimes = () => {
    const bestTimes = getSinglePlayerBestTimeArray();
    const [rowNumber, setRowNumber] = useState(parseInt(localStorage.getItem("rowNumber"))
                                               || MAX_SCORES / 2);
    const { setSnackbar } = useContext(ErrorContext);

    useEffect(() => {
        localStorage.setItem("rowNumber", rowNumber);
    }, [rowNumber]);

    const decreaseRowNumber = () => {
        if (rowNumber > 1) {
            setRowNumber((prevRowNumber) => Math.max(prevRowNumber - 1, 1));
        }
        else {
            setSnackbar("2 few da rows!", "error");
        }
    }

    const increaseRowNumber = () => {
        if (rowNumber < MAX_SCORES) {
            setRowNumber((prevRowNumber) => Math.min(prevRowNumber + 1, 10));
        }
        else {
            setSnackbar("2 lotz da rows!", "error");
        }
    }

    return <div style = {{
        display: "flex", flexDirection: "column",
        alignItems: "center", width: "100%" }}>
        <div style={{display: "flex", alignItems: "center"}}>
            <RowNumberControlIcon
                icon = {RemoveCircleIcon}
                onClick = {decreaseRowNumber}
            />
            <Typography
                sx = {{
                    display: "flex",
                    justifyContent: "center", 
                    fontFamily: "Architects Daughter",
                    fontSize: "min(7vw, 3.5rem)",
                    margin: "1rem",
                }}
            >
                Bezd tiems
            </Typography>
            <RowNumberControlIcon
                icon = {AddCircleIcon}
                onClick = {increaseRowNumber}
            />
        </div>
        <TableContainer component = {Paper} sx = {{width: "80%", margin: "1rem"}}>
            <Table style = {{tableLayout: "fixed"}}>
                <TableHead>
                    <TableRow>
                        <TableCellHead text = "Tiem"/>
                        <TableCellHead text = "When"/>
                    </TableRow>
                </TableHead>
                <TableBody>
                {bestTimes.map(({time, date, dummy}, index) => (
                    index < rowNumber
                    ?
                    <TableRow key = {index}>
                        <TimeCell time = {time} dummy = {dummy} index = {index}/>
                        <TableCellBody text = {dummy === true ? "Nevr..." : date}       parity = {index % 2}/>
                    </TableRow>
                    :
                    null
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
}

export default BestTimes;