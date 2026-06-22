import { useState, useEffect } from 'react';
import { downloadScorecard } from './scorecardpdf';


function Buttonlist({ runs, label, onButton }) {
    return (
        <div className="button-group">
            <h2>{label}</h2>
            {runs.map((run) => (
                <button
                    key={run}
                    className={
                        label === "Wide" ? "btn-extra" :
                            label === "Noball" ? "btn-extra" :
                                label === "Bye" ? "btn-extra" :
                                    "btn-run"
                    }
                    onClick={() => onButton(run)}
                >{
                        label === "Wide" ? "Wide +" + run :
                            label === "Noball" ? "No Ball +" + run :
                                label === "Bye" ? run + "byes" :
                                    run + " " + label
                    }
                </button>
            ))}
        </div >
    )
}


function Greeter(props) {
    const [isEngland, setIsEngland] = useState(true);
    const [score, setScore] = useState(0);
    const [strikerScore, setStrikerScore] = useState(0);
    const [nonStrikerScore, setNonStrikerScore] = useState(0);
    const [batter, setBatter] = useState("");
    const [savebatter, setSavebatter] = useState("");
    const [wickets, setWickets] = useState(0);
    const [batterhistory, setBatterhistory] = useState([]);
    const [balls, setballs] = useState(0);
    const [englandscore, setEnglandscore] = useState(0);
    const [australiascore, setAustraliascore] = useState(0);
    const scoretochase = isEngland ? australiascore : englandscore;
    const [chasing, setChasing] = useState(false);
    const [freehit, setFreehit] = useState(false);
    const targettochase = scoretochase + 1;
    const runsleft = targettochase - score;
    const isgamewon = chasing && score >= targettochase;
    const [nonstriker, setNonstriker] = useState(null);
    const [savedNonStriker, setSavedNonStriker] = useState(null);
    const [strikerBalls, setStrikerBalls] = useState(0);
    const [nonStrikerBalls, setNonStrikerBalls] = useState(0);
    const [oversLimit, setOversLimit] = useState(20);
    const [customOvers, setCustomOvers] = useState(20);
    const [bowlerName, setBowlerName] = useState("");
    const [currentBowler, setCurrentBowler] = useState("");
    const [previousBowler, setPreviousBowler] = useState("");
    const [bowlerRunsConceded, setBowlerRunsConceded] = useState(0);
    const [bowlerWickets, setBowlerWickets] = useState(0);
    const [bowlerBalls, setBowlerBalls] = useState(0);
    const [bowlerHistory, setBowlerHistory] = useState([]);
    const [englandName, setEnglandName] = useState("England");
    const [australiaName, setAustraliaName] = useState("Australia");
    const [teamNameA, setTeamNameA] = useState("");
    const [teamNameB, setTeamNameB] = useState("");
    const [teamsLocked, setTeamsLocked] = useState(false);
    const [battingFirst, setBattingFirst] = useState(null);
    const [innings1Batters, setInnings1Batters] = useState([]);
    const [innings1Bowlers, setInnings1Bowlers] = useState([]);
    const [innings1Team, setInnings1Team] = useState("");
    const [innings1Score, setInnings1Score] = useState(0);
    const [innings1Wickets, setInnings1Wickets] = useState(0);
    useEffect(() => {
        if (bowlerBalls === 6 && currentBowler !== "") {
            const existingIndex = bowlerHistory.findIndex(b => b.name === currentBowler);
            if (existingIndex !== -1) {
                const updatedHistory = [...bowlerHistory];
                updatedHistory[existingIndex] = {
                    ...updatedHistory[existingIndex],
                    runs: updatedHistory[existingIndex].runs + bowlerRunsConceded,
                    wickets: updatedHistory[existingIndex].wickets + bowlerWickets,
                    balls: updatedHistory[existingIndex].balls + bowlerBalls,
                };
                setBowlerHistory(updatedHistory);
            }
            else {
                setBowlerHistory([...bowlerHistory, {
                    name: currentBowler,
                    runs: bowlerRunsConceded,
                    wickets: bowlerWickets,
                    balls: bowlerBalls,
                }]);
            }
            setPreviousBowler(currentBowler);
            setCurrentBowler("");
            setBowlerRunsConceded(0);
            setBowlerWickets(0);
            setBowlerBalls(0);
        }
    }, [bowlerBalls]);
    useEffect(() => {
        if (!teamsLocked) return; // don't save before a match has actually started

        const matchState = {
            isEngland, score, strikerScore, nonStrikerScore, batter, savebatter,
            wickets, batterhistory, balls, englandscore, australiascore, chasing,
            freehit, nonstriker, savedNonStriker, strikerBalls, nonStrikerBalls,
            oversLimit, customOvers, bowlerName, currentBowler, previousBowler,
            bowlerRunsConceded, bowlerWickets, bowlerBalls, bowlerHistory,
            englandName, australiaName, teamsLocked, battingFirst
        };

        localStorage.setItem('cricketMatch', JSON.stringify(matchState));
    }, [
        isEngland, score, strikerScore, nonStrikerScore, batter, savebatter,
        wickets, batterhistory, balls, englandscore, australiascore, chasing,
        freehit, nonstriker, savedNonStriker, strikerBalls, nonStrikerBalls,
        oversLimit, customOvers, bowlerName, currentBowler, previousBowler,
        bowlerRunsConceded, bowlerWickets, bowlerBalls, bowlerHistory,
        englandName, australiaName, teamsLocked, battingFirst
    ]);
    useEffect(() => {
        const saved = localStorage.getItem('cricketMatch');
        if (saved) {
            const state = JSON.parse(saved);
            setIsEngland(state.isEngland);
            setScore(state.score);
            setStrikerScore(state.strikerScore);
            setNonStrikerScore(state.nonStrikerScore);
            setBatter(state.batter);
            setSavebatter(state.savebatter);
            setWickets(state.wickets);
            setBatterhistory(state.batterhistory);
            setballs(state.balls);
            setEnglandscore(state.englandscore);
            setAustraliascore(state.australiascore);
            setChasing(state.chasing);
            setFreehit(state.freehit);
            setNonstriker(state.nonstriker);
            setSavedNonStriker(state.savedNonStriker);
            setStrikerBalls(state.strikerBalls);
            setNonStrikerBalls(state.nonStrikerBalls);
            setOversLimit(state.oversLimit);
            setCustomOvers(state.customOvers);
            setBowlerName(state.bowlerName);
            setCurrentBowler(state.currentBowler);
            setPreviousBowler(state.previousBowler);
            setBowlerRunsConceded(state.bowlerRunsConceded);
            setBowlerWickets(state.bowlerWickets);
            setBowlerBalls(state.bowlerBalls);
            setBowlerHistory(state.bowlerHistory);
            setEnglandName(state.englandName);
            setAustraliaName(state.australiaName);
            setTeamsLocked(state.teamsLocked);
            setBattingFirst(state.battingFirst);
        }
    }, []); // empty array = run once on mount, never again


    function Savebatterhere() {
        setSavebatter(batter);
    }
    function saveStriker() {
        setSavebatter(batter);
    }

    function saveteams() {
        if (teamNameA.trim() !== "") setEnglandName(teamNameA);
        if (teamNameB.trim() !== "") setAustraliaName(teamNameB);
        if (battingFirst === null) {
            alert("Please choose who bats first.");
            return;
        }
        setIsEngland(battingFirst === "A");
        setTeamsLocked(true);
    }

    function saveNonStriker() {
        setSavedNonStriker(nonstriker);
    }
    function handleOverEnd(updatedscore, newBalls, updatedballs) {
        if (newBalls % 6 === 0) {
            changeStrike(updatedscore, updatedballs);
        }
    }

    function saveBowler() {
        if (bowlerName.trim() === "") {
            alert("Enter a bowler name first.");
            return;
        }
        if (bowlerName === previousBowler) {
            alert("This bowler bowled the last over — pick someone else.");
            return;
        }
        setCurrentBowler(bowlerName);
        setBowlerName("");
    }
    function startNewMatch() {
        localStorage.removeItem('cricketMatch');
        window.location.reload();
    }
    function Switchinnings() {
        setChasing(true);
        setIsEngland(!isEngland);
        isEngland ? setEnglandscore(score) : setAustraliascore(score)
        setInnings1Team(isEngland ? englandName : australiaName);
        setInnings1Batters([...batterhistory, { name: savebatter, runs: strikerScore, balls: strikerBalls }]);
        setInnings1Wickets(wickets);
        setInnings1Bowlers(bowlerHistory);
        setInnings1Score(score);
        setScore(0);
        setBatter("");
        setSavedNonStriker(null);
        setNonstriker("");
        setWickets(0);
        setBatterhistory([]);
        setStrikerScore(0);
        setNonStrikerScore(0);
        setballs(0);
        setStrikerBalls(0);
        setNonStrikerBalls(0);
        setBowlerHistory([]);
        setCurrentBowler("");
        setPreviousBowler("");
        setSavebatter("");
        setBowlerRunsConceded(0);
        setBowlerWickets(0);
        setBowlerBalls(0);
    }
    function Wicket() {
        if (!savebatter) { alert("Enter and save the striker's name first."); return; }
        if (!currentBowler) { alert("Select and save a bowler before scoring."); return; }
        if (freehit) {
            alert("Free Hit! Batter cannot be out (except run-out).");
            return;
        }
        setBowlerWickets(bowlerWickets + 1);
        setBowlerBalls(bowlerBalls + 1);
        setSavebatter("");
        setBatter("");
        setWickets(wickets + 1);
        setBatterhistory([...batterhistory, { name: savebatter, runs: strikerScore, balls: strikerBalls + 1 }]);
        setStrikerScore(0);
        setballs(balls + 1);
        setStrikerBalls(0);
        const updatedballs = 0;
        handleOverEnd(strikerScore, balls + 1, updatedballs);

    }
    function handlerun(runs) {
        if (!savebatter) { alert("Enter and save the striker's name first."); return; }
        if (!currentBowler) { alert("Select and save a bowler before scoring."); return; }

        // 1. Calculate the new total locally
        const newTotal = score + runs;
        setFreehit(false);
        setStrikerScore(strikerScore + runs);
        setBowlerBalls(bowlerBalls + 1);
        // 2. Update the screen (React)
        setScore(newTotal);
        setBowlerRunsConceded(bowlerRunsConceded + runs);
        const updatedscore = strikerScore + runs;
        const newBalls = balls + 1;
        const updatedballs = strikerBalls + 1;
        setballs(balls + 1);
        setStrikerBalls(strikerBalls + 1);
        if (runs % 2 === 1) {
            changeStrike(updatedscore, updatedballs);
        }
        handleOverEnd(updatedscore, newBalls, updatedballs);
    }
    function handlebye(runs) {
        if (!savebatter) { alert("Enter and save the striker's name first."); return; }
        if (!currentBowler) { alert("Select and save a bowler before scoring."); return; }
        setFreehit(false);
        setScore(score + runs);
        setBowlerBalls(bowlerBalls + 1);
        const newBalls = balls + 1;
        const updatedballs = strikerBalls + 1;
        setballs(newBalls);
        setStrikerBalls(strikerBalls + 1);
        checkOverLimit(newBalls);
        const updatedscore = strikerScore;

        const isOdd = runs % 2 === 1;
        const isOverEnd = newBalls % 6 === 0;

        if (isOdd && !isOverEnd) {
            // odd runs, mid-over — just swap strike
            changeStrike(updatedscore, updatedballs);
        } else if (!isOdd && isOverEnd) {
            // even runs, over end — swap strike for new over
            changeStrike(updatedscore, updatedballs);
        } else if (isOdd && isOverEnd) {
            // odd runs AND over end — swaps cancel out, no swap needed
            // (batter who faced last ball of over faces next over too)
        }
        // even runs, mid-over — no swap
    }
    function handlewide(runs) {
        if (!savebatter) { alert("Enter and save the striker's name first."); return; }
        if (!currentBowler) { alert("Select and save a bowler before scoring."); return; }
        setScore(score + runs + 1);
        setBowlerRunsConceded(bowlerRunsConceded + runs + 1);

        const updatedscore = strikerScore;
        const updatedballs = strikerBalls;
        if (runs % 2 === 1) {
            changeStrike(updatedscore, updatedballs);
        }
        checkOverLimit(newBalls);
    }
    function checkOverLimit(newBalls) {
        if (newBalls >= totalBalls) {
            Switchinnings();
        }
    }
    function handlenoball(runs) {
        if (!savebatter) { alert("Enter and save the striker's name first."); return; }
        if (!currentBowler) { alert("Select and save a bowler before scoring."); return; }
        setScore(score + runs + 1);
        setStrikerScore(strikerScore + runs);
        setBowlerRunsConceded(bowlerRunsConceded + runs + 1);
        setFreehit(true);
        const updatedscore = strikerScore;
        const updatedballs = strikerBalls;
        setStrikerBalls(strikerBalls);
        const newBalls = balls;
        if (runs % 2 === 1) {
            changeStrike(updatedscore, updatedballs);
        }
        checkOverLimit(newBalls);
    }
    function changeStrike(updatedscore, updatedballs) {
        const tempName = savebatter;
        const tempScore = updatedscore;
        const tempballs = updatedballs;

        setSavebatter(savedNonStriker);
        setSavedNonStriker(tempName);

        setStrikerScore(nonStrikerScore);
        setNonStrikerScore(tempScore);

        setStrikerBalls(nonStrikerBalls);
        setNonStrikerBalls(tempballs);
    }


    const validruns = [0, 1, 2, 3, 4, 5, 6];

    const selectedOvers = oversLimit === -1 ? customOvers : oversLimit;

    const totalBalls = selectedOvers * 6;
    function Swictchinningsifoverscompleted() {
        if (balls > totalBalls) {
            Switchinnings();
        }
    }
    if (!teamsLocked) {
        return (
            <div className="setup-screen">
                <h2>Enter Team Names</h2>
                <input
                    type="text"
                    placeholder="Team 1 name (e.g. England)..."
                    value={teamNameA}
                    onChange={(e) => setTeamNameA(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Team 2 name (e.g. Australia)..."
                    value={teamNameB}
                    onChange={(e) => setTeamNameB(e.target.value)}
                />
                <h3>Who bats first?</h3>
                <button
                    className={battingFirst === "A" ? "btn-team btn-team-selected" : "btn-team"}
                    onClick={() => setBattingFirst("A")}
                >
                    {teamNameA.trim() !== "" ? teamNameA : "Team A"}
                </button>
                <button
                    className={battingFirst === "B" ? "btn-team btn-team-selected" : "btn-team"}
                    onClick={() => setBattingFirst("B")}
                >
                    {teamNameB.trim() !== "" ? teamNameB : "Team B"}
                </button>
                <br></br>
                <br></br>
                <button className="btn-primary" onClick={saveteams}>Start Match</button>
                <br></br>
                <br></br>
                <>
                    <select
                        value={oversLimit}
                        onChange={(e) => setOversLimit(Number(e.target.value))}
                    >
                        <option value={20}>20 Overs</option>
                        <option value={40}>40 Overs</option>
                        <option value={50}>50 Overs</option>
                        <option value={-1}> Custom</option>
                    </select>
                    {oversLimit === -1 && (<input
                        type="number"
                        min="1"
                        max="100"
                        value={customOvers}
                        onChange={(e) => setCustomOvers(Number(e.target.value))}
                        placeholder="Enter overs">
                    </input>)}
                </>

            </div>
        );
    }
    return <> <h2 className="page-title">Scorecard {englandName}</h2>
        <h2>Current Batting : {isEngland ? englandName : australiaName}</h2>

        <h2>Match Type: {selectedOvers} Overs</h2>
        {freehit && <h2 className="free-hit-alert">🔥 FREE HIT</h2>}
        <h2>
            Overs Left: {Math.floor((totalBalls - balls) / 6)}.
            {(totalBalls - balls) % 6}
        </h2>

        <div className="batter-history">{batterhistory.map((b, i) => (<h2 key={i}>{b.name} - {b.runs} ({b.balls}) SR: {b.balls > 0 ? ((b.runs / b.balls) * 100).toFixed(1) : "0.0"}</h2>))}</div>
        {
            chasing &&
            (
                <div className="target-box">
                    <h3>Target:{targettochase}</h3>
                    <h3>RunsLeft:{runsleft}</h3>
                </div>
            )
        }
        {isgamewon ?
            (
                <div className="win-banner">
                    <h1>{isEngland ? englandName : australiaName} WINS !!</h1>
                    {isgamewon && (
                        <button className="btn-primary" onClick={() => downloadScorecard({
                            englandName,
                            australiaName,
                            isEngland,
                            innings1Team,
                            innings1Score,
                            innings1Wickets,
                            innings1Batters,
                            innings1Bowlers,
                            score,
                            wickets,
                            batterhistory,
                            savebatter,
                            strikerScore,
                            strikerBalls,
                            bowlerHistory
                        })}>
                            Download Scorecard (PDF)
                        </button>
                    )}
                    <h1> FINALSCORE: {score}/{wickets}</h1>
                </div>
            ) :
            wickets > 9 ? "All Out" : (
                <>
                    <h2 className="scoreboard">Current Runs : {score}/{wickets}</h2>
                    <h2>Overs : {Math.floor(balls / 6)}.{balls % 6}</h2>

                    <h2 className="batter-line">Current Batter: {savebatter}({strikerScore})[{strikerBalls}]</h2>
                    <h2 className="batter-line">Non Striker:{savedNonStriker}({nonStrikerScore})[{nonStrikerBalls}]</h2>
                    <div>
                        <Buttonlist runs={validruns} label="Runs" onButton={handlerun}></Buttonlist>
                    </div>
                    <div>
                        <Buttonlist runs={validruns} label="Wide" onButton={handlewide}></Buttonlist>
                    </div >
                    <div>
                        <Buttonlist runs={validruns} label="Bye" onButton={handlebye}></Buttonlist>

                    </div >
                    <div>
                        <Buttonlist runs={validruns} label="Noball" onButton={handlenoball}></Buttonlist>
                    </div >

                    {wickets === 0 ? (<><input type="text" placeholder="Striker..." value={batter} onChange={(e) => setBatter(e.target.value)} />
                        <button className="btn-primary" onClick={(Savebatterhere)}>Save Striker</button>

                        <input type="text" placeholder="Non Striker..." value={nonstriker} onChange={(e) => setNonstriker(e.target.value)} />
                        <button className="btn-primary" onClick={(saveNonStriker)}>Save Non Striker</button>

                    </>
                    ) :
                        (<><input type="text" placeholder="Batter..." value={batter} onChange={(e) => setBatter(e.target.value)} />
                            <button className="btn-primary" onClick={(Savebatterhere)}>Save Next Batter</button></>)}
                    <h2 className="wicket-count">{wickets}</h2>
                    <button className="btn-wicket" onClick={(Wicket)}>Wicket</button>
                    <div className="bowler-section">
                        {
                            currentBowler === "" ? (
                                <>
                                    <h2>Select New Bowler</h2>
                                    {
                                        bowlerHistory.length > 0 && <select
                                            className="bowler-select"
                                            value={bowlerName}
                                            onChange={(e) => setBowlerName(e.target.value)}
                                        >
                                            <option value="">-- Select previous bowler --</option>
                                            {bowlerHistory.map(b => <option value={b.name}>{b.name}</option>)}
                                        </select>
                                    }
                                    <input
                                        placeholder='Bowler name...'
                                        value={bowlerName}
                                        type="text"
                                        onChange={(e) => {
                                            setBowlerName(e.target.value);
                                        }}
                                    >
                                    </input>
                                    <button className="btn-primary" onClick={saveBowler}>Save Bowler</button>                                </>
                            ) :
                                (<>
                                    <h3>Bowling: {currentBowler} — {bowlerRunsConceded} runs, {bowlerWickets} wkts ({Math.floor(bowlerBalls / 6)}.{bowlerBalls % 6} ov)</h3>
                                    {bowlerBalls === 0 && (
                                        <button className="btn-secondary" onClick={() => {
                                            setCurrentBowler("");
                                            setBowlerName("");
                                        }}>Change Bowler</button>
                                    )}
                                </>)
                        }

                    </div >
                    {!chasing && (<>
                        <h2>Select Match Length</h2>
                        <select
                            value={oversLimit}
                            onChange={(e) => setOversLimit(Number(e.target.value))}
                        >
                            <option value={20}>20 Overs</option>
                            <option value={40}>40 Overs</option>
                            <option value={50}>50 Overs</option>
                            <option value={-1}> Custom</option>
                        </select>
                        {oversLimit === -1 && (<input
                            type="number"
                            min="1"
                            max="100"
                            value={customOvers}
                            onChange={(e) => setCustomOvers(Number(e.target.value))}
                            placeholder="Enter overs">
                        </input>)}
                    </>)
                    }
                    <br></br>
                    <br></br>
                    {
                        !chasing && (
                            <button className="btn-secondary" onClick={Switchinnings}>
                                End Innings
                            </button>
                        )
                    }
                    <br></br>
                    <br></br>
                    <div className="bowler-history">
                        {bowlerHistory.map((b, i) => (
                            <h2 key={i}>
                                {b.name} - {Math.floor(b.balls / 6)}.{b.balls % 6} ov, {b.runs} runs, {b.wickets} wkts
                            </h2>
                        ))}
                    </div>
                    <button className="btn-secondary" onClick={startNewMatch}>New Match</button>
                </>
            )

        }
    </>
}

export default Greeter;