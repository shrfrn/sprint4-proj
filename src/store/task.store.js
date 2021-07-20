import { boardService } from '@/services/board.service.js';

export const taskStore = {
    strict: true,
    actions: {
        async updateTask(context, { task, groupId }) {
            // Make a copy of the current board with the updated task in place of the older one.

            let boardCopy = JSON.parse(JSON.stringify(context.getters.currBoard));
            const groupIdx = boardCopy.groups.findIndex((group) => group.id === groupId);
            const taskIdx = boardCopy.groups[groupIdx].tasks.findIndex((tsk) => tsk.id === task.id);
            boardCopy.groups[groupIdx].tasks.splice(taskIdx, 1, task);

            // Write updated board to store

            try {
                boardCopy = await boardService.save(boardCopy);
                context.commit({ type: 'loadBoard', board: boardCopy });
            } catch (err) {
                console.log('Error in taskStore => updateTask failed\n', err);
            }
        },
        async addTask(context, { task, groupId }) {
            // Make a copy of the current board and add the new task to it.

            let boardCopy = JSON.parse(JSON.stringify(context.getters.currBoard));
            const groupIdx = boardCopy.groups.findIndex((group) => group.id === groupId);
            boardCopy.groups[groupIdx].tasks.push(task);

            // Write updated board to store

            try {
                boardCopy = await boardService.save(boardCopy);
                context.commit({ type: 'loadBoard', board: boardCopy });
            } catch (err) {
                console.log('Error in taskStore => addTask failed\n', err);
            }
        },
        async duplicateTask(context, { task, taskCopy, groupId }) {
            // Make a copy of the current board and add the duplicated task to it,
            // right after the original task.

            let boardCopy = JSON.parse(JSON.stringify(context.getters.currBoard));
            const groupIdx = boardCopy.groups.findIndex((group) => group.id === groupId);
            const taskIdx = boardCopy.groups[groupIdx].tasks.findIndex((tsk) => tsk.id === task.id);
            boardCopy.groups[groupIdx].tasks.splice(taskIdx + 1, 0, taskCopy);

            // Write updated board to store

            try {
                boardCopy = await boardService.save(boardCopy);
                context.commit({ type: 'loadBoard', board: boardCopy });
            } catch (err) {
                console.log('Error in taskStore => addTask failed\n', err);
            }
        },
        async removeTask(context, { task, groupId }) {
            // Make a copy of the current board and remove the task from it.

            let boardCopy = JSON.parse(JSON.stringify(context.getters.currBoard));
            const groupIdx = boardCopy.groups.findIndex((group) => group.id === groupId);
            const taskIdx = boardCopy.groups[groupIdx].tasks.findIndex((tsk) => tsk.id === task.id);
            boardCopy.groups[groupIdx].tasks.splice(taskIdx, 1);

            // Write updated board to store

            try {
                boardCopy = await boardService.save(boardCopy);
                context.commit({ type: 'loadBoard', board: boardCopy });
            } catch (err) {
                console.log('Error in taskStore => addTask failed\n', err);
            }
        },
        async saveTasks(context) {
            try {
                console.log(JSON.parse(JSON.stringify(context.getters.currBoard)));
                const boardCopy = await boardService.save(context.getters.currBoard);
                console.log('boardCopy :>> ', boardCopy);
                context.commit({ type: 'loadBoard', board: boardCopy });
            } catch (err) {
                console.log('Error in taskStore => addTask failed\n', err);
            }
            // This action is used in drag n' drop to update the order of tasks in the board.
            // Make a copy of the current board and with the updated tasklist.

            // let boardCopy = JSON.parse(JSON.stringify(context.getters.currBoard))
            // const groupIdx = boardCopy.groups.findIndex(group => group.id === groupId)
            // boardCopy.groups[groupIdx].tasks = saveTasks

            // Write updated board to store
        },
    },
    getters: {
        // getEmptyTask(state) {
        //     console.log('in getter\n', state.currBoard, state);
        //     return boardService.getEmptyTask(state.currBoard);
        // },
    },
};
