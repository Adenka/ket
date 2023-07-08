import React, {useState} from "react";
import {TabPanel, TabContext} from "@mui/lab";
import SwipeableViews from 'react-swipeable-views';
import {Tab, Tabs} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    indicator: {
        left: "0px",
    }
});

const VerticalTab = (props) => {
    return <Tab
        sx = {{
            minWidth: "20%",
            fontSize: "min(4vw, 1.25rem)",
            height: `calc((100vh - 3rem - 88px)/${props.amount})`,
        }}
        {...props}
    />
}

const VerticalTabs = ({tabTitles, component, localStorageElement}) => {
    const classes = useStyles();
    const [value, setValue] = useState(parseInt(localStorage.getItem(localStorageElement)) || 0);
    const handleTabNumberChange = (_, newTabNumber) => {
        console.log(newTabNumber);
        localStorage.setItem(localStorageElement, newTabNumber);
        setValue(newTabNumber);
    };

    const Component = component;

    return <div style = {{padding: "1rem", paddingTop: "2rem"}}>
        <TabContext value = {value}>
            <div style = {{display: "flex", width: "100%"}}>
                <SwipeableViews
                    axis = "x"
                    index = {value}
                    onChangeIndex = {(index) => setValue(index)}
                    style = {{width: "100%"}}
                >
                    {Array(tabTitles.length).fill().map((_, i) => (
                        <TabPanel
                            key = {i}
                            value = {value}
                            index = {i}
                            sx = {{padding: 0}}
                        >
                            <Component tabNumber = {value}/>
                        </TabPanel>
                    ))}
                </SwipeableViews>
                <Tabs
                    value = {value}
                    onChange = {handleTabNumberChange}
                    centered
                    orientation="vertical"
                    classes={{
                        indicator: classes.indicator,
                    }}
                    sx = {{
                        width: "20vw%",
                        margin: 0,
                    }}
                >
                    {tabTitles.map((title, i) => (
                        <VerticalTab key = {i} label = {title} amount = {tabTitles.length} />
                    ))}
                </Tabs>
            </div>
        </TabContext>
    </div>
}

export default VerticalTabs;