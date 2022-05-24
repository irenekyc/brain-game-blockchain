import { client } from "./sanity";

export const updateGameTransactionStatus = (gameId, transactionSucceed) => {
  if (process.env.NODE_ENV === "test") return;
  client.patch(gameId).set({ transactionSucceed }).commit();
};

export const updateGameTransactionHash = (gameId, transactionHash) => {
  client.patch(gameId).set({ transactionHash }).commit();
};
