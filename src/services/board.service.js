// import {httpService} from '@/services/http.service.js'
import { storageService } from '@/services/async-storage.service.js';
import { utilService } from './util.service.js';

const KEY = 'somedayBoard';
export const boardService = {
    query,
    getById,
    remove,
    save,
    getEmptyBoard,
    getEmptyFilter,
    updateGroup,
    updateGroups,
    removeGroup,
    duplicateGroup,
    addNewGroup,
    updateTask,
    addTask,
    removeTask,
    duplicateTask,
    updateTasks,
    getEmptyTask
};

// Board service
async function query() {
    // _createInitialData();
    // if(!filterBy) filterBy = getEmptyFilter()
    let boards = await storageService.query(KEY);
    if (!boards || boards.length === 0) boards = _createInitialData();

    boards = boards.map((board) => {
        return { _id: board._id, title: board.title };
    });
    return boards;
    // return await httpService.get('toy', {filterBy})
}

async function getById(id, filterBy = { txt: '' }) {
    const board = await storageService.get(KEY, id);
    const regex = new RegExp(filterBy.txt, 'i');

    var filteredGroups = [];
    board.groups.forEach((group) => {
        if (regex.test(group.title)) {
            filteredGroups.push(group);
        } else {
            let filteredTasks = group.tasks.filter((task) => regex.test(task.title));
            if (filteredTasks.length) {
                filteredGroups.tasks = filteredTasks;
                filteredGroups.push(group);
            }
        }
    });
    console.log('board After filter:>> ', board);
    board.groups = filteredGroups;
    return board;

    // group.title.toLowerCase().includes(filterBy.txt)
    // if (!filteredGroups.length)
    // board.oups = filteredGroups;
    // return await storageService.get(KEY, id);
    // return await httpService.get('toy/' + id)
}

async function remove(id) {
    return await storageService.delete(KEY, id);
    // return await httpService.delete('toy/' + id)
}

async function save(board) {
    if (board._id) {
        return await storageService.put(KEY, board);
        // return await httpService.put('toy/' + toy._id, toy)
    } else {
        return await storageService.post(KEY, board);
        // return await httpService.post('toy/', toy)
    }
}

async function updateGroup(updatedGroup, currBoard) {
    const board = await getById(currBoard._id);
    const idx = board.groups.findIndex((group) => group.id === updatedGroup.id);
    board.groups.splice(idx, 1, updatedGroup);
    return await storageService.put(KEY, board);
}

async function updateGroups(updatedGroups, currBoard) {
    const board = await getById(currBoard._id);
    board.groups = updatedGroups;
    return await storageService.put(KEY, board);
}

async function removeGroup(group, currBoard) {
    const board = await getById(currBoard._id);
    const idx = board.groups.findIndex((gp) => gp.id === group.id);
    board.groups.splice(idx, 1);
    return await storageService.put(KEY, board);
}

async function duplicateGroup(duplicatedGroup, currBoard) {
    duplicatedGroup.title = 'Copy of ' + duplicatedGroup.title;
    const board = await getById(currBoard._id);
    const idx = board.groups.findIndex((gp) => gp.id === duplicatedGroup.id);
    duplicatedGroup.id = utilService.makeId();
    board.groups.splice(idx + 1, 0, duplicatedGroup);
    return await storageService.put(KEY, board);
}

function getEmptyBoard() {
    const newBoard = JSON.parse(JSON.stringify(gBoards[0]));
    newBoard._id = null;
    return newBoard;
}
async function addNewGroup(boardId) {
    const newGroup = _getNewGroup();
    const board = await getById(boardId);
    board.groups.splice(0, 0, newGroup);
    return await storageService.put(KEY, board);
}

