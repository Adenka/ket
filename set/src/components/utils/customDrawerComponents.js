import React, { useEffect, useState } from "react";
import { Divider, IconButton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const BigIconButton = (props) => (
    <IconButton
        sx = {{
            width: 64,
            height: 64,
            margin: "2rem 1rem 2rem 1rem"
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
            fontSize: 40
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
            padding: "1.5rem 2rem",
            transition: "0.25s",
            color: grey[600],
            fontFamily: "Prompt",
            fontSize: 22.5,
            display: "flex",
            justifyContent: "space-between",
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
        <IconButton onClick={props.toggleExpansion}>
            <KeyboardArrowDownIcon/>
        </IconButton>
        :
        <></>
        }
    </Typography>
)

const DrawerSubelement = (props) => {
    const [isChosen, setIsChosen] = useState(localStorage.getItem(props.contextVariable) === "true");

    const subelementOnClick = (contextVariable) => {
        setIsChosen((prevIsChosen) => !prevIsChosen);
        console.log(contextVariable + " is now " + localStorage.getItem(contextVariable));
    }

    useEffect(() => {
        localStorage.setItem(props.contextVariable, isChosen);
    }, [isChosen]);

    return <Typography
        sx = {{
            padding: "0.5rem",
            paddingLeft: "4rem",
            transition: "0.25s",
            color: grey[500],
            fontWeight: isChosen ? "bold" : "normal",
            fontFamily: "Prompt",
            fontSize: 18,
            "&:hover": {
                color: grey[800],
            }
        }}
        onClick = {() => subelementOnClick(props.contextVariable)}
        isChosen = {localStorage.getItem(props.contextVariable) === "true"}
        {...props}
    >
        {props.children}
    </Typography>
}

const DrawerTitleTypography = (props) => (
    <Typography
        sx = {{
            padding: "2.5rem",
            paddingLeft: 0,
            fontFamily: "Righteous",
            letterSpacing: "0.125rem",
            fontSize: 32,
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap"
        }}
    >
        {props.children}
    </Typography>
)

const DrawerTitle = ({iconName, text}) => {
    return <div style={{display: "flex"}}>
        <BigIconButton disabled>
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