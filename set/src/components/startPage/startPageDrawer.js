import React from "react";
import CustomDrawer from "../utils/customDrawer";
import PersonIcon from '@mui/icons-material/Person';

const StartPageDrawer = ({openDrawer, setOpenDrawer}) => {
    const drawerBodyElements = [
        {
            text: "Mah scorez",
            path: "/scores"
        },
        {
            text: "Lonely kitteh opshuns",
            path: "/",
            subElements: [
                {
                    text: "Baby kitteh",
                    lsVar: "practiceMode",
                }
            ]
        }
    ];

    return <CustomDrawer
        anchor="right"
        open={openDrawer}

        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}

        drawerTitleIcon={PersonIcon}
        drawerTitleText={localStorage.getItem("username")}
        drawerBodyElements={drawerBodyElements}
    />
}

export default StartPageDrawer;