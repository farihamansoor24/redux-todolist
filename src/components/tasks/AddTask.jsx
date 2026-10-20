import {useRef} from 'react'
import {useDispatch} from 'react-redux'
import { addTask } from '../../slices/todo/todoSlice'
import { Button, Label, TextInput } from "flowbite-react";

export function AddTask() {
    const dispatch = useDispatch();
    let taskInputRef = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        const task = taskInputRef.current.value;
        if (task.trim() === '') {
            return;
        }
        dispatch(addTask({ task }));
        taskInputRef.current.value = '';
    }
  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="Task">Add Your Task:</Label>
        </div>
        <TextInput ref={taskInputRef} id="Task" type="text" placeholder="Enter your task" required />
      </div>
 
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default AddTask