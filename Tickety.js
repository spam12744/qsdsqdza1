const Discord  = require('discord.js');
const hero     = new Discord.Client();
const prefix   = "#";
const category = "530162023749779462";
const devs     = ["475396751549792277", "403512493529497601"];
let mtickets   = true;
let tchannels  = [];
let current    = 0;

hero.login('NTI3OTY4Mzg0MTY0NDI5ODI0.Dw7B2A.kPwmsJGmbs5ItSeDcKSkjJ_XR58');

hero.on('ready',async () => console.log(`   - " ${hero.user.username} " , Tickety is ready to work.`));
hero.on('message',async message => {
    const emojis   = { yes: `${hero.guilds.find(r => r.id === '530036295225835520').emojis.find(e => e.name === 'Yes')}`, wrong: `${hero.guilds.find(r => r.id === '530036295225835520').emojis.find(e => e.name === 'Wrong')}` };
    if(message.author.bot || message.channel.type === 'dm') return;
    let args = message.content.split(" ");
    let author = message.author.id;
    if(args[0].toLowerCase() === `${prefix}help`) {
            let embed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setThumbnail(message.author.avatarURL)
            .setColor("#36393e")
            .addField(`❯ لعمل تكت, \`${prefix}new\``, `» Syntax: \`${prefix}new [Reason]\`\n» Description: **لعمل روم فقط يظهر لك ولأدارة السيرفر.**`)
            .addField(`❯ قائمة الأوامر, \`${prefix}help\``, `» Syntax: \`${prefix}help\`\n» Description: **يظهر لك جميع اوامر البوت.**`)
            .addField(`❯ لإيقاف الأعضاء من عمل تكتات, \`${prefix}mtickets\``, `» Syntax: \`${prefix}mtickets [Disable/Enable]\`\n» Description: **لجعل جميع اعضاء السيرفر غير قادرون على عمل تكت.**`)
			.addField(`❯ لأقفال جميع التكتات المفتوحة, \`${prefix}deletetickets\``, `» Syntax: \`${prefix}deletetickets\`\n» Description: **لمسح جميع رومات التكتات المفتوحة في السيرفر**`)
            .addField(`❯ لقفل التكت المفتوح, \`${prefix}close\``, `» Syntax: \`${prefix}close\`\n» Description: **لأقفال تكت.**\n\n للمزيد من المعلومات تواصل مع احد ادارة سيرفر رويال جيمز.`)
            await message.channel.send(`${emojis.yes}, **هذه قائمة بجميع اوامر البووت.**`);
            await message.channel.send(embed);
    } else if(args[0].toLowerCase() === `${prefix}new`) {
        if(mtickets === false) return message.channel.send(`${emojis.wrong}, **تم ايقاف هذه الخاصية من قبل احد ادارة السيرفر**`);
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`${emojis.wrong}, **البوت لا يملك صلاحيات لصنع الروم**`);
		console.log(current);
		let openReason = "";
		current++;
    	message.guild.createChannel(`rgticket-${current}`, 'text').then(c => {
		tchannels.push(c.id);
		c.setParent(category);
		message.channel.send(`${emojis.yes}, **تم عمل التكت.**`);
		c.overwritePermissions(message.guild.id, {
			READ_MESSAGES: false,
			SEND_MESSAGES: false
		});
		c.overwritePermissions(message.author.id, {
			READ_MESSAGES: true,
			SEND_MESSAGES: true
		});
		
		if(args[1]) openReason = `\nسبب فتح التكت , " **${args.slice(1).join(" ")}** "`;
		let embed = new Discord.RichEmbed()
		.setAuthor(message.author.username, message.author.avatarURL)
		.setColor("#36393e")
		.setDescription(`**انتظر قليلا الى حين رد الادارة عليك**${openReason}`);
		c.send(`${message.author}`);
		c.send(embed);
	});
    } else if(args[0].toLowerCase() === `${prefix}mtickets`) {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`${emojis.wrong}, **أنت لست من ادارة السيرفر لتنفيذ هذا الأمر.**`);
		if(args[1] && args[1].toLowerCase() === "enable") {
			mtickets = true;
			message.channel.send(`${emojis.yes}, **تم تفعيل التكتات , الاَن يمكن لأعضاء السيرفر استخدام امر انشاء التكت**`);
		} else if(args[1] && args[1].toLowerCase() === "disable") {
			mtickets = false;
			message.channel.send(`${emojis.yes}, **تم اغلاق نظام التكتات , الاَن لا يمكن لأي عضو استخدام هذا الأمر**`);
		} else if(!args[1]) {
			if(mtickets === true) {
			mtickets = false;
			message.channel.send(`${emojis.yes}, **تم اغلاق نظام التكتات , الاَن لا يمكن لأي عضو استخدام هذا الأمر**`);
			} else if(mtickets === false) {
			mtickets = true;
			message.channel.send(`${emojis.yes}, **تم تفعيل التكتات , الاَن يمكن لأعضاء السيرفر استخدام امر انشاء التكت**`);
			}
		}
    } else if(args[0].toLowerCase() === `${prefix}close`) {
		if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`${emojis.wrong}, **أنت لست من ادارة السيرفر لتنفيذ هذا الأمر.**`);
		if(!message.channel.name.startsWith('rgticket-') && !tchannels.includes(message.channel.id)) return message.channel.send(`${emojis.wrong}, **هذا الروم ليس من رومات التكت.**`);
		
		message.channel.send(`${emojis.yes}, **سيتم اغلاق الروم في 3 ثواني من الاَن.**`);
		tchannels.splice( tchannels.indexOf(message.channel.id), 1 );
		setTimeout(() => message.channel.delete(), 3000);
	} else if(args[0].toLowerCase() === `${prefix}restart`) {
		if(!devs.includes(message.author.id)) return message.channel.send(`${emojis.wrong}, **أنت لست من ادارة السيرفر لأستخدام هذا الأمر.**`);
		message.channel.send(`${emojis.yes}, **جارى اعادة تشغيل البوت.**`);
		hero.destroy();
		hero.login(process.env.ROYALE_TOKEN);
	} else if(args[0].toLowerCase() === `${prefix}deletetickets`) {
		let iq = 0;
		for(let q = 0; q < tchannels.length; q++) {
			let c = message.guild.channels.get(tchannels[q]);
			if(c) {
				c.delete();
				tchannels.splice( tchannels[q], 1 );
				iq++;
			}
			if(q === tchannels.length - 1 || q === tchannels.lengh + 1) {
				message.channel.send(`${emojis.yes}, **تم مسح \`${iq}\` من التكتات.**`);
			}
		}
	}
});

// ❯ , »
