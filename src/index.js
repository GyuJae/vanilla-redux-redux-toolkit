import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE_TODO:
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);

const deleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch({ type: DELETE_TODO, id });
};

const writeTodos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.innerText = "DELETE";
    button.addEventListener("click", deleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(button);
    ul.appendChild(li);
  });
};

store.subscribe(writeTodos);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  store.dispatch({ type: ADD_TODO, text: toDo });
};

form.addEventListener("submit", onSubmit);
