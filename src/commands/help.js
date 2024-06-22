const { SlashCommandBuilder, EmbedBuilder, } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('사용법')
    .setDescription('사용법을 봅니다.'),
  run({ interaction, }) {
    const embed = new EmbedBuilder()
      .setColor('Red')
      .setFields([ {
        name: '주사위식',
        value: '주사위를 굴리는 식을 주사위식이라고 부릅니다. 주사위식은 아래와 같이 표현 가능합니다. diceRoll은 기본 주사위와 사용자 정의 주사위를 굴릴 수 있습니다.',
      }, {
        name: 'nDn',
        value: '첫번째 n은 주사위의 개수를 말합니다. 두번째 n은 주사위의 면을 말합니다. 3D6은 6면체 주사위 3개를 의미합니다. 이렇게 굴리면 한 번에 굴리고 모두 더한 값을 보여줍니다. 첫번째 n은 생략해도 됩니다. 그럼 1Dn과 같은 의미가 됩니다.',
        inline: true,
      }, {
        name: 'nDn+nDn',
        value: '주사위식은 더하기 기호를 통해 값을 더할 수 있습니다. 각 주사위의 결과는 세세하게 보여주고, 모두 더한 값도 보여줍니다.',
        inline: true,
      }, {
        name: 'nDn+n',
        value: '주사위식과 양의 정수와 음의 정수를 더할 수 있습니다. 이를 보정치라고 부릅니다. 주사위를 굴린 결과에는 보정치들도 함께 나열됩니다.',
        inline: true,
      }, {
        name: 'nDn*n',
        value: '주사위식에 별표 기호와 함께 숫자를 입력해주면 같은 주사위식을 따로 명시한 만큼 실행합니다. 2D20*2 라면  2D20을 두번 굴립니다. 총합을 계산하지 않습니다.',
        inline: true,
      }, {
        name: 'nDn nDn',
        value: '주사위식 사이에 공백을 넣으면 역시 따로 굴리겠다는 것을 의미합니다. 총합으로 계산하지 않습니다.',
        inline: true,
      }, ]);

    interaction.reply({
      embeds: [ embed, ],
    });
  },
};
