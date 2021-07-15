// import {httpService} from '@/services/http.service.js'
import { storageService } from '@/services/async-storage.service.js';
import { utilService } from './util.service.js';

const KEY = 'somedayBoard';
export const boardService = {
    query,
    getById,
    remove,
    save,
    // getEmptyToy,
    getEmptyFilter,
    updateGroup,
    removeGroup,
    duplicateGroup,
};

// Board service

// async function query(filterBy) {
async function query() {
    // _createInitialData();
    // if(!filterBy) filterBy = getEmptyFilter()
    let boards = await storageService.query(KEY);
    if (!boards || boards.length === 0) boards = _createInitialData();

    boards = boards.map((board) => {
        return { _id: board._id, title: board.title };
    })
    return boards;
    // return await httpService.get('toy', {filterBy})
}

async function getById(id) {
    return await storageService.get(KEY, id);
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

// function getEmptyToy() {
//     return {
//         name: '',
//         price: '',
//         type: '',
//         createdAt: '',
//         inStock: true,
//     }
// }

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
                            delegates: ['Bobby', 'Puki', 'Baba', 'Nachi'],
                            status: { txt: 'In progress', color: '#999598' },
                            date: Date.now(),
                        },
                    },
                    {
                        id: 't102',
                        title: 'Board details',
                        createdAt: Date.now(),
                        columns: {
                            delegates: ['Puki'],
                            status: { txt: 'Done', color: '#235467' },
                            date: Date.now(),
                        },
                    },
                    {
                        id: 't103',
                        title: 'Chat / Activities',
                        createdAt: Date.now(),
                        columns: {
                            delegates: ['Bobby', 'Puki'],
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
                            delegates: ['Bobby', 'Puki'],
                            status: { txt: 'Done', color: '#235467' },
                            date: Date.now(),
                        },
                    },
                    {
                        id: 't202',
                        title: 'group list',
                        createdAt: Date.now(),
                        columns: {
                            delegates: ['Puki'],
                            status: { txt: 'Done', color: '#235467' },
                            date: Date.now(),
                        },
                    },
                    {
                        id: 't203',
                        title: 'group preview',
                        createdAt: Date.now(),
                        columns: {
                            delegates: ['Bobby'],
                            status: { txt: 'In progress', color: '#999598' },
                            date: Date.now(),
                        },
                    },
                    {
                        id: 't204',
                        title: 'task preview',
                        createdAt: Date.now(),
                        columns: {
                            delegates: ['Bobby', 'Puki'],
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
            { _id: 'u101', fullname: 'AK' },
            { _id: 'u102', fullname: 'RV' },
            { _id: 'u103', fullname: 'SF' },
        ],
        styles: {},
    },
];

function _createInitialData() {
    localStorage.setItem(KEY, JSON.stringify(gBoards));
    return gBoards;
}
