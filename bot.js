const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');
let prefix = '!'

client.on('ready', () => { 
  console.log('Bot has started');
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
 
client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong! Your ping is ' + Math.round(client.ping) + 'ms');
  }
});
//When user sends msg, bot sends msg back
client.on('message', msg => {
  if (msg.content === 'Ping') {
    msg.reply('Pong! Your ping is ' + Math.round(client.ping) + 'ms');
  }
});
//When user sends msg, bot sends msg back
client.on('message', msg => {
  if (msg.content === 'Space') {
    msg.reply('Space is a beautiful place!');
  }
});
//When user sends msg, bot sends msg back
client.on('message', msg => {
  if (msg.content === 'space') {
    msg.reply('Space is a beautiful place!');
  }
});
//When user sends msg, bot sends msg back
client.on('message', msg => {
  if (msg.content === '@everyone') {
    msg.reply('You fucking trash why u mentioning everyone?');
  }
});
//When user sends msg, bot sends msg back
client.on('message', msg => {
  if (msg.content === 'help') {
    msg.reply('Wtf? You dont need help just write words lol');
  }
});
 //When user sends msg, bot sends msg back

client.on('message', async message => {
  
  if(message.author.bot) return undefined // so the bot doesn't reply to himself
  
  let msg = message.content.toLowerCase();
  let args = message.content.slice(prefix.length).trim().split(' ');// arguments 
  let command = args.shift().toLowerCase();// shift args to lower case letters
  
  try {
    let commands = require(`./commands/${command}.js`);
    commands.run(client, message, args);
  } catch (e) {
    console.log(e.stack)
  } finally {
    console.log(command)
  }
  if(message.content.startsWith(`${prefix}help`)) {
    
    message.reply('You can check for **help** in your **dms**');
    message.member.send('Oh so you want **help** on how to use this **bot**! I see. Ok here we go!\nThis bots **prefix** is **!** so use it for **every command**!\n` - rps`\n` - 8ball`\n` - google`\n` - say (something)`\n` - avatar @User`\n` - nickname (nickname)`\n\nYou can also say this to get a responce:**(whithout prefix)**\n` - Ping`\n` - Space`')

    let fetched = await  db.fetch(`prefix_${message.guild.id}`);
    if (fetched === null) prefix = '!';
    else prefix = fetched;
    
  }
});

client.login('process.env.BOT_TOKEN');
