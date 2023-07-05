import { Drawer } from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import {    BigIconButton,
            BigPersonIcon,
            UsernameTypography,
            DrawerDivider,
            DrawerElement } from "./startPageDrawerComponents";

const CustomDrawer = (props) => (
    <Drawer
        PaperProps = {{
            sx: {
                minWidth: "min(70vw, 400px)",
                maxWidth: "70vw",
                backgroundColor: (theme) => theme.palette.secondary.light,
                color: grey[800]
            }
        }}
        {...props}
    >
        {props.children}
    </Drawer>
)

const StartPageDrawer = ({openDrawer, setOpenDrawer}) => {
    const theme = useTheme();
    const navigate = useNavigate(theme);

    return <CustomDrawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
    >
        <div style={{display: "flex"}}>
            <BigIconButton disabled>
                <BigPersonIcon/>
            </BigIconButton>
            <UsernameTypography>
                {localStorage.getItem("username")}
            </UsernameTypography>
        </div>
        <DrawerDivider/>
        <DrawerElement
            onClick = {() => {navigate("/scores")}}
        >
            Mah scorez
        </DrawerElement>
    </CustomDrawer>
}

export default StartPageDrawer;