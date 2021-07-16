import { boardService } from '@/services/board.service.js';

export const boardStore = {
    strict: true,
    state: {
        boards: [],
        filterBy: null,
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
        setFilter(state, { filterBy }) {
            state.filterBy = { ...filterBy };
        },
        updateBoard(state, { updateBoard }) {
            const idx = state.boards.findIndex((board) => board._id === updateBoard._id);
            state.boards.splice(idx, 1, updateBoard);
            state.currBoard = updateBoard;
            console.log('state.currBoard.groups', state.currBoard.groups);
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
        async removeBoard(context, { boardId }) {
            await boardService.remove(boardId);
            context.commit({ type: 'removeBoard', boardId });
            // .then(() => context.commit({type: 'removeBoard', boardId}))
        },
        async setFilter(context, { filterBy }) {
            const boards = await boardService.query(filterBy);
            context.commit({ type: 'setBoards', boards });
            // .then(boards => context.commit({type: 'setBoards', boards}))
        },
        async updateTask(context, { task, groupIdx }) {
            const updateBoard = await boardService.updateTask(
                task,
                groupIdx,
                context.state.currBoard._id
            );
            context.commit({ type: 'updateBoard', updateBoard });
        },
        async addTask(context, { task, groupIdx }) {
            const updateBoard = await boardService.addTask(
                task,
                groupIdx,
                context.state.currBoard._id
            );

            context.commit({ type: 'updateBoard', updateBoard });
        }, 
         async duplicateTask(context,  { task, groupIdx }) {
            const updateBoard = await boardService.duplicateTask(
                task,groupIdx,
                context.state.currBoard._id
            );
            context.commit({ type: 'updateBoard', updateBoard });
        },
        async removeTask(context, { task, groupIdx }) {
            const updateBoard = await boardService.removeTask(
                task,
                groupIdx,
                context.state.currBoard._id
            );

            context.commit({ type: 'updateBoard', updateBoard });
        }, 
          async saveTasks(context, {saveTasks,groupIdx}) {
            const updateBoard = await boardService.updateTasks(saveTasks, context.state.currBoard._id,groupIdx);
            context.commit({ type: 'updateBoard', updateBoard });
        },
        async updateGroupName(context, { updatedGroup }) {
            const updateBoard = await boardService.updateGroup(
                updatedGroup,
                context.state.currBoard
            );
            context.commit({ type: 'updateBoard', updateBoard });
        },
        async removeGroup(context, { group }) {
            const updateBoard = await boardService.removeGroup(group, context.state.currBoard);
            context.commit({ type: 'updateBoard', updateBoard });
        },
        async duplicateGroup(context, { duplicatedGroup }) {
            const updateBoard = await boardService.duplicateGroup(
                duplicatedGroup,
                context.state.currBoard
            );
            context.commit({ type: 'updateBoard', updateBoard });
        },
        async updateGroup(context, { group }) {
            const updateBoard = await boardService.updateGroup(group, context.state.currBoard);
            context.commit({ type: 'updateBoard', updateBoard });
        },
        async addNewGroup(context) {
            const updateBoard = await boardService.addNewGroup(context.state.currBoard._id);
            console.log('updateBoard :>> ', updateBoard);
            context.commit({ type: 'updateBoard', updateBoard });
        },

        async saveGroups(context, {updatedGroups}) {
            const updateBoard = await boardService.updateGroups(updatedGroups, context.state.currBoard);
            context.commit({ type: 'updateBoard', updateBoard });
        },
        // async addReview(context, {review}){
        //     review = await reviewService.addReview(review)
        //     context.commit({type: 'addReview', review})
        // },
    },
    getters: {
        boards(state) {
            return state.boards;
        },
        currBoard(state) {
            return state.currBoard;
        },
        getTask(){
    
        }
    },
};
