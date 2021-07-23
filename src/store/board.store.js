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
        addActivity(state, { activity }) {
            state.currBoard.activities.unshift(activity);
            console.log('about to emit task-updated');
            socketService.emit('task-updated', activity);
        },
        setUpdate(state, { itemId, txt }) {
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
        removeUpdate(state, { updateId }) {
            const idx = state.currBoard.updates.findIndex((update) => {
                return update.id === updateId;
            });
            state.currBoard.updates.splice(idx, 1);
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
                socketService.emit('board-list-updated');
            } catch (err) {
                console.log('couldnt save board', err);
            }
        },
        async removeBoard(context, { boardId }) {
            await boardService.remove(boardId);
            context.commit({ type: 'removeBoard', boardId });
            socketService.emit('board-list-updated');
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
                socketService.emit('board-list-updated');
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
        },
        async setFilterList(context, { filterBy }) {
            try {
                const filteredBoards = await boardService.query(filterBy);
                context.commit({ type: 'setFilterList', filteredBoards });
            } catch (err) {
                console.log('couldnt filtered', err);
            }
        },
        async addActivity(context, { activity }) {
            activity = await boardService.addActivity(activity);
            context.commit({ type: 'addActivity', activity });
        },
        async toggleUpdateLike(context, { id }) {
            context.commit({ type: 'toggleLike', id });
            context.dispatch({ type: 'saveBoard', board: context.getters.currBoard });
        },
        async logout(context) {
            console.log('logout');
            await userService.logout();
            context.commit({ type: 'setLoggedinUser' });
        },
        async saveUser(context, { user }) {
            await userService.update(user);
            console.log(context);
        },
        async removeUpdate(context, { updateId }) {
            context.commit({ type: 'removeUpdate', updateId });
            await context.dispatch({ type: 'saveBoard', board: context.getters.currBoard });
        },
    },
    getters: {
        getLoggedinUser(state) {
            return state.loggedinUser || { _id: 'u101', fullname: 'Guest user', imgUrl: '' };
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
