const { SlashCommandBuilder, EmbedBuilder, } = require('discord.js');
const { Dice, RollResult, } = require('@nihilapp/dice');

const preset = Dice.preset()
  .map((item) => ({
    name: item,
    value: item,
  }));

module.exports = {
  data: new SlashCommandBuilder()
    .setName('기본주사위')
    .setDescription('준비된 주사위를 굴립니다.')
    .addStringOption((opt) => (
      opt
        .setName('주사위식')
        .setDescription('주사위식을 선택하세요.')
        .setRequired(true)
        .setChoices(...preset)
    )),
  run: ({ interaction, client, handler, }) => {
    /** @type {string | null} */
    const dice = interaction.options.get('주사위식')
      ? interaction.options.get('주사위식').value
      : null;

    /** @type {RollResult} */
    const result = Dice.rollToFormula({
      formula: /** @type {string} */ dice,
    }).at(0);

    const total = `전체 결과: **[ ${result.total} ]**\n\n`;

    const dices = result.dices.at(0);
    const detailString = dices.result
      .map((item) => item.dice)
      .join(',');

    const details = `상세 결과:\n\t- ${result.formula} **[ ${result.total} ]**(${detailString})`;

    const embed = new EmbedBuilder()
      .setColor('Red')
      .setFields([ {
        name: result.formula,
        value: `${total}`
          + `${details}`,
      }, ])

    interaction.reply({
      embeds: [ embed, ],
    });
  },
  options: {},
};
