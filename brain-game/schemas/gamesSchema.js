export const gamesSchema = {
  name: "games",
  title: "Games",
  type: "document",
  fields: [
    { name: "gameId", title: "Game Id", type: "string" },
    { name: "level", title: "Level", type: "string" },
    {
      name: "timestamp",
      title: "Timestamp",
      type: "datetime",
    },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Win", value: "win" },
          { title: "Lost", value: "lost" },
        ],
      },
      defaultValue: "lost",
    },
    {
      name: "transactionHash",
      title: "Transaction Hash",
      type: "string",
      hidden: ({ document }) => document?.status === "lost",
    },
    {
      name: "transactionSucceed",
      title: "Transaction Succeed",
      type: "boolean",
      hidden: ({ document }) => document?.status === "lost",
    },
    {
      name: "user",
      title: "User",
      type: "reference",
      to: [{ type: "users" }],
    },
  ],
};
