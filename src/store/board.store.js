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
            state.currBoard = filteredBoard;
        },
        setFilterList(state, { filteredBoards }) {
            state.boards = filteredBoards;
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
        // async updateBoardName(context, { newTitle, boardId }) {
        //     const updateBoard = await boardService.renameBoard(newTitle, boardId);
        //     context.commit({ type: 'updateBoard', updateBoard });
        // },
        async removeBoard(context, { boardId }) {
            console.log('boardId :>> ', boardId);
            await boardService.remove(boardId);
            context.commit({ type: 'removeBoard', boardId });
            // .then(() => context.commit({type: 'removeBoard', boardId}))
        },
        // async addToFavorites(context, { boardId }) {
        //     const updateBoard = await boardService.addToFavorites(boardId);
        //     context.commit({ type: 'updateBoard', updateBoard });
        // },
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
        async setFilterList(context, { filterBy }) {
            try {
                const filteredBoards = await boardService.query(filterBy);
                context.commit({ type: 'setFilterList', filteredBoards });
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
