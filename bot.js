const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./option')
const token = '5589562856:AAG4bh0tkcbwskO-NU8jlZCV8Qi-zlDsAaM'

const bot = new TelegramApi(token, {polling: true})

const chats = {}



const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'угадай насколько я тебя люблю от 0 до 9')
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'отгадывай давай', gameOptions);
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description:'начало'},
        {command: '/game', description:'давай сыграем'},
        {command: '/word', description:'твои любимые слова'},
        {command: '/goodmorning', description:'с добрым утром'},
        {command: '/goodnight', description:'спокойной ночи'},
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if( text === '/goodnight') {
            await bot.sendMessage(chatId, `спокойной ночи, мелочь пузатая`)
            return bot.sendSticker(chatId, 'https://chpic.su/_data/archived/stickers/s/ss/ssheart.webp')
        }

        if( text === '/goodmorning') {
            await bot.sendMessage(chatId, `доброе утро, наконец-то моё солнце проснулось`)
            return bot.sendSticker(chatId, 'https://chpic.su/_data/archived/stickers/s/ss/ssheart.webp')
        }

        if( text === '/word') {
            return bot.sendMessage(chatId, `не хата, а ДОМ! \n не лягти, а ЛЕЧЬ! \n не ишла а ШЛА! \n не бо, а ПОТОМУ ЧТО! \n не тута, а ТУТ!`)
        }
    
        if(text === '/start') {
            await bot.sendMessage(chatId, `привет моя любимая ${msg.from.first_name}`)
            return bot.sendSticker(chatId, 'https://chpic.su/_data/archived/stickers/s/ss/ssheart.webp')
        }
        if(text === '/game') {
            return startGame(chatId);
        }
       return bot.sendMessage(chatId, 'такую функцию я не придумал, зай')
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;


        if(data === '/again') {
            return startGame(chatId)
        }


        if(data === chats[chatId]) {
            return await bot.sendMessage(chatId, `Ты отгадала цифру ${chats[chatId]}`, againOptions)
        } else {
            return await bot.sendMessage(chatId, `Ты не отгадала, Макарчик тебя любит на  ${chats[chatId]} из 9`, againOptions)
        }
       
      
    })
}

start();