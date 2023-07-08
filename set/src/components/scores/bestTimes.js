import React, { useState } from "react";
import { Typography, Table, TableHead, TableRow, TableContainer, Paper, TableBody, IconButton } from "@mui/material";
import TableCellHead from "../tableCellHead";
import TableCellBody from "../tableCellBody";
import { MAX_SCORES, getSinglePlayerBestTimeArray } from "./singlePlayerBestTimeArray";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

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

    return <IconButton
        onClick = {onClick}
        sx = {{ width: "5rem", height: "5rem" }}
    >
        <Icon fontSize = "large" />
    </IconButton>
}

const BestTimes = () => {
    const bestTimes = getSinglePlayerBestTimeArray();
    const [rowNumber, setRowNumber] = useState(MAX_SCORES);

    return <div style = {{
        display: "flex", flexDirection: "column",
        alignItems: "center", width: "100%" }}>
        <div style={{display: "flex", alignItems: "center"}}>
            <RowNumberControlIcon
                icon = {RemoveCircleIcon}
                onClick = {() => setRowNumber(rowNumber => Math.max(0, rowNumber - 1))}
            />
            <Typography
                sx = {{
                    display: "flex",
                    justifyContent: "center", 
                    fontFamily: "Architects Daughter",
                    fontSize: "min(8vw, 4rem)",
                    //height: 65,
                    margin: "1rem",
                }}
            >
                Bezd tiems
            </Typography>
            <RowNumberControlIcon
                icon = {AddCircleIcon}
                onClick = {() => setRowNumber(rowNumber => Math.min(rowNumber + 1, MAX_SCORES))}
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