async function removeTask(task, groupIdx, currBoardId) {
    const board = await getById(currBoardId);
    console.log(board.groups);
    const idx = board.groups[groupIdx].tasks.findIndex((taskToCheck) => {
        return taskToCheck.id === task.id;
    });
    console.log(idx, 'idx');
    console.log('board.groups[groupIdx]', board.groups[groupIdx]);
    board.groups[groupIdx].tasks.splice(idx, 1);
    // console.log('board.groups[groupIdx].tasks :>> ', board.groups[groupIdx].tasks);
    return await storageService.put(KEY, board);
}
async function duplicateTask(task, groupIdx, currBoardId) {
    task.title = 'Copy of ' + task.title;
    const board = await getById(currBoardId);
    const idx = board.groups[groupIdx].tasks.findIndex((gp) => gp.id === task.id);

    task.id = utilService.makeId();
    board.groups[groupIdx].tasks.splice(idx + 1, 0, task);
    return await storageService.put(KEY, board);
}
async function updateTask(task, groupIdx, currBoardId) {
    const board = await getById(currBoardId);

    const idx = board.groups[groupIdx].tasks.findIndex((taskToCheck) => {
        return taskToCheck.id === task.id;
    });
    board.groups[groupIdx].tasks[idx] = task;
    return await storageService.put(KEY, board);
}
async function addTask(task, groupIdx, currBoardId) {
    const board = await getById(currBoardId);

    board.groups[groupIdx].tasks.push(task);

    return await storageService.put(KEY, board);
}
async function updateTasks(saveTasks, currBoardId, groupIdx) {
    const board = await getById(currBoardId);
    board.groups[groupIdx].tasks = saveTasks;
    return await storageService.put(KEY, board);
}
function getEmptyTask(){
    return {
        id: utilService.makeId(),
        title: "",
        createdAt: null,
        columns: {
          delegates: [],
          status: {},
          date: 0,
        },
      }
}

function getEmptyFilter() {
    return {
        txt: '',
        inStock: 'all',
        toyType: 'all',
        sortBy: 'name',
    };
}

// Data initailization

