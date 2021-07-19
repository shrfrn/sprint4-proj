import { utilService } from '@/services/util.service.js';
import { boardService } from '@/services/board.service.js';

export const groupStore = {
    strict: true,
    actions: {
        async updateGroupName(context, { updatedGroup }) {
            // Make a copy of the current board with the updated group in place of the older one.

            let boardCopy = JSON.parse(JSON.stringify(context.getters.currBoard));
            const groupIdx = boardCopy.groups.findIndex((group) => group.id === updatedGroup.id);
            boardCopy.groups.splice(groupIdx, 1, updatedGroup);

            // Write updated board to store

            try {
                boardCopy = await boardService.save(boardCopy);
                context.commit({ type: 'loadBoard', board: boardCopy });
            } catch (err) {
                console.log('Error in taskStore => updateTask failed\n', err);
            }
            // const updateBoard = await boardService.updateGroup(
            //     updatedGroup,
            //     context.state.currBoard
            // );
            // context.commit({ type: 'updateBoard', updateBoard });
        },
        async removeGroup(context, { group }) {
            // Make a copy of the current board and remove the group from it.

            let boardCopy = JSON.parse(JSON.stringify(context.getters.currBoard));
            const groupIdx = boardCopy.groups.findIndex((grp) => grp.id === group.id);
            boardCopy.groups.splice(groupIdx, 1);

            // Write updated board to store

            try {
                boardCopy = await boardService.save(boardCopy);
                context.commit({ type: 'loadBoard', board: boardCopy });
            } catch (err) {
                console.log('Error in taskStore => addTask failed\n', err);
            }
            // const updateBoard = await boardService.removeGroup(group, context.state.currBoard);
            // context.commit({ type: 'updateBoard', updateBoard });
        },
        async duplicateGroup(context, { duplicatedGroup }) {
            // Make a copy of the current board and add the duplicated group to it,
            // right after the original group.

            let boardCopy = JSON.parse(JSON.stringify(context.getters.currBoard));
            const groupIdx = boardCopy.groups.findIndex((group) => group.id === duplicatedGroup.id);
            duplicatedGroup.id = utilService.makeId();
            duplicatedGroup.title = `Copy of ${duplicatedGroup.title}`;
            boardCopy.groups.splice(groupIdx + 1, 0, duplicatedGroup);

            // Write updated board to store

            try {
                boardCopy = await boardService.save(boardCopy);
                context.commit({ type: 'loadBoard', board: boardCopy });
            } catch (err) {
                console.log('Error in taskStore => addTask failed\n', err);
            }
            // const updateBoard = await boardService.duplicateGroup(
            //     duplicatedGroup,
            //     context.state.currBoard
            // );
            // context.commit({ type: 'updateBoard', updateBoard });
        },
        async updateGroup(context, { group }) {
            // Make a copy of the current board with the updated group in place of the older one.

            let boardCopy = JSON.parse(JSON.stringify(context.getters.currBoard));
            const groupIdx = boardCopy.groups.findIndex((grp) => grp.id === group.id);
            boardCopy.groups.splice(groupIdx, 1, group);

            // Write updated board to store

            try {
                boardCopy = await boardService.save(boardCopy);
                context.commit({ type: 'loadBoard', board: boardCopy });
            } catch (err) {
                console.log('Error in taskStore => updateTask failed\n', err);
            }
            // const updateBoard = await boardService.updateGroup(group, context.state.currBoard);
            // context.commit({ type: 'updateBoard', updateBoard });
        },
        async addNewGroup(context) {
            // Make a copy of the current board and add a new empty group to it.

            let boardCopy = JSON.parse(JSON.stringify(context.getters.currBoard));
            const group = boardService.getEmptyGroup();
            boardCopy.groups.push(group);

            // Write updated board to store

            try {
                boardCopy = await boardService.save(boardCopy);
                context.commit({ type: 'loadBoard', board: boardCopy });
            } catch (err) {
                console.log('Error in taskStore => addTask failed\n', err);
            }
            // const updateBoard = await boardService.addNewGroup(context.state.currBoard._id);
            // console.log('updateBoard :>> ', updateBoard);
            // context.commit({ type: 'updateBoard', updateBoard });
        },

        async saveGroups(context, { updatedGroups }) {
            // This action is used in drag n' drop to update the order of groups in the board.
            // Make a copy of the current board and with the updated group list.

            let boardCopy = JSON.parse(JSON.stringify(context.getters.currBoard));
            boardCopy.groups = updatedGroups;

            // Write updated board to store

            try {
                boardCopy = await boardService.save(boardCopy);
                context.commit({ type: 'loadBoard', board: boardCopy });
            } catch (err) {
                console.log('Error in taskStore => addTask failed\n', err);
            }
            // const updateBoard = await boardService.updateGroups(
            //     updatedGroups,
            //     context.state.currBoard
            // );
            // context.commit({ type: 'updateBoard', updateBoard });
        },
    },
    getters: {
        // boards(state) {
        //     return state.boards;
        // },
        // currBoard(state) {
        //     return state.currBoard;
        // },
        // getEmptyTask(state) {
        //     return boardService.getEmptyTask(state.currBoard);
        // },
    },
};
