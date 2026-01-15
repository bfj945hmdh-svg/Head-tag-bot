const { Client, GatewayIntentBits } = require("discord.js");

const TOKEN = process.env.TOKEN;

const GUILD_ID = "1406358360789352629";
const ROLE_ID = "1460834692151382257";
const SERVER_TAG = "HEAD";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.on("ready", () => {
  console.log("Bot online");
});

client.on("guildMemberUpdate", async (oldMember, newMember) => {
  if (newMember.guild.id !== GUILD_ID) return;

  const oldName = oldMember.user.globalName || oldMember.user.username;
  const newName = newMember.user.globalName || newMember.user.username;

  const hadTag = oldName.includes(SERVER_TAG);
  const hasTag = newName.includes(SERVER_TAG);

  if (!hadTag && hasTag) {
    await newMember.roles.add(ROLE_ID).catch(() => {});
  }

  if (hadTag && !hasTag) {
    await newMember.roles.remove(ROLE_ID).catch(() => {});
  }
});

client.login(TOKEN);
