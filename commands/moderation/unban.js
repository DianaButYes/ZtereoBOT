const fs = require('fs');
const Discord = require('discord.js');
module.exports = {
    name: 'unban',
    category: 'moderation',
	description: 'Unbans a player from the guild.',
	execute(message, args, client, database) {
        // Help command
        if (!args.length || args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
            .setColor('#8EB9FE')
            .setAuthor('Unban Command Help:', 'https://i.imgur.com/dSTYnIF.png')
            .addFields(
                { name: `${database[`${message.guild.id}`]["prefix"]}unban [member id]`, value: `Unbans a player from the guild.` },
            )
            .setFooter('Ban Member perms required', 'https://i.imgur.com/Z9gjIx1.png')
            message.channel.send(embed);
            return;
        };

        if (!(message.guild.member(message.author).hasPermission('BAN_MEMBERS') || message.guild.member(message.author).id == message.guild.ownerID)) {
            message.reply("you don\'t have the permission to do that (Ban Members perms).");
            return;
        }

        if (/[a-z]/.test(args[0])) {
            message.reply(`please give select a user by its ID. To find the ID, use \`${database[`${message.guild.id}`]["prefix"]}banlist\``)
            return;
        };

        if (!Object.keys(database[`${message.guild.id}`]['bans']).includes(args[0])) {
            message.reply('that user is not currently banned in this guild.')
            return;
        };
        
        message.guild.members.unban(args[0])
        .then(user => message.reply(`you unbanned ${user.username} from ${message.guild.name}.`))
        delete database[`${message.guild.id}`]['bans'][`${args[0]}`];
        
        // Save the JSON file
        var saveJson = JSON.stringify(database, null, 4);
        fs.writeFile('database.json', saveJson, 'utf8', (err)=>{
            if(err){
                console.log(err)
            }
        });
	},
};