import axios from 'axios';
import { useEffect, useState } from 'react';

const App = () => {
  const [todosArray, setTodosArray] = useState([]);
  const [todos, setTodos] = useState("");
  const [isEditing, setEditing] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);

  // Fetch all todos
  const getTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5050/todos/AllTodo");
      setTodosArray(res.data.allTodos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  // Add or update todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!todos.trim()) return alert("Please enter a todo");

    try {
      const baseUrl = "http://localhost:5050/todos";
      let res;

      if (isEditing) {
        // Update existing todo
        res = await axios.put(`${baseUrl}/update/${editingTodoId}`, { name: todos });
        setEditing(false);
        setEditingTodoId(null);
      } else {
        // Add new todo
        res = await axios.post(`${baseUrl}/addTodo`, { name: todos });
      }

      if (res.status === 201 || res.status === 200) {
        alert(isEditing ? "Todo updated successfully" : "Todo added successfully");
        setTodos(""); // clear input
        getTodos(); // refresh list
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Prefill todo input for editing
  const updateTodo = (todo) => {
    setEditing(true);
    setEditingTodoId(todo._id);
    setTodos(todo.name);
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/todos/delete/${id}`);
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="flex flex-col space-y-4 w-full max-w-md">
        <div className="flex">
          <input
            type="text"
            value={todos}
            onChange={(e) => setTodos(e.target.value)}
            placeholder="Enter todo"
            className="flex-1 px-4 py-2 text-black rounded-2xl border-2 bg-white"
          />
          <button
            onClick={addTodo}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            {isEditing ? "Update" : "Add"}
          </button>
        </div>

        <div className="space-y-2">
          {todosArray.length > 0 ? (
            todosArray.map((t) => (
              <div
                key={t._id}
                className="flex items-center justify-between bg-white rounded-2xl py-2 px-4 text-black"
              >
                <div>{t.name}</div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => updateTodo(t)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(t._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No todos found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;