import { AddTask } from './components/tasks/AddTask';
import { TodoList } from './components/tasks/TodoList';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-950 via-red-950 to-neutral-950 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-extrabold text-rose-100 tracking-tight">
            React Redux Todo App
          </h1>
          <p className="text-sm text-rose-300/70 mt-1">
            Manage your daily tasks with style and efficiency
          </p>
        </header>

        <AddTask />
        <TodoList />
      </div>
    </div>
  );
}

export default App;