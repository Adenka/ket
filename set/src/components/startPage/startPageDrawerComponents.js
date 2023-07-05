import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import { Divider, IconButton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

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

const BigPersonIcon = (props) => (
    <PersonIcon
        sx = {{
            color: grey[800],
            fontSize: 40
        }}
    />
)

const UsernameTypography = (props) => (
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
            padding: "2rem",
            transition: "0.25s",
            color: grey[600],
            fontFamily: "Prompt",
            fontSize: 22.5,
            "&:hover": {
                color: (theme) => theme.palette.secondary.light,
                backgroundColor: (theme) => theme.palette.primary.main
            }
        }}
        {...props}
    >
        {props.children}
    </Typography>
)

export {
    BigIconButton,
    BigPersonIcon,
    UsernameTypography,
    DrawerDivider,
    DrawerElement
}