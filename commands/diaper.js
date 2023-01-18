const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('diaper')
		.setDescription('Begins diaper log'),
		
	async execute(interaction) {
		const button = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel(`Urine`)
            .setStyle("PRIMARY")
            .setCustomId(`urine`)
        )
        .addComponents(
          new MessageButton()
            .setLabel("BM")
            .setStyle('SECONDARY')
            .setCustomId('bm')
        )
        .addComponents(
          new MessageButton()
            .setLabel("Urine/BM")
            .setStyle('DANGER')
            .setCustomId('urinebm')
        )


		const event = new MessageEmbed()
        .setTitle("Diaper Log")
        .setColor('#c32323')
        .setDescription(`Logging diaper activity`)
        .addFields(
          { name: 'Type', value: `>>> \u200b`, inline: false},
          { name: 'Time', value: `>>> \u200b`, inline: false }
        )




		interaction.reply({embeds: [event], components: [button], fetchReply: true})

	},
};



//<@&768749366789799936> <@&767959410654969866>
