import { boardService } from '@/services/board.service.js';

export const boardStore = {
    strict: true,
    state: {
        boards: [],
        currBoard: null,
    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards;
        },
        loadBoard(state, { board }) {
            state.currBoard = board;
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
            console.log('in store: filterBoard =', filteredBoard);
            state.currBoard = filteredBoard;
        },
    },
    actions: {
        async loadBoards(context) {
            const boards = await boardService.query();
            context.commit({ type: 'setBoards', boards });
            // .then(boards => context.commit({type: 'setBoards', boards}))
        },
        async loadBoard(context, { boardId }) {
            const board = await boardService.getById(boardId);
            context.commit({ type: 'loadBoard', board });
        },
        async saveBoard(context, { board }) {
            const newBoard = await boardService.save(board);
            await context.dispatch({ type: 'loadBoards' });

            context.commit({ type: 'loadBoard', board: newBoard });
        },
        async updateBoardName(context, { newTitle, boardId }) {
            const updateBoard = await boardService.renameBoard(newTitle, boardId);
            context.commit({ type: 'updateBoard', updateBoard });
        },
        async removeBoard(context, { boardId }) {
            console.log('boardId :>> ', boardId);
            await boardService.remove(boardId);
            context.commit({ type: 'removeBoard', boardId });
            // .then(() => context.commit({type: 'removeBoard', boardId}))
        },
        async addToFavorites(context, { boardId }) {
            const updateBoard = await boardService.addToFavorites(boardId);
            context.commit({ type: 'updateBoard', updateBoard });
        },
        async duplicateBoard(context, { boardId }) {
            const boards = await boardService.duplicateBoard(boardId);
            context.commit({ type: 'setBoards', boards });
            // context.loadBoards();
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
    },
    getters: {
        boards(state) {
            return state.boards;
        },
        currBoard(state) {
            return state.currBoard;
        },
        getEmptyTask(state) {
            return boardService.getEmptyTask(state.currBoard);
        },
    },
};
