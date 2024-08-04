const { SlashCommandBuilder, EmbedBuilder, } = require('discord.js');
const { Dice, RollError, RollResult, } = require('@nihilapp/dice');

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
    /** @type {string | null} */
    const dice = interaction.options.get('주사위식')
      ? interaction.options.get('주사위식').value
      : null;

    const result = Dice.rollToFormula({
      formula: /** @type {string} */ dice,
    });

    console.log(JSON.stringify(result));

    function dices() {
      /** @type {RollResult[]} */
      const copyResult = [ ...result, ];
      return copyResult.map((diceResult) => {
        const { formula, } = diceResult;
        console.log(formula);

        const total = `전체 결과: **[ ${diceResult.total} ]**\n\n`;
        console.log(total);

        const details = diceResult.dices.map((res, index) => {
          const { formula, } = res;
          const detailString = res.result.map(
            (resItem) => resItem.dice
          ).join(',');

          const ignoreString = res.ignore.length !== 0
            ? res.ignore.map((igRes) => igRes.dice).join(',')
            : '';
          const ignore = ignoreString
            ? `\n\t- 제외됨 (${ignoreString})`
            : '';

          return `- ${formula} **[ ${res.total} ]**(${detailString})${ignore}\n`;
        });
        console.log(details);

        const modString = diceResult.mod.length !== 0
          ? diceResult.mod.join(', ')
          : '';
        const mod = modString
          ? `- 보정치 (${modString})`
          : '';
        console.log(mod);

        console.log(`${total}상세 결과:\n${details.join('')}${mod}`);

        return {
          name: formula,
          value: `${total}상세 결과:\n${details.join('')}${mod}`,
        };
      })
    }

    dices();

    if ('errorNumber' in result) {
      console.log(111);
      const embed = new EmbedBuilder()
        .setColor('Red')
        .setFields({
          name: `에러번호 ${result.errorNumber}`,
          value: result.errorMessage,
        })

      interaction.reply({
        embeds: [ embed, ],
      });
    } else {
      console.log(222);
      const embed = new EmbedBuilder()
        .setColor('Red')
        .setFields(dices())

      interaction.reply({
        embeds: [ embed, ],
      });
    }
  },
  options: {},
};
