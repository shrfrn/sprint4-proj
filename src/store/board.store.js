import { boardService } from '@/services/board.service.js';

export const boardStore = {
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
            console.log('board MUTATION :>> ', board);
            state.currBoard = board;
        },
        removeBoard(state, { boardId }) {
            const idx = state.boards.findIndex((board) => board._id === boardId);
            state.boards.splice(idx, 1);
        },
        setFilter(state, { filterBy }) {
            state.filterBy = { ...filterBy };
        },
        // addReview(state, {review}){
        //     const idx = state.boards.findIndex(board => board._id === review.boardId)
        //     if(!state.boards[idx].reviews) state.boards[idx].reviews = []
        //     delete review.boardId
        //     state.boards[idx].reviews.push(review)
        // },
    },
    actions: {
        async loadBoards(context) {
            const boards = await boardService.query();
            context.commit({ type: 'setBoards', boards });
            // .then(boards => context.commit({type: 'setBoards', boards}))
        },
        async loadBoard(context, { boardId }) {
            console.log('boardId STORE :>> ', boardId);
            const board = await boardService.getById(boardId);
            console.log('board STORE :>> ', board);
            context.commit({ type: 'loadBoard', board });
        },
        async saveBoard(context, { board }) {
            await boardService.save(board);
            context.dispatch({ type: 'loadBoards' });
            // .then(() => context.dispatch({type: 'loadBoards'}))
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
     async updateTask(context,{task,groupIdx}){
     
         const idx=context.state.currBoard.groups[groupIdx].tasks.findIndex(taskToCheck=>{
          return  taskToCheck.id===task.id;
         })
         context.state.currBoard.groups[groupIdx].tasks[idx]=task;
         console.log( context.state.currBoard.groups[groupIdx].tasks[idx]);
         await  context.dispatch( { type: 'saveBoard',board: context.state.currBoard });
     },
     async addTask(context,{task,groupIdx}){
        context.state.currBoard.groups[groupIdx].tasks.push(task);
        await context.dispatch( { type: 'saveBoard',board: context.state.currBoard });
          
     }
    },
    getters: {
        boards(state) {
            return state.boards;
        },
        currBoard(state) {
            return state.currBoard;
        },
    },
};
