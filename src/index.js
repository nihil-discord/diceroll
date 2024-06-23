const { CommandKit, } = require('commandkit');
const { Client, IntentsBitField, } = require('discord.js');
const path = require('path');
const env = require('dotenv');

env.config();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.DirectMessageReactions,
  ],
});

// eslint-disable-next-line no-new
new CommandKit({
  client,
  eventsPath: path.join(__dirname, 'events'),
  commandsPath: path.join(__dirname, 'commands'),
  devGuildIds: [ '888697033211392003', ],
  devUserIds: [ '197054124020334593', ],
});

client.login(process.env.TOKEN);
