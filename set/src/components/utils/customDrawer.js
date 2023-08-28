import React, { useState } from "react";
import { Drawer, Fade } from "@mui/material";
import { grey } from "@mui/material/colors";
import { DrawerDivider,
         DrawerElement,
         DrawerSubelement,
         DrawerTitle } from "../utils/customDrawerComponents";
import { useNavigate } from "react-router-dom";

const CustomDrawer = (props) => {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(Array(props.drawerBodyElements.length).fill(false));

    const toggleExpansion = (index) => {
        const newIsExpanded = [...isExpanded];
        newIsExpanded[index] = !newIsExpanded[index];
        setIsExpanded(newIsExpanded);
    }

    return <Drawer
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
        <DrawerTitle
            iconName = {props.drawerTitleIcon}
            text = {props.drawerTitleText}
        />
        <DrawerDivider/>
        {props.drawerBodyElements.map((element, index) => (
            <div>
            <DrawerElement
                key = {index}
                onClick = {() => {navigate(element.path); toggleExpansion(index)}}
                isDropDown = {element.subElements}
                toggleExpansion = {() => toggleExpansion(index)}
            >
                {element.text}
            </DrawerElement>
            <Fade in = {isExpanded[index]} style={{transitionDuration: "0.25s"}}>
                <div>
                {element.subElements && element.subElements.map((subelement, index) => (
                    <DrawerSubelement
                        key = {index}
                        contextVariable = {subelement.contextVariable}
                    >
                        {subelement.text}
                    </DrawerSubelement>
                ))}
                </div>
            </Fade>
            </div>
        ))}
    </Drawer>
}
export default CustomDrawer;