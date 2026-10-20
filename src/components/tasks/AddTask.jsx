import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../slices/todo/todoSlice';
import { Button, Label, TextInput } from "flowbite-react";
import { PlusCircle, ClipboardList } from "lucide-react";

export function AddTask() {
  const dispatch = useDispatch();
  const taskInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = taskInputRef.current.value;
    if (task.trim() === '') {
      return;
    }
    dispatch(addTask({ task }));
    taskInputRef.current.value = '';
  };

  return (
    <div className="mx-auto max-w-md my-6 rounded-2xl bg-rose-900/20 backdrop-blur-xl p-6 shadow-2xl border border-amber-400/30">
      {/* Header with Golden Icon & Text */}
      <div className="flex items-center gap-3 mb-5 border-b pb-4 border-amber-400/20">
        <div className="rounded-xl bg-amber-400/15 p-2.5 text-amber-300 border border-amber-400/30">
          <ClipboardList className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-amber-100">New Task</h3>
          <p className="text-xs text-amber-200/70">What do you want to accomplish today?</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="Task" value="Add Your Task:" className="font-semibold text-amber-100" />
          </div>
          <TextInput
            ref={taskInputRef}
            id="Task"
            type="text"
            placeholder="e.g., Complete Redux Toolkit integration"
            required
            className="[&_input]:bg-rose-950/20 [&_input]:text-amber-100 [&_input]:border-amber-400/30 [&_input]:placeholder-amber-200/40 focus:[&_input]:border-amber-400 focus:[&_input]:ring-amber-400"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-amber-200 to-yellow-600 hover:from-amber-500 hover:to-yellow-600 text-rose-950 font-bold transition-all shadow-lg border border-amber-300/40"
        >
          <PlusCircle className="h-5 w-5 mr-1" />
          Add Task
        </Button>
      </form>
    </div>
  );
}

export default AddTask;