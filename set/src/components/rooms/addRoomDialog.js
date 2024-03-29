import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, NativeSelect, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gameModes } from "../utils/constants";

const AddRoomDialog = (props) => {
    const navigate = useNavigate();
    
    const [name, setName] = useState("Ket game");
    const [mode, setMode] = useState(props.defaultValue);

    useEffect(() => {
        setMode(props.defaultValue);
    }, [props.defaultValue])

    const handleYes = async () => {
        const response = await fetch("/newRoom", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, gamemode: gameModes[mode]})
        });
        
        const data = await response.json();
        navigate(`/${data}/wait`);
    }

    const handleNameOnChange = (event) => {
        setName(event.target.value);
    }

    const handleModeOnChange = (event) => {
        setMode(event.target.value);
    }

    return <Dialog
        open = {props.open}
        onClose = {props.onClose}
        maxWidth = "sm"
        sx = {{padding: "2rem"}}
        fullWidth
    >
        <DialogTitle sx = {{fontSize: "2rem", paddingTop: "1rem"}}>
            New kitteh bed
        </DialogTitle>
        <DialogContent sx = {{width: "100%"}}>
            <TextField
                type = "text"
                autofocus
                value = {name}
                onChange = {handleNameOnChange}
                fullwidth
                variant = "filled"
                sx = {{
                    width: "100%",
                }}
                inputProps = {{
                    style: {
                        fontSize: "1.5rem"
                    }
                }}
            />
            <FormControl fullwidth sx = {{width: "100%", marginTop: "3rem"}}>
                <InputLabel variant = "standard" htmlFor = "uncontrolled-native">
                    Game mode
                </InputLabel>
                <NativeSelect
                    inputProps = {{
                        name: "Game mode",
                        id: "uncontrolled-native",
                        style: {
                            fontSize: "1.5rem"
                        }
                    }}
                    value = {mode}
                    onChange = {handleModeOnChange}
                >
                    <option value = {0}>Cooperashun</option>
                    <option value = {1}>Competitiw</option>
                </NativeSelect>
            </FormControl>
        </DialogContent>
        <DialogActions sx = {{padding: "1.5rem"}}>
            <Button onClick = {props.onClose} sx = {{fontSize: "1.25rem"}}>No</Button>
            <Button onClick = {handleYes} variant = "contained" sx = {{fontSize: "1.25rem"}}>Yez</Button>
        </DialogActions>
    </Dialog>
}

export default AddRoomDialog;