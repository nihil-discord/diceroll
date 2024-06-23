const { SlashCommandBuilder, EmbedBuilder, } = require('discord.js');
const { Dice, } = require('@nihilapp/dice');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('기본주사위')
    .setDescription('준비된 주사위를 굴립니다.')
    .addStringOption((opt) => (
      opt
        .setName('주사위식')
        .setDescription('주사위식을 선택하세요.')
        .setRequired(true)
        .setChoices(...Dice.preset().map((item) => ({
          name: item,
          value: item,
        })))
    )),
  run: ({ interaction, client, handler, }) => {
    const dice = interaction.options.get('주사위식')
      ? interaction.options.get('주사위식').value
      : null;

    const result = Dice.rollToFormula({
      formula: dice,
    });

    const embed = new EmbedBuilder()
      .setColor('Red')
      .setFields(...result.map((item) => {
        const rollMap = item.dices.map((item2) => `${item2.formula} **[ ${item2.total} ]** (${item2.result.join(',')})\n`);

        return {
          name: item.formula,
          value: `- 전체 결과: **[ ${item.total} ]**\n- 상세 결과: ${rollMap}`,
        }
      }))

    interaction.reply({
      embeds: [ embed, ],
    });
  },
  options: {},
};
