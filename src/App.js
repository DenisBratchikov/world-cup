import { useState, useMemo } from "react";
import { v4 as uuid } from "uuid";

import Form from "./components/Form";
import List from "./components/List";
import { getWithDivider } from "./utils";

import style from "./App.module.css";

const NEW_GAME_INPUT_PROPS = {
  type: "text",
  maxLength: 100,
  required: true,
  pattern: "\\w+",
};

const NEW_SCORE_INPUT_PROPS = {
  type: "number",
  min: 0,
  max: 100,
  required: true,
  pattern: "\\d+",
};

function App() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

  const [activeGames, finishedGames] = useMemo(() => {
    const active = [];
    const finished = [];
    games.forEach((game) => (game.isActive ? active : finished).push(game));
    return [active, finished];
  }, [games]);

  const startGameHandler = (e) => {
    e.preventDefault();
    const newGame = Object.fromEntries(new FormData(e.target));
    const newTeams = new Set(Object.values(newGame));

    if (newTeams.size === 1) {
      return alert(
        'You printed the same team in "Home Team" and "Away Team" fields'
      );
    }
    if (
      activeGames.some(
        ({ homeTeam, awayTeam }) =>
          newTeams.has(homeTeam) || newTeams.has(awayTeam)
      )
    ) {
      return alert("One of the team is playing now!");
    }

    e.target.reset();

    setGames((currentGames) =>
      currentGames.concat({
        ...newGame,
        isActive: true,
        timestamp: Date.now(),
        id: uuid(),
        homeScore: 0,
        awayScore: 0,
      })
    );
  };

  const updateScoreHandler = (e) => {
    e.preventDefault();
    const newScore = Object.fromEntries(new FormData(e.target));
    e.target.reset();

    setGames((currentGames) => {
      const selectedGameId = selectedGame.id;
      return currentGames.map((game) =>
        game.id === selectedGameId
          ? {
              ...game,
              homeScore: +newScore.homeScore,
              awayScore: +newScore.awayScore,
            }
          : game
      );
    });
  };

  const finishGameHandler = () => {
    setGames((currentGames) => {
      const selectedGameId = selectedGame.id;
      return currentGames.map((game) =>
        game.id === selectedGameId ? { ...game, isActive: false } : game
      );
    });
    setSelectedGame(null);
  };

  const showSummary = () => {
    const result = finishedGames
      .sort((a, b) => {
        const scoreDiff =
          a.homeScore + a.awayScore - (b.homeScore + b.awayScore);
        if (scoreDiff === 0) {
          return a.timestamp - b.timestamp;
        }
        return scoreDiff;
      })
      .reduceRight(
        (acc, item) =>
          `${acc}\n${getWithDivider(
            item.homeTeam,
            item.awayTeam
          )}: ${getWithDivider(item.homeScore, item.awayScore)}`,
        ""
      );
    alert(result);
  };

  return (
    <div className={style.app}>
      <h1>Football World Cup Score Board</h1>
      <List
        title="Active games"
        items={activeGames}
        noItemsMessage="No active games"
        onSelectRow={setSelectedGame}
        selectedRow={selectedGame}
      />
      <Form
        onSubmit={startGameHandler}
        commonInputProps={NEW_GAME_INPUT_PROPS}
        homeInputProps={{ name: "homeTeam", placeholder: "Home Team" }}
        awayInputProps={{ name: "awayTeam", placeholder: "Away Team" }}
        buttonText="Start the game"
      />
      <Form
        onSubmit={updateScoreHandler}
        commonInputProps={NEW_SCORE_INPUT_PROPS}
        homeInputProps={{ name: "homeScore", placeholder: "Home Team Score" }}
        awayInputProps={{ name: "awayScore", placeholder: "Away Team Score" }}
        buttonText="Update selected game"
        disabled={!selectedGame}
      />
      <div className={style.buttonsContainer}>
        <button
          type="button"
          className={style.button}
          onClick={finishGameHandler}
          disabled={!selectedGame}
        >
          Finish selected game
        </button>
        <button type="button" className={style.button} onClick={showSummary}>
          Get a summary
        </button>
      </div>
    </div>
  );
}

export default App;
