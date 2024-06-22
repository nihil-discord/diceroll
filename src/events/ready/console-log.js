const { Client, } = require('discord.js');

/**
 * @param {Client} client
 */
module.exports = (client) => {
  console.log(`[${client.user.username}] 봇이 로그인 상태입니다.`);
};
