import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo,updateTodo } from "../features/todo/todoSlice";

function AddTodo() {
  const updatetodo = useSelector((state) => state.todos);
  console.log(updatetodo);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);

  // const addTodoHandler = (e) => {
  //   e.preventDefault();
  //   if (input !== "") {
  //     dispatch(addTodo(input));
  //     setInput("");
  //   } else {
  //     console.log("pleas Enter input");
  //   }
  // };

  const addTodoHandler = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      if (editingTodo) {
        // If editing, update the todo
        dispatch(updateTodo(editingTodo.id, input));
        setEditingTodo(null);
      } else {
        dispatch(addTodo(input));
      }
      setInput("");
    } else {
      console.log("Please enter input");
    }
  };
  const handleEdit = (todo) => {
    // When edit button is clicked, set input field to todo text and set editingTodo
    setInput(todo.text);
    setEditingTodo(todo);
  };

  return (
    <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
      <input
        type="text"
        className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        autoFocus
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        {editingTodo ? "Update Todo" : "Add Todo"}
      </button>
      {editingTodo && (
        <button
          className="text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded text-lg"
          onClick={() => setEditingTodo(null)}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default AddTodo;
