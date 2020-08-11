import mock from '../mock.js';

const usersDB = [
    {
        id: '5725a680b3249760ea21de52',
        name: 'Василий'
    },
    {
        id: '5725a680606588342058356d',
        name: 'Петр'
    },
    {
        id: '5725a68009e20d0a9e9acf2a',
        name: 'Александр'
    }
];

const meId = usersDB[0].id;

mock.onGet('/api/user/me').reply(() => [200, usersDB.find(({ id }) => id === meId)]);

mock.onGet('/api/user').reply(() => [200, usersDB.filter(({ id }) => id !== meId )]);