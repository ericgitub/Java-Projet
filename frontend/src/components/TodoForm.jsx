import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!title.trim()) {
      setFormError('Le titre est obligatoire');
      return;
    }
    
    // Créer la nouvelle tâche
    const newTodo = {
      title,
      description,
      completed: false
    };
    
    // Ajouter la tâche et réinitialiser le formulaire
    addTodo(newTodo);
    setTitle('');
    setDescription('');
    setFormError('');
  };

  return (
    <div>
      <h2>Ajouter une nouvelle tâche</h2>
      
      {formError && <div className="error">{formError}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="title">Titre*</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Que devez-vous faire ?"
          />
        </div>
        
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ajoutez des détails supplémentaires..."
          />
        </div>
        
        <button type="submit">Ajouter la tâche</button>
      </form>
    </div>
  );
}

export default TodoForm;