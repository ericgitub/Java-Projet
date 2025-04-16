# 📝 ToDo List App

Une application **ToDo List** full-stack développée avec **Java Spring Boot** (backend) et **React.js** (frontend).

---

## 📁 Structure du projet

```bash
ToDo-List-app/
├── backend/                    # Serveur Spring Boot (Java)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/todolist/
│   │   │   │   ├── TodoListApplication.java       # Point d'entrée
│   │   │   │   ├── controller/TodoController.java # Contrôleur REST
│   │   │   │   ├── model/Todo.java                # Entité Todo
│   │   │   │   ├── repository/TodoRepository.java # Interface JPA
│   │   │   │   └── service/TodoService.java       # Logique métier
│   │   │   └── resources/application.properties   # Config du backend
│   └── pom.xml                                    # Dépendances Maven
├── frontend/                   # Interface utilisateur React
│   ├── public/index.html       # Page principale
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoForm.jsx    # Formulaire d'ajout
│   │   │   ├── TodoItem.jsx    # Affichage d’une tâche
│   │   │   └── TodoList.jsx    # Liste de tâches
│   │   ├── App.jsx             # Composant principal
│   │   ├── index.js            # Point d’entrée React
│   │   └── style.css           # Styles CSS
│   └── package.json            # Dépendances React
```

---

## ⚙️ Prérequis

Assurez-vous d'avoir installé :

### 🔧 Pour le backend

- [Java JDK 17+](https://adoptium.net/en-GB/)
- [Apache Maven](https://maven.apache.org/download.cgi)  
  ➤ Vérifiez l'installation avec :  

  ```bash
  mvn -v
  ```

### 🔧 Pour le frontend

- [Node.js](https://nodejs.org/en/) (version 16 ou supérieure)
  ➤ Inclut `npm`. Vérifiez l'installation avec :  

  ```bash
  node -v
  npm -v
  ```

---

## 🚀 Lancer le projet (sous Windows)

### 📦 1. Backend - Spring Boot

Ouvrir **CMD** ou **PowerShell**, puis :

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

📍 Le backend sera accessible sur : `http://localhost:8080`

---

### 🌐 2. Frontend - React

Dans un nouveau terminal :

```bash
cd frontend
npm install
npm start
```

📍 Le frontend s'ouvrira sur : `http://localhost:3000`

---

## 🔄 Fonctionnalités

- ✅ Ajouter une tâche
- 📝 Modifier une tâche
- ❌ Supprimer une tâche
- 📋 Afficher toutes les tâches

---

## 📡 Endpoints de l'API (Spring Boot)

| Méthode | Endpoint          | Description                    |
|---------|-------------------|--------------------------------|
| GET     | `/api/todos`      | Récupérer toutes les tâches    |
| POST    | `/api/todos`      | Créer une nouvelle tâche       |
| PUT     | `/api/todos/{id}` | Mettre à jour une tâche        |
| DELETE  | `/api/todos/{id}` | Supprimer une tâche            |

---

## 🛠️ Stack technique

### Backend

- Java 17
- Spring Boot
- Spring Data JPA
- H2 (ou MySQL)
- Maven

### Frontend

- React.js
- Axios
- CSS

---

## 📝 Notes supplémentaires

- Tu peux changer la base de données (H2 en mémoire → MySQL, PostgreSQL) via le fichier :

  ```sh
  backend/src/main/resources/application.properties
  ```

---

🎉 Bon codage !
