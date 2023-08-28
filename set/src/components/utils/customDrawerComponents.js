import React, { useEffect, useState } from "react";
import { Divider, IconButton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const BigIconButton = (props) => (
    <IconButton
        sx = {{
            width: "min(4rem, 12vw)",
            height: "min(4rem, 12vw)",
            margin: "min(1.5rem, 6vw) 1rem",
        }}
        {...props}
    >
        {props.children}
    </IconButton>
)

const BigIcon = ({iconName}) => {
    const IconName = iconName;

    return <IconName
        sx = {{
            color: grey[800],
            fontSize: "min(2.5rem, 7.5vw)"
        }}
    />
}

const DrawerDivider = (props) => (
    <Divider
        sx = {{
            margin: "0 1rem 0 1rem",
            backgroundColor: (theme) => theme.palette.secondary.main
        }}
        {...props}
    />
)

const DrawerElement = (props) => (
    <Typography
        sx = {{
            padding: "min(1.5rem, 5vw) min(2rem, 6.25vw)",
            transition: "0.25s",
            color: grey[600],
            fontFamily: "Prompt",
            fontSize: "min(1.25rem, 5vw)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            "&:hover": {
                color: (theme) => theme.palette.secondary.light,
                backgroundColor: (theme) => theme.palette.primary.main
            }
        }}
        {...props}
    >
        {props.children}
        
        {props.isDropDown
        ?
        <IconButton onClick={props.toggleExpansion} sx={{height: 32, width: 32}}>
            <KeyboardArrowDownIcon/>
        </IconButton>
        :
        <></>
        }
    </Typography>
)

const DrawerSubelement = (props) => {
    const [isChosen, setIsChosen] = useState(localStorage.getItem(props.lsVar) === "true");

    const subelementOnClick = (lsVar) => {
        setIsChosen((prevIsChosen) => !prevIsChosen);
        console.log(lsVar + " is now " + localStorage.getItem(lsVar));
    }

    useEffect(() => {
        localStorage.setItem(props.lsVar, isChosen);
    }, [isChosen]);

    return <Typography
        sx = {{
            padding: "min(0.5rem, 2vw)",
            paddingLeft: "min(4rem, 12vw)",
            transition: "0.25s",
            color: grey[500],
            fontWeight: isChosen ? "bold" : "normal",
            fontFamily: "Prompt",
            fontSize: "min(1rem, 4vw)",
            "&:hover": {
                color: grey[800],
            }
        }}
        onClick = {() => subelementOnClick(props.lsVar)}
        isChosen = {localStorage.getItem(props.lsVar) === "true"}
        {...props}
    >
        {props.children}
    </Typography>
}

const DrawerTitleTypography = (props) => (
    <Typography
        sx = {{
            paddingLeft: 0,
            fontFamily: "Righteous",
            letterSpacing: "0.125rem",
            fontSize: "min(2rem, 7.5vw)",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
        }}
    >
        {props.children}
    </Typography>
)

const DrawerTitle = ({iconName, text}) => {
    return <div style={{display: "flex", alignItems: "center",}}>
        <BigIconButton>
            <BigIcon iconName={iconName}/>
        </BigIconButton>
        <DrawerTitleTypography>
            {text}
        </DrawerTitleTypography>
    </div>
}

export {
    BigIcon,
    BigIconButton,
    DrawerDivider,
    DrawerElement,
    DrawerSubelement,
    DrawerTitleTypography,
    DrawerTitle
}