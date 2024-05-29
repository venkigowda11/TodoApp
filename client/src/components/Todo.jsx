import React, { useState } from "react";
import "../styles/Todo.css";
import Input from "./Input";

const Todo = () => {
  return (
    <>
      <div className="todo">Todo App</div>
      <Input />
    </>
  );
};

export default Todo;
