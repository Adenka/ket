const MAX_SCORES = 10;

const getSinglePlayerBestTimeArray = () => {
    return JSON.parse(localStorage.getItem("bestTimesArray"))
            || Array(10).fill().map(() => ({time: Number.MAX_VALUE, date: "", dummy: true}));
}

const addToSinglePlayerBestTimeArray = (time, date) => {
    const bestTimesArray = getSinglePlayerBestTimeArray();
    console.log(bestTimesArray);

    bestTimesArray.push({time, date, dummy: false});
    bestTimesArray.sort((a, b) => a.time - b.time).slice(0, MAX_SCORES);
    
    console.log(bestTimesArray);
    localStorage.setItem("bestTimesArray", JSON.stringify(bestTimesArray));
}

export { getSinglePlayerBestTimeArray, addToSinglePlayerBestTimeArray, MAX_SCORES };