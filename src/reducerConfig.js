import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './slices/todo/todoSlice'

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    
  }
})
