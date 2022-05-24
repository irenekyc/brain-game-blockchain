import { client } from "./sanity";

const fetchUser = async (currentAddress) => {
  if (process.env.NODE_ENV === "test") return;
  let canPlay = true;
  let cooldown = 0;
  const query = `*[_type == "users" && walletAddress == "${currentAddress}"]{userId, lastGame}`;
  const user = await client.fetch(query);

  // if user exist in our database
  if (user.length > 0) {
    // check cool down
    const lastPlayed = new Date(user[0].lastGame).getTime();
    const now = new Date().getTime();
    const sinceLastPlayed = (now - lastPlayed) / (1000 * 60 * 60);

    if (sinceLastPlayed <= 24) {
      if (process.env.NODE_ENV !== "development") {
        canPlay = false;
      }
      cooldown = Math.round(24 - sinceLastPlayed);
    }
  } else {
    // if user does NOT exist in our database
    const userDoc = {
      _type: "users",
      _id: currentAddress,
      walletAddress: currentAddress,
      startedFirstGame: false,
    };
    await client.createIfNotExists(userDoc);
  }

  return {
    canPlay,
    cooldown,
  };
};

export default fetchUser;
