import { client } from "./sanity";
import { v4 as uuidv4 } from "uuid";

const createGameHistory = async ({ currentAccount, status, level }) => {
  if (process.env.NODE_ENV === "test") return;
  const gameId = `${currentAccount}-game-${uuidv4()}`;
  const gameDoc = {
    _type: "games",
    _id: gameId,
    gameId,
    level,
    timestamp: new Date(),
    status,
    user: {
      _key: gameId,
      _type: "reference",
      _ref: currentAccount,
    },
  };

  await client.create(gameDoc);
  await client
    .patch(currentAccount)
    .setIfMissing({ gameHistory: [] })
    .insert("after", "gameHistory[-1]", [
      {
        _key: gameId,
        _type: "reference",
        _ref: gameId,
      },
    ])
    .commit();
  await client
    .patch(currentAccount)
    .set({ startedFirstGame: true, lastGame: new Date() })
    .commit();

  return gameId;
};

export default createGameHistory;
