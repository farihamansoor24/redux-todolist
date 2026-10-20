import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Button, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { deleteTask, toggleTask, updateTask } from '../../slices/todo/todoSlice';
import { useDispatch } from "react-redux";
import { Circle, CircleCheck } from "lucide-react";
import { useRef, useState } from "react";

export function TodoList() {
  const dispatch = useDispatch();
  let todosList = useSelector((state) => state.todos);
  let taskInputRef = useRef();
  const [openModal, setOpenModal] = useState({ isOpen: false, id: null, task: "", completed: null });

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Task ID</TableHeadCell>
            <TableHeadCell>Task Name</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {todosList.map((todo) => (
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800" key={todo.id}>
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {todo.id}
              </TableCell>
              <TableCell>{todo.task}</TableCell>
              <TableCell>
                {todo.completed ? 'Completed' : 'Pending'}
                {todo.completed ? 
                  <CircleCheck className="inline-block ml-2 text-green-500 cursor-pointer" onClick={() => dispatch(toggleTask({ completed: true, id: todo.id }))} /> : 
                  <Circle className="inline-block ml-2 text-yellow-500 cursor-pointer" onClick={() => dispatch(toggleTask({ completed: false, id: todo.id }))} />
                }
              </TableCell>
              <TableCell>
                <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={(e) => { e.preventDefault(); setOpenModal({ isOpen: true, id: todo.id, task: todo.task, completed: todo.completed }); }}>
                  Edit
                </a>
                <span className="mx-2">|</span>
                <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={(e) => { e.preventDefault(); dispatch(deleteTask({ id: todo.id })); }}>
                  Delete
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal show={openModal.isOpen} size="md" popup onClose={() => setOpenModal({ isOpen: false, id: null, task: "", completed: null })} initialFocus={taskInputRef}>
        <ModalHeader />
        <ModalBody>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit Task</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="task">Task Name</Label>
              </div>
              <TextInput 
                id="task" 
                ref={taskInputRef} 
                placeholder="Enter task name" 
                value={openModal.task || ""} 
                onChange={(e) => setOpenModal({ ...openModal, task: e.target.value })}
                required 
              />
            </div>

            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              <Button onClick={() => {
                dispatch(updateTask({ completed: openModal.completed, id: openModal.id, task: openModal.task }));
                setOpenModal({ isOpen: false, id: null, task: "", completed: null });
              }}>
                Update Task
              </Button>
              <Button color="gray" onClick={() => setOpenModal({ isOpen: false, id: null, task: "", completed: null })}>
                Cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default TodoList;