import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, toggleComplete, deleteTodo, updateTodo }) {
  if (todos.length === 0) {
    return <div className="empty-list">Aucune tâche à afficher</div>;
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          toggleComplete={toggleComplete} 
          deleteTodo={deleteTodo} 
          updateTodo={updateTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;