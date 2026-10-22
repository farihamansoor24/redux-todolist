import {createSlice,nanoid} from '@reduxjs/toolkit';
const intialState = JSON.parse(localStorage.getItem('todos')) || [];
let todo = createSlice({
    name:'todos',
    initialState:intialState,
    reducers:{
        addTask(state,action){
            state.push({
                id:nanoid(),
                task:action.payload.task,
                completed:false
            })
            localStorage.setItem('todos',JSON.stringify(state));
        },
        toggleTask(state,action){
            const task = state.find(task => task.id === action.payload.id);
            if(task){
                task.completed = !task.completed;
            }
            localStorage.setItem('todos',JSON.stringify(state));
        },
        updateTask(state,action){
            const task = state.find(task => task.id === action.payload.id);
            if(task){
                task.completed = action.payload.completed;
                task.task = action.payload.task;
                localStorage.setItem('todos',JSON.stringify(state));
            }
        },
        deleteTask(state,action){
            const newState = state.filter(task => task.id !== action.payload.id);
            localStorage.setItem('todos',JSON.stringify(newState));
            return newState;

    }
}
})

export const {addTask,toggleTask,deleteTask,updateTask} = todo.actions;
export default todo.reducer;