// import {httpService} from '@/services/http.service.js'
import { storageService } from '@/services/async-storage.service.js';
const KEY = 'somedayBoard';
export const boardService = {
    query,
    getById,
    remove,
    save,
    // getEmptyToy,
    getEmptyFilter,
};

// Board service

// async function query(filterBy) {
async function query() {
    // if(!filterBy) filterBy = getEmptyFilter()
    let boards = await storageService.get(KEY);
    if (!boards || boards.length === 0) boards = _createInitialData();

    boards = boards.map((board) => {
        return { _id: board._id, title: board.title };
    });
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
        groups: [
            {
                id: 'g101',
                title: 'Views',
                tasks: [
                    {
                        id: 't101',
                        title: 'Board list',
                        createdAt: Date.now(),
                    },
                    {
                        id: 't102',
                        title: 'Board details',
                        createdAt: Date.now(),
                    },
                    {
                        id: 't103',
                        title: 'Chat / Activities',
                        createdAt: Date.now(),
                    },
                ],
            },
            {
                id: 'g201',
                title: 'Components',
                tasks: [
                    {
                        id: 't201',
                        title: 'Board preview',
                        createdAt: Date.now(),
                    },
                    {
                        id: 't202',
                        title: 'group list',
                        createdAt: Date.now(),
                    },
                    {
                        id: 't203',
                        title: 'group preview',
                        createdAt: Date.now(),
                    },
                    {
                        id: 't204',
                        title: 'task preview',
                        createdAt: Date.now(),
                    },
                ],
            },
        ],
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
        groups: [
            {
                id: 'g102',
                title: 'Services',
                tasks: [
                    {
                        id: 't1011',
                        title: 'Board service',
                        createdAt: Date.now(),
                    },
                    {
                        id: 't1021',
                        title: 'Socket details',
                        createdAt: Date.now(),
                    },
                    {
                        id: 't1031',
                        title: 'User Service',
                        createdAt: Date.now(),
                    },
                ],
            },
            {
                id: 'g202',
                title: 'DB',
                tasks: [
                    {
                        id: 't2011',
                        title: 'Create Mongo DB',
                        createdAt: Date.now(),
                    },
                    {
                        id: 't2021',
                        title: 'write aggrigations',
                        createdAt: Date.now(),
                    },
                    {
                        id: 't2031',
                        title: 'filter and sort',
                        createdAt: Date.now(),
                    },
                    {
                        id: 't2041',
                        title: 'Port to Atlas',
                        createdAt: Date.now(),
                    },
                ],
            },
        ],
        members: [
            { _id: 'u101', fullname: 'AK' },
            { _id: 'u102', fullname: 'RV' },
            { _id: 'u103', fullname: 'SF' },
        ],
    },
];

function _createInitialData() {
    localStorage.setItem(KEY, JSON.stringify(gBoards));
    return gBoards;
}
