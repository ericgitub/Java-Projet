package com.todolist.service;

import com.todolist.model.Todo;
import com.todolist.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    @Autowired
    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    // Récupérer toutes les tâches
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    // Récupérer une tâche par son ID
    public Optional<Todo> getTodoById(Long id) {
        return todoRepository.findById(id);
    }

    // Créer une nouvelle tâche
    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    // Mettre à jour une tâche existante
    public Todo updateTodo(Long id, Todo todoDetails) {
        Optional<Todo> optionalTodo = todoRepository.findById(id);
        
        if (optionalTodo.isPresent()) {
            Todo existingTodo = optionalTodo.get();
            existingTodo.setTitle(todoDetails.getTitle());
            existingTodo.setDescription(todoDetails.getDescription());
            existingTodo.setCompleted(todoDetails.isCompleted());
            existingTodo.setUpdatedAt(LocalDateTime.now());
            
            return todoRepository.save(existingTodo);
        }
        
        return null; // Ou vous pourriez lancer une exception
    }

    // Supprimer une tâche
    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }

    // Trouver des tâches par statut (complétées ou non)
    public List<Todo> getTodosByStatus(boolean completed) {
        return todoRepository.findByCompleted(completed);
    }

    // Rechercher des tâches par mot-clé dans le titre
    public List<Todo> searchTodos(String keyword) {
        return todoRepository.findByTitleContainingIgnoreCase(keyword);
    }
}