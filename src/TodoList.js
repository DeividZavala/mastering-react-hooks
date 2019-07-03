import React, { useState } from "react";
import styled from "react-emotion";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem";
import uniqueId from "lodash.uniqueid";

const Container = styled("div")`
  margin: 3em auto 0 auto;
  padding: 0 1em;
  width: 75%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  input[type="text"] {
    border-radius: ${props =>
      props.todos.length ? "0.25em 0.25em 0 0" : "0.25em"};
  }
`;
const List = styled("ul")`
  list-style: none;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-top: none;
  margin: 0;
  padding-left: 0;
`;

const TodoList = props => {

  const [newTodo, setNewTodo] = useState("");
  const [todos, updateTodos] = useState([]);

  const handleNewChange = e => {
    setNewTodo(e.target.value);
  };

  const handleNewSubmit = e => {
    e.preventDefault();
    updateTodos(prevTodos => [
          ...prevTodos,
          { id: uniqueId(), text: newTodo, completed: false }
        ]
      );
    setNewTodo("")
  };

  const handleDelete = (id) => {
    updateTodos(prevTodos => prevTodos.todos.filter(todo => todo.id !== id));
  };

  const handleCompletedToggle = (id) => {
    updateTodos(prevTodos => prevTodos.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  };

    return (
      <Container todos={todos}>
        <NewTodo
          onSubmit={handleNewSubmit}
          value={newTodo}
          onChange={handleNewChange}
        />
        {!!todos.length && (
          <List>
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onChange={handleCompletedToggle}
                onDelete={handleDelete}
              />
            ))}
          </List>
        )}
      </Container>
    );
};

export default TodoList
