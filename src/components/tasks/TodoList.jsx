import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Button, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, toggleTask, updateTask } from '../../slices/todo/todoSlice';
import { Edit3, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { useRef, useState } from "react";

export function TodoList() {
  const dispatch = useDispatch();
  let todosList = useSelector((state) => state.todos);
  let taskInputRef = useRef();
  const [openModal, setOpenModal] = useState({ isOpen: false, id: null, task: "", completed: null });

  return (
    <div className="mx-auto max-w-4xl my-6 p-6 rounded-2xl bg-rose-950/40 backdrop-blur-md shadow-2xl border border-amber-500/20">
      
      {/* Header section */}
      <div className="flex items-center justify-between mb-6 border-b pb-4 border-amber-500/20">
        <div>
          <h2 className="text-xl font-bold text-amber-100">Task Management</h2>
          <p className="text-sm text-amber-200/60">View, update, or track your pending tasks</p>
        </div>
        <span className="px-3 py-1 text-xs font-semibold bg-amber-500/10 text-amber-300 rounded-full border border-amber-500/30">
          Total Tasks: {todosList.length}
        </span>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl border border-amber-500/20 shadow-sm bg-rose-950/30">
        <Table hoverable className="bg-transparent">
          <TableHead className="bg-rose-900/40 text-amber-300 border-b border-amber-500/20">
            <TableRow className="border-amber-500/20">
              <TableHeadCell className="w-20 bg-transparent text-amber-300 font-bold">ID</TableHeadCell>
              <TableHeadCell className="bg-transparent text-amber-300 font-bold">Task Name</TableHeadCell>
              <TableHeadCell className="bg-transparent text-amber-300 font-bold">Status</TableHeadCell>
              <TableHeadCell className="text-center bg-transparent text-amber-300 font-bold">Actions</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y divide-amber-500/10">
            {todosList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-amber-200/50">
                  No tasks found. Add a new task above!
                </TableCell>
              </TableRow>
            ) : (
              todosList.map((todo) => (
                <TableRow className="bg-transparent hover:bg-rose-900/30 border-amber-500/10 transition-colors" key={todo.id}>
                  <TableCell className="whitespace-nowrap font-semibold text-amber-400">
                    #{todo.id}
                  </TableCell>
                  <TableCell className="font-medium text-amber-100">
                    {todo.task}
                  </TableCell>
                  <TableCell>
                    <span 
                      onClick={() => dispatch(toggleTask({ completed: !todo.completed, id: todo.id }))}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-all hover:opacity-80 ${
                        todo.completed 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {todo.completed ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Completed
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-3.5 w-3.5 text-amber-400" /> Pending
                        </>
                      )}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button 
                        className="p-1.5 text-amber-400 hover:bg-amber-500/20 rounded-lg transition-colors border border-transparent hover:border-amber-500/30"
                        title="Edit Task"
                        onClick={(e) => { 
                          e.preventDefault(); 
                          setOpenModal({ isOpen: true, id: todo.id, task: todo.task, completed: todo.completed }); 
                        }}
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button 
                        className="p-1.5 text-rose-400 hover:bg-rose-500/20 rounded-lg transition-colors border border-transparent hover:border-rose-500/30"
                        title="Delete Task"
                        onClick={(e) => { 
                          e.preventDefault(); 
                          dispatch(deleteTask({ id: todo.id })); 
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Modal */}
      <Modal show={openModal.isOpen} size="md" popup onClose={() => setOpenModal({ isOpen: false, id: null, task: "", completed: null })} initialFocus={taskInputRef}>
        <ModalHeader className="bg-rose-950 border-b border-amber-500/20 rounded-t-lg" />
        <ModalBody className="bg-rose-950 rounded-b-lg border-x border-b border-amber-500/20">
          <div className="space-y-6 pt-2">
            <h3 className="text-xl font-bold text-amber-100">Edit Task</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="task" value="Update Task Name" className="font-semibold text-amber-200/90" />
              </div>
              <TextInput 
                id="task" 
                ref={taskInputRef} 
                placeholder="Enter task name" 
                value={openModal.task || ""} 
                onChange={(e) => setOpenModal({ ...openModal, task: e.target.value })}
                required 
                className="[&_input]:bg-rose-900/30 [&_input]:text-amber-100 [&_input]:border-amber-500/30 [&_input]:placeholder-amber-200/30 focus:[&_input]:border-amber-400 focus:[&_input]:ring-amber-400"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button 
                color="gray" 
                className="bg-rose-900/50 text-amber-200 border-amber-500/20 hover:bg-rose-900"
                onClick={() => setOpenModal({ isOpen: false, id: null, task: "", completed: null })}
              >
                Cancel
              </Button>
              <Button 
                className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-rose-950 font-bold border border-amber-400/30"
                onClick={() => {
                  dispatch(updateTask({ completed: openModal.completed, id: openModal.id, task: openModal.task }));
                  setOpenModal({ isOpen: false, id: null, task: "", completed: null });
                }}
              >
                Update Task
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default TodoList;