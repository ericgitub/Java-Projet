import React, { useState } from 'react';

function TodoItem({ todo, toggleComplete, deleteTodo, updateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Validation
    if (!editedTitle.trim()) {
      return; // Ne pas sauvegarder si le titre est vide
    }
    
    const updatedTodo = {
      ...todo,
      title: editedTitle,
      description: editedDescription
    };
    
    updateTodo(todo.id, updatedTodo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Restaurer les valeurs originales
    setEditedTitle(todo.title);
    setEditedDescription(todo.description);
    setIsEditing(false);
  };

  // Format de date lisible
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="todo-content">
          <div className="form-control">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </div>
          <div className="form-control">
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
          </div>
          <div className="button-container">
            <button onClick={handleSave}>Enregistrer</button>
            <button className="delete" onClick={handleCancel}>Annuler</button>
          </div>
        </div>
      ) : (
        <>
          <div className="todo-content">
            <div className="checkbox-container">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              <h3 className="todo-title">{todo.title}</h3>
            </div>
            {todo.description && <p className="todo-description">{todo.description}</p>}
            <small>
              Créée le {formatDate(todo.createdAt)}
              {todo.updatedAt !== todo.createdAt && 
                ` • Mise à jour le ${formatDate(todo.updatedAt)}`}
            </small>
          </div>
          <div className="todo-actions">
            <button className="edit" onClick={handleEdit}>Modifier</button>
            <button className="delete" onClick={() => deleteTodo(todo.id)}>Supprimer</button>
          </div>
        </>
      )}
    </div>
  );
}

export default TodoItem;