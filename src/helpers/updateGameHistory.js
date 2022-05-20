import { client } from "../library/sanity";

export const updateGameTransactionStatus = (gameId, transactionSucceed) => {
  client.patch(gameId).set({ transactionSucceed }).commit();
};

export const updateGameTransactionHash = (gameId, transactionHash) => {
  client.patch(gameId).set({ transactionHash }).commit();
};
