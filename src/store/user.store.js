import { userService } from "../services/user.service";

export const userStore = {
    strict: true,
    state: {
        user: null,
    },
    getters: {
        loggedinUser(state) { return state.user || { _id: 'u101', fullname: 'Guest', imgUrl: '' }},

        taskActivities: (state) => (taskId) => {
            return state.user.activities.filter(activity => activity.taskd === taskId)
        },
        boardActivities: (state) => (boardId) => {
            return state.user.activities.filter(activity => activity.boardId === boardId)
        },

        taskMsgCount: (state) => (taskId) => {
            const msgCount = state.taskActivities(taskId).reduce((acc, activity) => {
                return acc += (activity.type === 'new-msg') ? 1 : 0
            })
            return msgCount
        },
        boardMsgCount: (state) => (boardId) => {
            const msgCount = state.boardActivities(boardId).reduce((acc, activity) => {
                return acc += (activity.type === 'new-msg') ? 1 : 0
            })
            return msgCount
        },
        userActivityCount(state){ return state.user.activities.length },
    },
    actions: {
        async removeTaskActivities(context, { taskId }){

            if(!context.getters.loggedinUser) return

            const activity = { taskId }
            try {
                userService.removeActivities(activity)
                context.commit({type: 'removeActivities', taskId})
            } catch (err) {
                console.log('error removing activities', taskId)
                throw err
            }
        },
    },
    mutations: {
        setLoggedinUser(state, {user}) {
            state.user = JSON.parse(JSON.stringify(user))
            delete user.activities
            userService.setLoggedinUser(user)
        },
        removeTaskActivities(state, { taskId }){
            state.user.activities = state.user.activities.filter(activity => activity.taskd !== taskId)
        },
    },
}
