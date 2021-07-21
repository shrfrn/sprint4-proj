import { boardService } from '@/services/board.service.js';
import { userService } from '../services/user.service';
import { socketService } from '@/services/socket.service.js';

export const boardStore = {
    strict: true,
    state: {
        boards: [],
        currBoard: null,
        loggedinUser: null,
    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards;
        },
        loadBoard(state, { board }) {
            state.currBoard = board;
        },
        setLoggedinUser(state) {
            state.loggedinUser = userService.getLoggedinUser();
            console.log('state.loggedinUser', state.loggedinUser);
        },
        removeBoard(state, { boardId }) {
            const idx = state.boards.findIndex((board) => board._id === boardId);
            state.boards.splice(idx, 1);
        },
        updateBoard(state, { updateBoard }) {
            const idx = state.boards.findIndex((board) => board._id === updateBoard._id);
            state.boards.splice(idx, 1, updateBoard);
            state.currBoard = updateBoard;
            console.log('state.currBoard.groups', state.currBoard.groups);
        },
        setFilter(state, { filteredBoard }) {
            state.currBoard = filteredBoard;
        },
        setActivity(state, { itemId, itemName, typeActivity, msg }) {
            const activity = boardService.getEmptyActivity();
            activity.itemId = itemId;
            activity.itemName = itemName;
            activity.createdAt = Date.now();
            activity.createdBy = state.loggedinUser || {
                _id: 'u101',
                fullname: 'Guest user',
                imgUrl: '',
            };
            activity.type = typeActivity;
            activity.msg = msg;
            state.currBoard.activities.unshift(activity);
            console.log(' state.currBoard.activities', state.currBoard.activities);
        },
        setUpdate(state, { itemId, txt }) {
            console.log('stste', state);
            const update = boardService.getEmptyUpdate();
            update.createdAt = Date.now();
            update.itemId = itemId;
            update.createdBy = state.loggedinUser || {
                _id: 'u101',
                fullname: 'Guest user',
                imgUrl: '',
            };
            update.txt = txt;
            if (state.currBoard.updates) state.currBoard.updates.unshift(update);
            else state.currBoard['updates'] = [update];
            console.log('state.currBoard.updates', state.currBoard.updates);
        },
        setFilterList(state, { filteredBoards }) {
            state.boards = filteredBoards;
        },
        toggleLike(state, { id }) {
            console.log('id', id);
            const updateIdx = state.currBoard.updates.findIndex((update) => {
                return update.id === id;
            });
            console.log('updateIdx', updateIdx);
            const userToToggle = state.loggedinUser || {
                _id: 'u101',
                fullname: 'Guest user',
                imgUrl: '',
            };
            console.log('userToToggle', userToToggle);
            console.log('state.currBoard.updates', state.currBoard.updates[updateIdx]);
            const userIdx = state.currBoard.updates[updateIdx].likedBy.findIndex((user) => {
                return user._id === userToToggle._id;
            });
            if (userIdx === -1) state.currBoard.updates[updateIdx].likedBy.push(userToToggle);
            else state.currBoard.updates[updateIdx].likedBy.splice(userIdx, 1);
        },
        setColumns(state, { columns }) {
            state.currBoard.columns = columns;
        },
    },
    actions: {
        async loadBoards(context) {
            const boards = await boardService.query();
            context.commit({ type: 'setBoards', boards });
        },
        async loadBoard(context, { boardId }) {
            const board = await boardService.getById(boardId);
            context.commit({ type: 'loadBoard', board });
        },
        async saveBoard(context, { board }) {
            const newBoard = await boardService.save(board);
            await context.dispatch({ type: 'loadBoards' });

            context.commit({ type: 'loadBoard', board: newBoard });
            console.log('about to emit board change');
            socketService.emit('board-updated', board);
        },
        async saveMiniBoard(context, { miniBoard }) {
            try {
                let boardCopy;

                if (miniBoard._id === context.getters.currBoard._id) {
                    boardCopy = JSON.parse(JSON.stringify(context.getters.currBoard));
                } else {
                    boardCopy = await boardService.getById(miniBoard._id);
                }
                boardCopy.title = miniBoard.title;
                boardCopy.description = miniBoard.description;
                boardCopy.isFavorite = miniBoard.isFavorite;

                const newBoard = await boardService.save(boardCopy);
                await context.dispatch({ type: 'loadBoards' });
                context.commit({ type: 'loadBoard', board: newBoard });
            } catch (err) {
                console.log('couldnt save board', err);
            }
        },
        async removeBoard(context, { boardId }) {
            console.log('boardId :>> ', boardId);
            await boardService.remove(boardId);
            context.commit({ type: 'removeBoard', boardId });
        },
        async duplicateBoard(context, { boardId }) {
            try {
                const boardCopy = await boardService.getById(boardId);

                delete boardCopy._id;
                boardCopy.title = 'Copy of ' + boardCopy.title;

                const newBoard = await boardService.save(boardCopy);
                await context.dispatch({ type: 'loadBoards' });
                // context.commit({ type: 'setBoards', boards });
                context.commit({ type: 'loadBoard', board: newBoard });
            } catch (err) {
                console.log('couldnt duplicate board', err);
            }
        },
        async setFilter(context, { filterBy }) {
            try {
                const filteredBoard = await boardService.getById(
                    context.state.currBoard._id,
                    filterBy
                );
                context.commit({ type: 'setFilter', filteredBoard });
            } catch (err) {
                console.log('couldnt filtered', err);
            }
        },
        async saveUpdate(context, { itemId, txt }) {
            context.commit({ type: 'setUpdate', itemId, txt });
            const boardCopy = await boardService.save(context.getters.currBoard);
            context.commit({ type: 'loadBoard', board: boardCopy });
            console.log('succccccccccc');
        },
        async setFilterList(context, { filterBy }) {
            try {
                const filteredBoards = await boardService.query(filterBy);
                context.commit({ type: 'setFilterList', filteredBoards });
            } catch (err) {
                console.log('couldnt filtered', err);
            }
        },
        async toggleUpdateLike(context, { id }) {
            context.commit({ type: 'toggleLike', id });
            context.dispatch({ type: 'saveBoard', board: context.getters.currBoard });
        },
    },
    getters: {
        getLoggedinUser(state) {
            return state.loggedinUser;
        },
        boards(state) {
            return state.boards;
        },
        currBoard(state) {
            return state.currBoard;
        },
        getEmptyTask(state) {
            return boardService.getEmptyTask(state.currBoard);
        },
        getEmptyUpdate() {
            return boardService.getEmptyUpdate();
        },
        getActivitiesByItem: (state) => (itemId) => {
            return state.currBoard.activities.filter((activity) => {
                return activity.itemId === itemId;
            });
        },
        getUpdatesByItem: (state) => (itemId) => {
            if (state.currBoard.updates) {
                return state.currBoard.updates.filter((update) => {
                    return update.itemId === itemId;
                });
            } else {
                state.currBoard['updates'] = [];
                return state.currBoard.updates;
            }
        },
    },
};
