import {httpService} from '@/services/http.service.js'
// import { storageService } from '@/services/async-storage.service.js';
import { columnHelpers } from '@/services/column.helpers.js';
import { utilService } from './util.service.js';

// const KEY = 'somedayBoard';
const BASE_URL = 'board/'

export const boardService = {
    query,
    getById,
    remove,
    save,
    getEmptyBoard,
    getEmptyGroup,
    getEmptyTask,
    getEmptyFilter, // Everything under here should be in store.
    // renameBoard,
    // addToFavorites,
    // duplicateBoard,
    // updateGroup,
    // updateGroups,
    // removeGroup,
    // duplicateGroup,
    // addNewGroup,
    // updateTask,
    // addTask,
    // removeTask,
    // duplicateTask,
    // updateTasks,
};

// Board service
async function query(filterBy = {}) {

    if(!filterBy) filterBy = getEmptyFilter()

    // let boards = await httpService.get('boards', {filterBy})
    let boards = await httpService.get(BASE_URL)
    boards = boards.map((board) => {
        return { _id: board._id, title: board.title, isFavorite: board.isFavorite };
    });
    return boards;
}

async function getById(id, filterBy = { txt: '' }) {

    const board =  await httpService.get(BASE_URL + id)
    const regex = new RegExp(filterBy.txt, 'i')

    var filteredGroups = [];
    board.groups.forEach((group) => {
        if (regex.test(group.title)) {
            filteredGroups.push(group);
        } else {
            let filteredTasks = group.tasks.filter(
                (task) =>
                    regex.test(task.title) ||
                    board.columns.some((column) =>
                        regex.test(columnHelpers[column].txt(task.columns[column]))
                    )
            );

            if (filteredTasks.length) {
                group.tasks = filteredTasks;
                filteredGroups.push(group);
            }
        }
    });
    board.groups = filteredGroups;
    return board;
}

async function remove(id) {
    return await httpService.delete(BASE_URL + id)
}

// async function renameBoard(newTitle, boardId) {
//     const board = await getById(boardId);
//     board.title = newTitle;
//     return await save(board);
// }

// async function addToFavorites(boardId) {
//     const board = await getById(boardId);
//     board.isFavorite = !board.isFavorite;
//     return await save(board);
// }

async function save(board) {
    const brd = JSON.parse(JSON.stringify(board))
    // console.log('board is: \n', brd);
    if (brd._id) {
        const res = await httpService.put(BASE_URL + brd._id, brd)
        console.log('res is:\n', res);
        return res
    } else {
        return await httpService.post(BASE_URL, brd)
    }
}

// async function duplicateBoard(boardId) {
//     const duplicatedBoard = await getById(boardId);
//     duplicatedBoard.title = `Copy of ${duplicatedBoard.title}`;
//     await storageService.post(KEY, duplicatedBoard);
//     return await query();
// }

function getEmptyBoard() {
    const newBoard = JSON.parse(JSON.stringify(gBoards[0]));
    console.log(newBoard);
    newBoard.groups.forEach((group) => {
        group.id = utilService.makeId();
        group.tasks.forEach((task) => {
            task.id = utilService.makeId();
            newBoard.columns.forEach(
                (column) => (task.columns[column] = columnHelpers[column].init())
            );
        });
    });
    return newBoard;
}

function getEmptyGroup() {
    const newGroup = {
        id: utilService.makeId(),
        title: 'New group',
        createdAt: 0,
        tasks: [],
        style: {
            color: _getRandomColor(),
        },
    };
    return newGroup;
}

function getEmptyTask(currBoard) {
    const newTask = {
        id: utilService.makeId(),
        title: '',
        createdAt: 0,
        columns: {},
    };
    currBoard.columns.forEach((column) => (newTask.columns[column] = columnHelpers[column].init()));
    return newTask;
}

function getEmptyFilter() {
    return {
        txt: '',
        sortBy: 'title',
    };
}

function _getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const gBoards = [
    {
        title: 'New board',
        description: 'What is this board about...?',
        isFavorite: false,
        createdAt: Date.now(),
        createdBy: {
            _id : '60f562f7a22a0da5023ec2be',
            fullname : 'Avior Hagibor',
            imgUrl: 'https://www.w3schools.com/howto/img_avatar.png',
        },
        columns: ['status', 'date', 'delegates', 'tags'],
        groups: [
            {
                id: 'g101',
                title: 'Group I',
                tasks: [
                    {
                        id: 't101',
                        title: 'Item I',
                        createdAt: Date.now(),
                        columns: {
                            delegates: [
                            ],
                            status: { id: 's000', txt: '', color: '#c4c4c4' },
                            date: Date.now(),
                            tags: ['UI', 'DB'],
                        },
                    },
                    {
                        id: 't102',
                        title: 'Item II',
                        createdAt: Date.now(),
                        columns: {
                            delegates: [
                            ],
                            status: { id: 's000', txt: '', color: '#c4c4c4' },
                            date: Date.now(),
                            tags: ['front-end'],
                        },
                    },
                    {
                        id: 't103',
                        title: 'Item III',
                        createdAt: Date.now(),
                        columns: {
                            delegates: [
                            ],
                            status: { id: 's000', txt: '', color: '#c4c4c4' },
                            date: Date.now(),
                            tags: [],
                        },
                    },
                ],
                style: {
                    color: '#232323',
                },
            },
            {
                id: 'g201',
                title: 'Group II',
                tasks: [
                    {
                        id: 't201',
                        title: 'Item IV',
                        createdAt: Date.now(),
                        columns: {
                            delegates: [
                            ],
                            status: { id: 's000', txt: '', color: '#c4c4c4' },
                            date: Date.now(),
                            tags: [],
                        },
                    },
                    {
                        id: 't202',
                        title: 'Item V',
                        createdAt: Date.now(),
                        columns: {
                            delegates: [
                            ],
                            status: { id: 's000', txt: '', color: '#c4c4c4' },
                            date: Date.now(),
                            tags: ['UI'],
                        },
                    },
                    {
                        id: 't203',
                        title: 'Item VI',
                        createdAt: Date.now(),
                        columns: {
                            delegates: [
                            ],
                            status: { id: 's000', txt: '', color: '#c4c4c4' },
                            date: Date.now(),
                            tags: [],
                        },
                    },
                    {
                        id: 't204',
                        title: 'Item VII',
                        createdAt: Date.now(),
                        columns: {
                            delegates: [
                            ],
                            status: { id: 's000', txt: '', color: '#c4c4c4' },
                            date: Date.now(),
                            tags: [],
                        },
                    },
                ],
                style: {
                    color: '#232323',
                },
            },
        ],
        members: [
            {
                _id : '60f562f7a22a0da5023ec2be',
                fullname: 'Avior Hagibor',
                imgUrl: 'https://www.w3schools.com/howto/img_avatar.png',
            },
        ],
        statuses: [
            { id: 's001', txt: 'Done', color: '#33d391' },
            { id: 's002', txt: 'In progress', color: '#fdbc64' },
            { id: 's003', txt: 'Stuck', color: '#e8697d' },
            { id: 's000', txt: '', color: '#c4c4c4' }, // unspecified - default
        ],
        tags: ['front-end', 'back-end', 'UI', 'DB'],
        styles: {},
        activities: [],
    },
];

// function _createInitialData() {
//     localStorage.setItem(KEY, JSON.stringify(gBoards));
//     return gBoards;
// }
