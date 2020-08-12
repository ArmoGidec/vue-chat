import mock from '../mock.js';

const chatDb = [
    {
        id: '2725a680b8d240c011dd2243',
        subject: 'Простой запрос',
        created: '2019-08-01 23:59',
        parts: [
            {
                id: 1,
                author: '5725a680b3249760ea21de52',
                text: 'Привет, как дела?',
                created: '2019-08-01 23:59'
            },
            {
                id: 2,
                author: '5725a680606588342058356d',
                created: '2019-08-02 01:20',
                text: 'Привет, все хорошо, спасибо!'
            },
            {
                id: 3,
                author: '5725a680606588342058356d',
                created: '2019-08-02 05:20',
                text: 'А у тебя?'
            }
        ]
    },
    {
        id: '1725a680b3249760ea21de52',
        subject: 'Вопрос по домену',
        created: '2016-03-02 14:19',
        parts: [
            {
                id: 1,
                author: '5725a68009e20d0a9e9acf2a',
                created: '2019-08-06 12:20',
                text: 'Здравствуйте, тут есть кто-нибудь?'
            },
            {
                id: 2,
                author: '5725a680b3249760ea21de52',
                created: '2019-08-06 12:34',
                text: 'Да, я вас слушаю!'
            },
            {
                id: 3,
                author: '5725a68009e20d0a9e9acf2a',
                created: '2019-08-06 12:38',
                text: 'Помогите мне настроить домен!'
            }
        ]
    }
];

mock.onGet('/api/chat').reply(() => [
    200,
    chatDb.map(chat => {
        const { parts, ...attrs } = chat;
        return {
            ...attrs,
            part: parts[0].text
        };
    })
]);

mock.onGet(/\/api\/chat\/\w+/).reply(config => {
    const chatId = config.url.replace('/chat/', '');
    return [200, chatDb.find(({ id }) => id === chatId)];
});

mock.onPost(/\/api\/chat\/\w+/).reply(config => {
    const chatId = config.url.replace('/chat/', '');
    const index = chatDb.findIndex(({ id }) => id === chatId);
    const parts = chatDb[index].parts;
    
    const { message, author } = JSON.parse(config.data);
    const newChatId = parts.length + 1;
    const created = new Date();
    const part = {
        text: message,
        author,
        id: newChatId,
        created
    };
    chatDb[index].parts = parts.concat(part)
    return [201, part];
});
