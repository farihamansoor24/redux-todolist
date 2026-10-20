import {createSlice,nanoid} from '@reduxjs/toolkit';
let todo = createSlice({
    name:'todos',
    initialState:[],
    reducers:{
        addTask(state,action){
            state.push({
                id:nanoid(),
                task:action.payload.task,
                completed:false
            })
        },
        toggleTask(state,action){
            const task = state.find(task => task.id === action.payload.id);
            if(task){
                task.completed = !task.completed;
            }
    },
    updateTask(state,action){
        const task = state.find(task => task.id === action.payload.id);
        if(task){
            task.completed = action.payload.completed;
            task.task = action.payload.task;
        }
    },
    deleteTask(state,action){
        return state.filter(task => task.id !== action.payload.id);

    }
}
})

export const {addTask,toggleTask,deleteTask,updateTask} = todo.actions;
export default todo.reducer;