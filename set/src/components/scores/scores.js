import React from "react";
import TopMenu from "../utils/topMenu";
import VerticalTabs from "./verticalModes";
import ScoresWrapper from "./scoresWrapper";

const Scores = () => {
    return <div>
        <TopMenu content = "Mah scorez"/>
        <VerticalTabs
            localStorageElement = "scoresTabNumber"
            tabTitles = {["Lonely Kitteh", "Cooperashun wif othr kittehz", "Aganzt othr kittehz"]}
            component = {ScoresWrapper}
        />
    </div>
}

export default Scores;