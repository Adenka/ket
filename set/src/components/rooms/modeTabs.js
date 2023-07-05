import React from "react";
import {TabPanel, TabContext} from "@mui/lab";
import SwipeableViews from 'react-swipeable-views';
import {Tab, Tabs} from "@mui/material";

const ModeTab = (props) => {
    return <Tab
        sx = {{
            width: "50%",
            minWidth: "33%",
            fontSize: "min(4vw, 1.25rem)",
            height: "4.5rem",
        }}
        {...props}
    />
}

const ModeTabs = ({value, onChange, onChangeIndex, tabTitles, component}) => {
    return <div style = {{padding: "1rem", paddingTop: "2rem"}}>
        <TabContext value = {value}>
            <Tabs
                value = {value}
                onChange = {onChange}
                aria-label = "gamemode"
                centered
            >
                {tabTitles.map((title, i) => (
                    <ModeTab key = {i} label = {title} />
                ))}
            </Tabs>
            <SwipeableViews axis = "x" index = {value} onChangeIndex = {onChangeIndex}>
                {Array(tabTitles.length).fill().map((_, i) => (
                    <TabPanel key = {i} value = {value} index = {i} sx = {{padding: 0}}>
                        {component}
                    </TabPanel>
                ))}
            </SwipeableViews>
        </TabContext>
    </div>
}

export default ModeTabs;