const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('medicine')
		.setDescription('Begins medicine log'),
		
	async execute(interaction) {
		const button = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel(`Tylenol`)
            .setStyle("PRIMARY")
            .setCustomId(`tylenol`)
        )
        .addComponents(
          new MessageButton()
            .setLabel("Motrin")
            .setStyle('SECONDARY')
            .setCustomId('motrin')
        )


		const event = new MessageEmbed()
        .setTitle("Medecine Log")
        .setColor('#c32323')
        .setDescription(`The date and time of last medication.`)
        .addFields(
          { name: 'Medication taken', value: `>>> \u200b`, inline: false},
          { name: 'Time taken', value: `>>> \u200b`, inline: false },
          { name: 'Next dose', value: `>>> \u200b`, inline: false }
        )




		interaction.reply({embeds: [event], components: [button], fetchReply: true})

	},
};



//<@&768749366789799936> <@&767959410654969866>
