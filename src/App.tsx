import React, { useState } from 'react';
import './App.css';
import store, { selectTodos, addTodo, removeTodo } from './store';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { RootState } from './store'; // Import RootState for type-checking

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

type Title = {
  title: string
}

const Heading: React.FunctionComponent<{ title: string }> = ({ title }: Title) => {
  return (
    <h2 style={{
      color: 'red',
      fontSize: 20,
    }}>
      {title}
    </h2>
  );
}

const App: React.FC = () => {
  const dispatch = useDispatch();
  //When you call useSelector, it will re-run the selector function every time the Redux store state changes, ensuring that your component re-renders with the latest state.
  const todos = useSelector((state: RootState) => state.todos.todos); // Specifying RootState for type
  const [newTodo, setNewTodo] = useState<string>('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo));
      setNewTodo(''); // Clear input after adding
    }
  };

  const handleRemoveTodo = (id: number) => {
    dispatch(removeTodo(id));
  };

  return (
    <div className="App">
      <Heading title="Todo App" />
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter new todo"
      />
      <button onClick={handleAddTodo}>Add</button>

      <ul>
        {todos.map((todo: Todo) => ( // Specify Todo type here
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
const JustTheTodos = () => {
  const todos = useSelector(selectTodos);
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.title}</li>

      ))}
      {/* aman */}
    </ul>
  );
}
const AppWrapper: React.FC = () => {
  return (
    <Provider store={store}>
      <App />
      <JustTheTodos />
    </Provider>
  );
}

export default AppWrapper;
