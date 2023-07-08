import React, {useContext, useState} from "react";
import {TabPanel, TabContext} from "@mui/lab";
import SwipeableViews from 'react-swipeable-views';
import {Drawer, Tab, Tabs} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { SizeContext } from "../contexts/size";
import FunctionButton from "../utils/functionButton";
import MenuIcon from '@mui/icons-material/Menu';

const useStyles = makeStyles({
    indicator: {
        left: "0px",
    }
});

const VerticalTab = (props) => {
    const { isSmall } = useContext(SizeContext);
    return <Tab
        sx = {{
            minWidth: "20%",
            fontSize: "min(4vw, 1.25rem)",
            height: !isSmall
                    ? `calc((100vh - 3rem - 88px)/${props.amount})`
                    : `calc(100vh/${props.amount})`
        }}
        {...props}
    />
}

const ActualTabs = ({value, handleTabNumberChange, tabTitles}) => {
    const classes = useStyles();

    return <Tabs
        value = {value}
        onChange = {handleTabNumberChange}
        centered
        orientation="vertical"
        classes={{
            indicator: classes.indicator,
        }}
        sx = {{
            maxWidth: "70vw",
            margin: 0,
        }}
    >
        {tabTitles.map((title, i) => (
            <VerticalTab key = {i} label = {title} amount = {tabTitles.length} />
        ))}
    </Tabs>
}

const VerticalTabs = ({tabTitles, component, localStorageElement}) => {
    const { isSmall } = useContext(SizeContext);

    const [value, setValue] = useState(parseInt(localStorage.getItem(localStorageElement)) || 0);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleTabNumberChange = (_, newTabNumber) => {
        console.log(newTabNumber);
        localStorage.setItem(localStorageElement, newTabNumber);
        setValue(newTabNumber);
    };

    const Component = component;

    return <div style = {{padding: "1rem", paddingTop: "2rem"}}>
        {isSmall
        ? <FunctionButton onClickFun = {() => setDrawerOpen(true)} icon={MenuIcon}/>
        : null}
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
                {isSmall
                ?
                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                >
                    <ActualTabs
                        value = {value}
                        handleTabNumberChange = {handleTabNumberChange}
                        tabTitles = {tabTitles}
                    />
                </Drawer>
                :
                    <ActualTabs
                        value = {value}
                        handleTabNumberChange = {handleTabNumberChange}
                        tabTitles = {tabTitles}
                    />
                }
                
            </div>
        </TabContext>
    </div>
}

export default VerticalTabs;