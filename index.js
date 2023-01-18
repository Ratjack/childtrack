const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents, MessageButton, MessageActionRow } = require('discord.js');
const Discord = require("discord.js");
const { token } = require('./config.json');
const config = require("./config.json");


const client = new Client({ intents: [Intents.FLAGS.GUILDS, "GUILD_MEMBERS", "GUILD_MESSAGES",] });
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');


const commands = [];
const clientId = config.clientId;
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');
    
    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands },
      console.log(commands)
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();



client.on("ready", async () => {
  console.log('Ready!')




});



client.on('interactionCreate', async interaction => {



  if (interaction.isButton()) {

    if(interaction.customId === "tylenol") {
      let medication = "Tylenol"
      let time = Math.round(interaction.createdTimestamp /1000)
      console.log(Math.round(time / 1000))

      const receivedEmbed2 = interaction.message.embeds[0];
      receivedEmbed2.fields.find(f => f.name === "Medication taken").value = `>>> Tylenol`
      receivedEmbed2.fields.find(f => f.name === "Time taken").value = `>>> <t:${time}>`
      receivedEmbed2.fields.find(f => f.name === "Next dose").value = `>>> Motrin <t:${time + 60 * 60 * config.medhours}>`

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

      interaction.reply({ embeds: [receivedEmbed2], components: [button] })


    }


    if(interaction.customId === "motrin") {
      let medication = "Tylenol"
      let time = Math.round(interaction.createdTimestamp /1000)
      console.log(Math.round(time / 1000))

      const receivedEmbed2 = interaction.message.embeds[0];
      receivedEmbed2.fields.find(f => f.name === "Medication taken").value = `>>> Motrin`
      receivedEmbed2.fields.find(f => f.name === "Time taken").value = `>>> <t:${time}>`
      receivedEmbed2.fields.find(f => f.name === "Next dose").value = `>>> Tylenol <t:${time + 60 * 60 * config.medhours}>`

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

      interaction.reply({ embeds: [receivedEmbed2], components: [button] })


    }

    
    if(interaction.customId === "urine") {
 
      let time = Math.round(interaction.createdTimestamp /1000)
      console.log(Math.round(time / 1000))

      const receivedEmbed2 = interaction.message.embeds[0];
      receivedEmbed2.fields.find(f => f.name === "Type").value = `>>> Urine`
      receivedEmbed2.fields.find(f => f.name === "Time").value = `>>> <t:${time}>`


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


      interaction.reply({ embeds: [receivedEmbed2], components: [button] })


    }

    if(interaction.customId === "bm") {
 
      let time = Math.round(interaction.createdTimestamp /1000)
      console.log(Math.round(time / 1000))

      const receivedEmbed2 = interaction.message.embeds[0];
      receivedEmbed2.fields.find(f => f.name === "Type").value = `>>> BM`
      receivedEmbed2.fields.find(f => f.name === "Time").value = `>>> <t:${time}>`


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


      interaction.reply({ embeds: [receivedEmbed2], components: [button] })


    }

    if(interaction.customId === "urinebm") {
 
      let time = Math.round(interaction.createdTimestamp /1000)
      console.log(Math.round(time / 1000))

      const receivedEmbed2 = interaction.message.embeds[0];
      receivedEmbed2.fields.find(f => f.name === "Type").value = `>>> Urine/BM`
      receivedEmbed2.fields.find(f => f.name === "Time").value = `>>> <t:${time}>`


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


      interaction.reply({ embeds: [receivedEmbed2], components: [button] })


    }


  }


  if (!interaction.isCommand()) return;


  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);



  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});


client.login(config.token)

