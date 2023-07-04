import React from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Rooms from "./rooms/rooms";
import StartPage from "./startPage/startPage";
import Game from "./game/game";
import { pink } from "@mui/material/colors";
import WaitingRoom from "./waitingRoom/waitingRoom";
import { Sockets } from "./sockets";
import { Errors } from "./contexts/errors";
import { Singleplayer } from "./singleplayer";
import SnackBar from "./snackBar";
import { Size } from "./contexts/size";

function App() {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#00bcd4",
                light: "#26c6da"
            },
            secondary: {
                main: "#c0c5ce",
                light: '#dfe2e6'
            },
            error: pink,
        }
    })

    return (
        <CssBaseline>
            <Errors>
                <ThemeProvider theme = {theme}>
                    <Size>
                        <BrowserRouter>
                            <Routes>
                                <Route path = "/"       element = {<StartPage/>}/>
                                <Route path = "/rooms"  element = {<Rooms/>}/>
                                <Route element = {<Sockets/>}>
                                    <Route
                                        path = "/:roomId/game"
                                        element = {<Game/>}
                                    />
                                    <Route path = "/:roomId/wait"   element = {<WaitingRoom/>}/>
                                </Route>
                                <Route element = {<Singleplayer/>}>
                                    <Route
                                        path = "/singleplayer"
                                        element = {<Game/>}
                                    />
                                </Route>
                                <Route path = "*"       element = {<StartPage/>}/>
                            </Routes>
                        </BrowserRouter>
                        <SnackBar/>
                    </Size>
                </ThemeProvider>
            </Errors>
        </CssBaseline>
    );
}

export default App;
