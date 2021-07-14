import {boardService} from '@/services/board.service.js'

export const boardStore = {
    state: {
        boards: [],
        filterBy: null,
    },
    mutations: {
        setBoards(state, {boards}){
            state.boards = boards
        },
        removeBoard(state, {boardId}){
            const idx = state.boards.findIndex(board => board._id === boardId)
            state.boards.splice(idx,1)
        },
        setFilter(state, {filterBy}){
            state.filterBy = {...filterBy}
        },
        // addReview(state, {review}){
        //     const idx = state.boards.findIndex(board => board._id === review.boardId)
        //     if(!state.boards[idx].reviews) state.boards[idx].reviews = []
        //     delete review.boardId
        //     state.boards[idx].reviews.push(review)
        // },
    },
    actions: {
        async loadBoards(context){
            const boards = await boardService.query()
            context.commit({type: 'setBoards', boards})
            // .then(boards => context.commit({type: 'setBoards', boards}))
        },
        async saveBoard(context, {board}){
            await boardService.save(board)
            context.dispatch({type: 'loadBoards'})
                // .then(() => context.dispatch({type: 'loadBoards'}))
        },
        async removeBoard(context, {boardId}){
            await boardService.remove(boardId)
            context.commit({type: 'removeBoard', boardId})
                // .then(() => context.commit({type: 'removeBoard', boardId}))
        },
        async setFilter(context, {filterBy}){
            const boards = await boardService.query(filterBy)
            context.commit({type: 'setBoards', boards})
                // .then(boards => context.commit({type: 'setBoards', boards}))
        },
        // async addReview(context, {review}){
        //     review = await reviewService.addReview(review)
        //     context.commit({type: 'addReview', review})
        // },
    },
    getters: {
        boards(state){
            return state.boards 
        }
    },
}
