import { boardService } from '@/services/board.service.js';
import { userService } from '../services/user.service';
import { socketService } from '@/services/socket.service.js';
import { columnHelpers } from '@/services/column.helpers.js';

export const boardStore = {
    strict: true,
    state: {
        boards: [],
        currBoard: null,
        filteredBoard: null,
        filterBy: {
            txt: '',
        },
    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards;
        },
        loadBoard(state, { board }) {
            state.currBoard = board;
            if(state.filterBy.txt === '' ) state.filteredBoard = state.currBoard
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
        setFilter(state, { filterBy }) {
            console.log('currBoard:\n', state.currBoard);
            state.filteredBoard = JSON.parse(JSON.stringify(state.currBoard)) // ? maybe dont need this?
            state.filterBy = JSON.parse(JSON.stringify(filterBy))

            const regex = new RegExp(state.filterBy.txt, 'i')
            const filteredGroups = []
            
            state.currBoard.groups.forEach((group) => {
                if (regex.test(group.title)) {
                    filteredGroups.push(group);
                } else {
                    let filteredTasks = group.tasks.filter(
                        task =>
                            regex.test(task.title) ||
                            state.currBoard.columns.some(column =>
                                {
                                    if(column === 'date'){
                                        console.log('data in date col:', task.columns[column]);
                                        console.log('data in date as text:', columnHelpers[column].txt(task.columns[column]));
                                    }
                                    return regex.test(columnHelpers[column].txt(task.columns[column]))}
                            )
                        )
        
                    if (filteredTasks.length) {
                        const filteredGroup = JSON.parse(JSON.stringify(group))
                        filteredGroup.tasks = filteredTasks
                        filteredGroups.push(filteredGroup)
                    }
                }
            })
            state.filteredBoard.groups = filteredGroups
        },
        addActivity(state, { activity }) {
            state.currBoard.activities.unshift(activity);
        },
        registerActivity(state, { activity }){
            console.log('registering activity', activity);
            state.currBoard.activities.unshift(activity)
        },
        // setUpdate(state, { update }) {
        //     if (state.currBoard.updates) state.currBoard.updates.unshift(update);
        //     else state.currBoard['updates'] = [update];
        //     console.log('state.currBoard.updates', state.currBoard.updates);
        // },
        setFilterList(state, { filteredBoards }) {
            state.boards = filteredBoards;
        },
        toggleLike(state, { id }) {
            const updateIdx = state.currBoard.updates.findIndex((update) => update.id === id);
            const userToToggle = this.$store.getters.loggedinUser;
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
            // debugger
            context.commit({ type: 'loadBoard', board });
        },
        async saveBoard(context, { board }) {
            socketService.emit('board-updated', board);
            socketService.emit('board-list-updated');
            const newBoard = await boardService.save(board);
            context.commit({ type: 'loadBoard', board: newBoard });
            await context.dispatch({ type: 'loadBoards' }); // ?? do we need this here? consider updating the list locally
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
                boardCopy.activities = []
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
        // async setFilter(context, { filterBy }) {
        //     try {
        //         const filteredBoard = await boardService.getById(
        //             context.state.currBoard._id,
        //             filterBy
        //         );
        //         context.commit({ type: 'setFilter', filteredBoard });
        //     } catch (err) {
        //         console.log('couldnt filtered', err);
        //     }
        // },
        async saveUpdate(context, { taskId, txt }) {
            
            const currUser = JSON.parse(JSON.stringify(context.getters.loggedinUser))
            console.log(currUser);
            delete currUser.activities

            const activity = { 
                boardId: context.getters.currBoard._id,
                taskId: taskId,
                type: 'new-msg',
                createdBy: currUser,
                content: { txt },
            }
            console.log('saving msg...\n', activity);
            try {
                await context.dispatch({ type: 'addActivity', activity })
            } catch (err) {
                console.log('error registering new chat msg\n', err)
                throw err
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
        async addActivity(context, { activity }) {
            socketService.emit('task-updated', activity);
            activity = await boardService.addActivity(activity)
            context.commit({ type: 'addActivity', activity })
        },
        async toggleUpdateLike(context, { id }) {
            context.commit({ type: 'toggleLike', id });
            context.dispatch({ type: 'saveBoard', board: context.getters.currBoard });
        },
        // async logout(context) {
        //     console.log('logout');
        //     await userService.logout();
        //     context.commit({ type: 'setLoggedinUser' });
        // },
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
        // getLoggedinUser(state) {
        //     return state.loggedinUser || { _id: 'u101', fullname: 'Guest user', imgUrl: '' };
        // },
        boards(state) {
            return state.boards;
        },
        currBoard(state) {
            return state.currBoard;
        },
        currBoardFiltered(state){
            // console.log('in getter: filter board is :', state.filteredBoard);
            return state.filteredBoard
        },
        getEmptyTask(state) {
            return boardService.getEmptyTask(state.currBoard);
        },
        // getEmptyUpdate() {
        //     return boardService.getEmptyUpdate();
        // },
        getActivitiesByItem: (state) => (taskId, ActivityType) => {
            if (state.currBoard.activities) {
                const filteredActivities =  state.currBoard.activities.filter(activity => {
                    return (activity.taskId === taskId && activity.type === ActivityType)
                });
                console.log('filteredActivities:', filteredActivities);
                if(filteredActivities.length)   return filteredActivities
            }
            return []
        },
        // getUpdatesByItem: (state) => (itemId) => {
        //     if (state.currBoard.activities) {
        //         return state.currBoard.activities.filter(activity => {
        //             return (activity.itemId === itemId && activity.type === 'new-msg')
        //         });
        //     }
        //     return []
        // },
    },
};
