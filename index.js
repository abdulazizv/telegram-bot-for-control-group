const { Telegraf } = require('telegraf');
const config = require("config")

const token = config.get("token")
const adminId = config.get("adminId")
const bot = new Telegraf(token);
const groupId = -4583948804;
bot.command('start',(ctx) => {
    const user = ctx.message.from;
    if(ctx.from.id == adminId) {
        ctx.replyWithHTML(`🫡 <b>Assalomu alaykum!</b>\n\n Xush kelibsiz <b>Admin ${user.first_name} - ${user.username} </b> 📩`)
    }
})

bot.on('text',(ctx) => {
    const user = ctx.message.from;
    const timestamp = ctx.message.date;
    const messageDate = new Date(timestamp * 1000)
    const username = user.username;
    const messageId = ctx.message.message_id;
    const chatId = ctx.message.chat.id;
    const msg = ctx.message.text;
    const firstName = ctx.message.from.first_name;
    console.log(ctx.message.chat.id)
    if(msg && ctx.from.id !== adminId && ctx.message.chat.id != groupId) {
        ctx.deleteMessage(messageId,chatId)
        .then(() => {
            if(username) {
                ctx.telegram.sendMessage(adminId, `👤 <b>Foydalanuvchi</b>: @${username}\n🕧 <b>Yozilgan vaqti</b>: ${messageDate}\n\n\n 📜 <b>tekst</b>: ${msg}`,{
                    parse_mode: 'HTML'
                });
                ctx.telegram.sendMessage(groupId, `👤 <b>Foydalanuvchi</b>: @${username}\n🕧 <b>Yozilgan vaqti</b>: ${messageDate}\n\n\n 📜 <b>tekst</b>: ${msg}`, {
                    parse_mode: 'HTML'
                })
                ctx.replyWithHTML(`✋Salom, hurmatli mijoz! Xabaringiz o'chirildi 📩\n\n  ✍️Adminlarning o'zi sizga yozishadi 😊`);
            } else {
                console.log(ctx.message.from)
                const mentionMessage = `👤 **Foydalanuvchi**: [${firstName}](tg://user?id=${ctx.message.from.id}) \n 🕧 **Yozilgan vaqti**: ${messageDate}\n\n 📜**tekst**: ${msg}`;
                ctx.telegram.sendMessage(adminId, `👤 <b>Foydalanuvchi</b>: ${firstName}\n\n 🕧<b>Yozilgan vaqti</b>: ${messageDate}\n\n\n 📜 <b>tekst</b>: ${msg}`, {
                    parse_mode:'HTML'
                })
                ctx.telegram.sendMessage(groupId, mentionMessage, {
                    parse_mode: 'Markdown'
                })
                ctx.replyWithHTML(`✋Salom, <b>hurmatli mijoz!</b> Xabaringiz o'chirildi 📩\n\n  ✍️Adminlarning o'zi sizga yozishadi 😊`);
            }
        })
    }
})

bot.launch().then(() => {
    console.log('Bot started');
}).catch((error) => {
    console.error('Error starting bot', error);
});