const Discord = require('discord.js');
module.exports = {
    name: 'warnhistory',
    category: 'moderation',
	description: 'Shows a user\'s history of warnings.',
	execute(message, args, client, database) {
        // Help command
        if (!args.length || args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
            .setColor('#8EB9FE')
            .setAuthor('Warnhistory Command Help:', 'https://i.imgur.com/dSTYnIF.png')
            .addFields(
                { name: `${database[`${message.guild.id}`]["prefix"]}warnhistory [@member]`, value: `Shows a user\'s history of warnings.` },
            )
            message.channel.send(embed);
            return;
        }

        let User = message.guild.member(message.mentions.users.first())
        if (!(message.guild.member(message.author).hasPermission('KICK_MEMBERS') || message.guild.member(message.author).id == message.guild.ownerID)) {
            message.reply("you don\'t have the permission to do that (Kick Members perms).");
            return;
        }

        if (!message.mentions.users.first()) {
            message.reply('please specify a user to warn.')
            return;
        };

        if (!database[`${message.guild.id}`]['warnings'].hasOwnProperty(`${User.id}`)) {
            message.channel.send("That user has no warnings in this server.");
            return;
        };

        const embed = new Discord.MessageEmbed()
        .setColor('#00cc00')
		.setTitle(`${database[message.guild.id]['warnings'][`${User.id}`]['username']}'s warnings:`)
		let i;
		for (i = 0; i < Object.keys(database[message.guild.id]['warnings'][`${User.id}`]['warns']).length; i++) {
		    embed.addField(`${Object.keys(database[message.guild.id]['warnings'][`${User.id}`]['warns'])[i]}.`, `**Reason:** ${database[message.guild.id]['warnings'][`${User.id}`]['warns'][Object.keys(database[message.guild.id]['warnings'][`${User.id}`]['warns'])[i]]['reason']} \n **Date:** ${database[message.guild.id]['warnings'][`${User.id}`]['warns'][Object.keys(database[message.guild.id]['warnings'][`${User.id}`]['warns'])[i]]['date']}`);
        };
        
		message.channel.send(embed);
	},
};