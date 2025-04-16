import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const API_URL = 'http://localhost:8080/api/todos';

  // Charger les todos au chargement de la page
  useEffect(() => {
    fetchTodos();
  }, []);

  // Charger les todos depuis l'API
  const fetchTodos = async () => {
    setLoading(true);
    try {
      let url = API_URL;
      
      if (filter === 'completed') {
        url = `${API_URL}/status?completed=true`;
      } else if (filter === 'active') {
        url = `${API_URL}/status?completed=false`;
      }
      
      if (searchTerm.trim()) {
        url = `${API_URL}/search?keyword=${encodeURIComponent(searchTerm)}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError(`Erreur lors du chargement des tâches: ${err.message}`);
      console.error('Erreur lors du chargement des tâches:', err);
    } finally {
      setLoading(false);
    }
  };

  // Ajouter une nouvelle tâche
  const addTodo = async (todo) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
      setError(null);
    } catch (err) {
      setError(`Erreur lors de l'ajout de la tâche: ${err.message}`);
      console.error('Erreur lors de l\'ajout de la tâche:', err);
    }
  };

  // Mettre à jour une tâche
  const updateTodo = async (id, updatedTodo) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const updatedTodoFromServer = await response.json();
      setTodos(todos.map(todo => todo.id === id ? updatedTodoFromServer : todo));
      setError(null);
    } catch (err) {
      setError(`Erreur lors de la mise à jour de la tâche: ${err.message}`);
      console.error('Erreur lors de la mise à jour de la tâche:', err);
    }
  };

  // Supprimer une tâche
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      setTodos(todos.filter(todo => todo.id !== id));
      setError(null);
    } catch (err) {
      setError(`Erreur lors de la suppression de la tâche: ${err.message}`);
      console.error('Erreur lors de la suppression de la tâche:', err);
    }
  };

  // Changer le statut d'une tâche (complétée ou non)
  const toggleComplete = async (id) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (todoToUpdate) {
      const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
      await updateTodo(id, updatedTodo);
    }
  };

  // Gérer le changement de filtre
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setSearchTerm(''); // Réinitialiser la recherche lors du changement de filtre
  };

  // Gérer la recherche
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Appliquer la recherche en appuyant sur Entrée
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchTodos();
  };

  return (
    <div className="container">
      <h1 className="app-title">Todo List App</h1>
      
      {error && <div className="error">{error}</div>}
      
      <div className="todo-container">
        <TodoForm addTodo={addTodo} />
      </div>
      
      <div className="search-container">
        <form onSubmit={handleSearchSubmit}>
          <input 
            type="text" 
            placeholder="Rechercher des tâches..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </form>
      </div>
      
      <div className="status-filter">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => handleFilterChange('all')}
        >
          Toutes
        </button>
        <button 
          className={filter === 'active' ? 'active' : ''} 
          onClick={() => handleFilterChange('active')}
        >
          À faire
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''} 
          onClick={() => handleFilterChange('completed')}
        >
          Terminées
        </button>
      </div>
      
      {loading ? (
        <div className="loading">Chargement...</div>
      ) : (
        <TodoList 
          todos={todos} 
          toggleComplete={toggleComplete} 
          deleteTodo={deleteTodo} 
          updateTodo={updateTodo}
        />
      )}
    </div>
  );
}

export default App;