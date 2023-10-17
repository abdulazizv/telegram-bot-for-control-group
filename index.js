const { Telegraf } = require('telegraf');
const config = require("config")

const token = config.get("token")
const adminId = config.get("adminId")
const bot = new Telegraf(token);

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
    if(msg && ctx.from.id !== adminId) {
        ctx.deleteMessage(messageId,chatId)
        .then(() => {
            if(username) {
                ctx.telegram.sendMessage(adminId, `👤 <b>Foydalanuvchi</b>: ${username}\n🕧 <b>Yozilgan vaqti</b>: ${messageDate}\n\n\n 📜 <b>tekst</b>: ${msg}`);
                ctx.replyWithHTML(`✋Salom, @${username}! Xabaringiz o'chirildi 📩\n\n  ✍️ Siz bu guruhga emas adminga yozing😊`);
            } else {
                ctx.telegram.sendMessage(adminId, `👤 <b>Foydalanuvchi</b>: ${firstName}\n\n 🕧<b>Yozilgan vaqti</b>: ${messageDate}\n\n\n 📜 <b>tekst</b>: ${msg}`)
                ctx.replyWithHTML(`✋Salom, <b>${firstName}!</b> Xabaringiz o'chirildi 📩\n\n  ✍️ Siz bu guruhga emas adminga yozing😊`);
            }
        })
    }
})

bot.startPolling().then(() => {
    console.log('Bot started polling successfully.');
    }).catch((error) => {
    console.error('Error starting polling:', error);
});