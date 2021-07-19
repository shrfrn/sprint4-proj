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
        // async updateTask(context, { task, groupId }) {
        //     const updateBoard = await boardService.updateTask(
        //         task,
        //         groupId,
        //         context.state.currBoard._id
        //     );
        //     context.commit({ type: 'updateBoard', updateBoard });
        // },
        // async addTask(context, { task, groupId }) {
        //     const updateBoard = await boardService.addTask(
        //         task,
        //         groupId,
        //         context.state.currBoard._id
        //     );

        //     context.commit({ type: 'updateBoard', updateBoard });
        // },
        // async duplicateTask(context, { task, groupId }) {
        //     const updateBoard = await boardService.duplicateTask(
        //         task,
        //         groupId,
        //         context.state.currBoard._id
        //     );
        //     context.commit({ type: 'updateBoard', updateBoard });
        // },
        // async removeTask(context, { task, groupId }) {
        //     const updateBoard = await boardService.removeTask(
        //         task,
        //         groupId,
        //         context.state.currBoard._id
        //     );

        //     context.commit({ type: 'updateBoard', updateBoard });
        // },
        // async saveTasks(context, { saveTasks, groupId }) {
        //     const updateBoard = await boardService.updateTasks(
        //         saveTasks,
        //         context.state.currBoard._id,
        //         groupId
        //     );
        //     context.commit({ type: 'updateBoard', updateBoard });
        // },
        // async updateGroupName(context, { updatedGroup }) {
        //     const updateBoard = await boardService.updateGroup(
        //         updatedGroup,
        //         context.state.currBoard
        //     );
        //     context.commit({ type: 'updateBoard', updateBoard });
        // },
        // async removeGroup(context, { group }) {
        //     const updateBoard = await boardService.removeGroup(group, context.state.currBoard);
        //     context.commit({ type: 'updateBoard', updateBoard });
        // },
        // async duplicateGroup(context, { group }) {
        //     const groupCopy = JSON.parse(JSON.stringify(group))
        //     console.log('group copy ok');
        //     let boardCopy = JSON.parse(JSON.stringify(context.getters.currBoard))
        //     console.log('board copy ok');
        //     boardCopy.groups.push(groupCopy)
        //     await boardService.save(boardCopy)
        //     context.commit({ type: 'loadBoard', boardCopy });
        // },
        // async duplicateGroup(context, { duplicatedGroup }) {
        //     const updateBoard = await boardService.duplicateGroup(
        //         duplicatedGroup,
        //         context.state.currBoard
        //     );
        //     context.commit({ type: 'updateBoard', updateBoard });
        // },
        // async updateGroup(context, { group }) {
        //     const updateBoard = await boardService.updateGroup(group, context.state.currBoard);
        //     context.commit({ type: 'updateBoard', updateBoard });
        // },
        // async addNewGroup(context) {
        //     const updateBoard = await boardService.addNewGroup(context.state.currBoard._id);
        //     console.log('updateBoard :>> ', updateBoard);
        //     context.commit({ type: 'updateBoard', updateBoard });
        // },

        // async saveGroups(context, { updatedGroups }) {
        //     const updateBoard = await boardService.updateGroups(
        //         updatedGroups,
        //         context.state.currBoard
        //     );
        //     context.commit({ type: 'updateBoard', updateBoard });
        // },
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
