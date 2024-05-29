import React, { useEffect, useState } from "react";

const Input = () => {
  const [todo, setTodo] = useState("");
  const [allTodo, setAllTodo] = useState([]);

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = () => {
    fetch("http://localhost:4000/getTodos", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => setAllTodo(data))
      .catch((err) => console.log(err));
  };

  const handleSave = () => {
    fetch("http://localhost:4000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo }),
    })
      .then((resp) => resp.json())
      .then((data) => fetchTodo())
      .catch((err) => console.log(err));
    setTodo("");
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/deleteTodo/${id}`, {
      method: "DELETE",
    })
      .then((resp) => {
        if (resp.ok) {
          fetchTodo();
        } else {
          throw new Error("not possible");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleEdit = (id, todoStatus) => {
    fetch(`http://localhost:4000/updateTodo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todoStatus }),
    }).then((resp) => {
      if (resp.ok) {
        return setAllTodo((prev) => {
          return prev.map((ele) => {
            if (ele._id === id) {
              return { ...ele, status: !ele.status };
            }
            return ele;
          });
        });
      }
    });
  };

  return (
    <>
      <div>
        <div
          style={{
            marginTop: "1em",
            display: "flex",
            justifyContent: "center",
            gap: "2em",
          }}
        >
          <input
            type="text"
            name=""
            id=""
            value={todo}
            onChange={(ev) => setTodo(ev.target.value)}
          />
          <button onClick={() => handleSave()}>Add new List</button>
        </div>
        <div
          style={{
            marginTop: "1em",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ol>
            {allTodo &&
              allTodo.map((ele) => {
                return (
                  <div
                    style={{ display: "flex", gap: "2em", marginTop: "10px" }}
                    key={ele._id}
                  >
                    <div style={{ minWidth: "200px" }}>
                      <li
                        style={{
                          textDecoration: [
                            ele.status ? "line-through" : "none",
                          ],
                        }}
                        onClick={() => handleEdit(ele._id, ele.status)}
                      >
                        {ele.name}
                      </li>
                    </div>

                    <button onClick={() => handleDelete(ele._id)}>
                      delete
                    </button>
                  </div>
                );
              })}
          </ol>
        </div>
      </div>
    </>
  );
};

export default Input;
