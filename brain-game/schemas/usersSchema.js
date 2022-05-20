export const usersSchema = {
  name: "users",
  title: "Users",
  type: "document",
  fields: [
    {
      name: "walletAddress",
      title: "Wallet Address",
      type: "string",
    },
    {
      name: "startedFirstGame",
      title: "Has StartedFirstGame",
      type: "boolean",
      defaultValue: false,
    },
    {
      name: "lastGame",
      title: "Last Game",
      type: "datetime",
      hidden: ({ document }) => !document?.startedFirstGame,
    },
    {
      name: "gameHistory",
      title: "Game History",
      type: "array",
      of: [{ type: "reference", to: [{ type: "games" }] }],
    },
  ],
};
