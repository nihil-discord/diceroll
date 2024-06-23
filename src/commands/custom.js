const { SlashCommandBuilder, EmbedBuilder, } = require('discord.js');
const { Dice, } = require('@nihilapp/dice');

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

    const result = Dice.rollToFormula({
      formula: dice,
    });

    const embed = new EmbedBuilder()
      .setColor('Red')
      .setFields(...result.map((item) => {
        const rollMap = item.dices.map((item2) => `${item2.formula} **[ ${item2.total} ]**\n  - 선택됨 (${item2.result.join(',')})\n  - 제외됨 (${item2.ignore.join(',')})`);

        const modMap = item.mod.length > 0 ? `- 보정: [${item.mod.join(',')}]` : '';

        return {
          name: item.formula,
          value: `- 전체 결과: **[ ${item.total} ]**\n- 상세 결과: ${rollMap}\n${modMap}`,
        };
      }))

    interaction.reply({
      embeds: [ embed, ],
    });
  },
  options: {},
};