const gBoards = [
    {
        _id: 'b101',
        title: 'Frontend',
        description: 'This is very awesome!',
        createdAt: Date.now(),
        createdBy: {
            _id: 'u101',
            fullname: 'Muki Suflaki',
            imgUrl: 'http://some-img.jpg',
        },
        columns: ['delegates', 'date', 'status'],
        groups: [
            {
                id: 'g101',
                title: 'Views',
                tasks: [
                    {
                        id: 't101',
                        title: 'Board list',
                        createdAt: Date.now(),
                        columns: {
                            delegates: [
                                {
                                    _id: 'u103',
                                    fullname: 'Sharon Macaron',
                                    imgUrl: 'https://www.w3schools.com/howto/img_avatar.png',
                                },
                                {
                                    _id: 'u104',
                                    fullname: 'Eden Maran',
                                    imgUrl: 'https://www.w3schools.com/howto/img_avatar.png',
                                },
                            ],
                            status: { txt: 'In progress', color: '#999598' },
                            date: Date.now(),
                        },
                    },
                    {
                        id: 't102',
                        title: 'Board details',
                        createdAt: Date.now(),
                        columns: {
                            delegates: [
                                {
                                    _id: 'u103',
                                    fullname: 'Sharon Macaron',
                                    imgUrl: 'https://www.w3schools.com/howto/img_avatar.png',
                                },
                            ],
                            status: { txt: 'Done', color: '#235467' },
                            date: Date.now(),
                        },
                    },
                    {
                        id: 't103',
                        title: 'Chat / Activities',
                        createdAt: Date.now(),
                        columns: {
                            delegates: [
                                {
                                    _id: 'u103',
                                    fullname: 'Sharon Macaron',
                                    imgUrl: 'https://www.w3schools.com/howto/img_avatar.png',
                                },
                                {
                                    _id: 'u104',
                                    fullname: 'Eden Maran',
                                    imgUrl: 'https://www.w3schools.com/howto/img_avatar.png',
                                },
                            ],
                            status: { txt: 'Stuck', color: '#292929' },
                            date: Date.now(),
                        },
                    },
                ],
                style: {
                    color: '#232323',
                },
            },
            {
                id: 'g201',
                title: 'Components',
                tasks: [
                    {
                        id: 't201',
                        title: 'Board preview',
                        createdAt: Date.now(),
                        columns: {
                            delegates: [
                                {
                                    _id: 'u104',
                                    fullname: 'Eden Maran',
                                    imgUrl: 'https://www.w3schools.com/howto/img_avatar.png',
                                },
                            ],
                            status: { txt: 'Done', color: '#235467' },
                            date: Date.now(),
                        },
                    },
                    {
                        id: 't202',
                        title: 'group list',
                        createdAt: Date.now(),
                        columns: {
                            delegates: [
                                {
                                    _id: 'u105',
                                    fullname: 'Muki Bartiki',
                                    imgUrl:
                                        'https://www.iconninja.com/files/980/282/508/female-blond-avatar-person-girl-user-woman-icon.png',
                                },
                                {
                                    _id: 'u106',
                                    fullname: 'Shimi halimi',
                                    imgUrl: 'https://www.w3schools.com/howto/img_avatar.png',
                                },
                            ],
                            status: { txt: 'Done', color: '#235467' },
                            date: Date.now(),
                        },
                    },
                    {
                        id: 't203',
                        title: 'group preview',
                        createdAt: Date.now(),
                        columns: {
                            delegates: [
                                {
                                    _id: 'u105',
                                    fullname: 'Muki Bartiki',
                                    imgUrl:
                                        'https://www.iconninja.com/files/980/282/508/female-blond-avatar-person-girl-user-woman-icon.png',
                                },
                                {
                                    _id: 'u106',
                                    fullname: 'Shimi halimi',
                                    imgUrl: 'https://www.w3schools.com/howto/img_avatar.png',
                                },
                            ],
                            status: { txt: 'In progress', color: '#999598' },
                            date: Date.now(),
                        },
                    },
                    {
                        id: 't204',
                        title: 'task preview',
                        createdAt: Date.now(),
                        columns: {
                            delegates: [
                                {
                                    _id: 'u105',
                                    fullname: 'Muki Bartiki',
                                    imgUrl:
                                        'https://www.iconninja.com/files/980/282/508/female-blond-avatar-person-girl-user-woman-icon.png',
                                },
                                {
                                    _id: 'u106',
                                    fullname: 'Shimi halimi',
                                    imgUrl: 'https://www.w3schools.com/howto/img_avatar.png',
                                },
                            ],
                            status: { txt: 'Stuck', color: '#292929' },
                            date: Date.now(),
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
                _id: 'u101',
                fullname: 'Avior Hagibor',
                imgUrl: 'https://www.w3schools.com/howto/img_avatar.png',
            },
            {
                _id: 'u102',
                fullname: 'Rachel Bekarov',
                imgUrl:
                    'https://www.iconninja.com/files/980/282/508/female-blond-avatar-person-girl-user-woman-icon.png',
            },
            {
                _id: 'u103',
                fullname: 'Sharon Macaron',
                imgUrl: 'https://www.w3schools.com/howto/img_avatar.png',
            },
            {
                _id: 'u104',
                fullname: 'Eden Maran',
                imgUrl: 'https://www.w3schools.com/howto/img_avatar.png',
            },
            {
                _id: 'u105',
                fullname: 'Muki Bartiki',
                imgUrl:
                    'https://www.iconninja.com/files/980/282/508/female-blond-avatar-person-girl-user-woman-icon.png',
            },
            {
                _id: 'u106',
                fullname: 'Shimi halimi',
                imgUrl: 'https://www.w3schools.com/howto/img_avatar.png',
            },
        ],
        styles: {},
    },
    {
        _id: 'b102',
        title: 'Backend',
        description: 'This is very awesome!',
        createdAt: Date.now(),
        createdBy: {
            _id: 'u102',
            fullname: 'Bobby Balobby',
            imgUrl: 'http://some-img.jpg',
        },
        columns: ['delegates', 'status', 'date'],
        groups: [
            {
                id: 'g102',
                title: 'Services',
                tasks: [
                    {
                        id: 't1011',
                        title: 'Board service',
                        createdAt: Date.now(),
                        columns: {
                            delegates: ['Muki', 'Puki'],
                            status: { txt: 'Done', color: '#235467' },
                            date: Date.now(),
                        },
                    },
                    {
                        id: 't1021',
                        title: 'Socket details',
                        createdAt: Date.now(),
                        columns: {
                            delegates: ['Bobby', 'Puki'],
                            status: { txt: 'Done', color: '#235467' },
                            date: Date.now(),
                        },
                    },
                    {
                        id: 't1031',
                        title: 'User Service',
                        createdAt: Date.now(),
                        columns: {
                            delegates: ['Muki'],
                            status: { txt: 'Stuck', color: '#292929' },
                            date: Date.now(),
                        },
                    },
                ],
                style: {
                    color: '#323232',
                },
            },
            {
                id: 'g202',
                title: 'DB',
                tasks: [
                    {
                        id: 't2011',
                        title: 'Create Mongo DB',
                        createdAt: Date.now(),
                        columns: {
                            delegates: ['Bobby'],
                            status: { txt: 'Done', color: '#235467' },
                            date: Date.now(),
                        },
                    },
                    {
                        id: 't2021',
                        title: 'write aggrigations',
                        createdAt: Date.now(),
                        columns: {
                            delegates: ['Bobby'],
                            status: { txt: 'Stuck', color: '#292929' },
                            date: Date.now(),
                        },
                    },
                    {
                        id: 't2031',
                        title: 'filter and sort',
                        createdAt: Date.now(),
                        columns: {
                            delegates: ['Bobby', 'Puki'],
                            status: { txt: 'In progress', color: '#999598' },
                            date: Date.now(),
                        },
                    },
                    {
                        id: 't2041',
                        title: 'Port to Atlas',
                        createdAt: Date.now(),
                        columns: {
                            delegates: ['Bobby'],
                            status: { txt: 'Stuck', color: '#292929' },
                            date: Date.now(),
                        },
                    },
                ],
                style: {
                    color: '#323232',
                },
            },
        ],
        members: [
            {
                _id: 'u101',
                fullname: 'Avior Hagibor',
                imgUrl: 'https://www.w3schools.com/howto/img_avatar.png',
            },
            {
                _id: 'u102',
                fullname: 'Rachel Bekarov',
                imgUrl:
                    'https://www.iconninja.com/files/980/282/508/female-blond-avatar-person-girl-user-woman-icon.png',
            },
            {
                _id: 'u103',
                fullname: 'Sharon Macaron',
                imgUrl: 'https://www.w3schools.com/howto/img_avatar.png',
            },
            {
                _id: 'u104',
                fullname: 'Eden Maran',
                imgUrl: 'https://www.w3schools.com/howto/img_avatar.png',
            },
            {
                _id: 'u105',
                fullname: 'Muki Bartiki',
                imgUrl:
                    'https://www.iconninja.com/files/980/282/508/female-blond-avatar-person-girl-user-woman-icon.png',
            },
            {
                _id: 'u106',
                fullname: 'Shimi halimi',
                imgUrl: 'https://www.w3schools.com/howto/img_avatar.png',
            },
        ],
        styles: {},
    },
];

function _createInitialData() {
    localStorage.setItem(KEY, JSON.stringify(gBoards));
    return gBoards;
}

function _getNewGroup() {
    return {
        id: utilService.makeId(),
        title: 'New Group',
        tasks: [
            {
                id: utilService.makeId(),
                title: 'You can add the task here',
                createdAt: Date.now(),
                columns: {
                    delegates: ['Bobby'],
                    status: { txt: '', color: '#c2c2c2' },
                    date: Date.now(),
                },
            },
        ],
        style: {
            color: '#5988fa',
        },
    };
}
