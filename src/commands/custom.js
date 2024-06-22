const { SlashCommandBuilder, EmbedBuilder, } = require('discord.js');
const { rollAllDices, } = require('@nihilncunia/diceroll');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('커스텀주사위')
    .setDescription('주사위식을 자유롭게 입력하고 굴립니다.')
    .addStringOption((opt) => (
      opt
        .setName('주사위식')
        .setDescription('주사위식을 입력하세요.')
        .setRequired(true)
    )),
  run: ({ interaction, client, handler, }) => {
    const dice = interaction.options.get('주사위식')
      ? interaction.options.get('주사위식').value
      : null;

    const result = rollAllDices(dice);

    const embed = new EmbedBuilder()
      .setColor('Red')
      .setFields(...result.map((item) => ({
        name: item.formula,
        value: `- 전체 결과: **[ ${item.diceTotal} ]**\n**상세 결과:**\n${item.diceDetails.map((item2) => `- ${item2.dice} **[ ${item2.total} ]** (${item2.details.join('')})\n`)}- 보정: [${item.modDetails.join(',')}]`,
      })))

    interaction.reply({
      embeds: [ embed, ],
    });
  },
  options: {},
};
