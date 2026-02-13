import { Fragment, useEffect, useState } from "react";
import "../style/list.css";
import { Link } from "react-router-dom";
function List() {
  const [taskData, setTaskData] = useState();
  const [selectData, setSelectData] = useState([]);
  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    const response = await fetch(
      "https://taskvault-backend-lznz.onrender.com/tasks",
      {
        credentials: "include",
      },
    );
    const data = await response.json();
    if (data.success) {
      setTaskData(data.result);
    } else {
      alert("Try after sometimes");
    }
  };

  const deleteTask = async (id) => {
    const response = await fetch(
      "https://taskvault-backend-lznz.onrender.com/delete/" + id,
      {
        method: "delete",
        credentials: "include",
      },
    );
    const data = await response.json();
    if (data.success) {
      getListData();
    } else {
      alert("Try after sometime");
    }
  };

  const selectAll = (e) => {
    if (e.target.checked) {
      const items = taskData.map((item) => item._id);
      setSelectData(items);
    } else {
      setSelectData([]);
    }
  };

  const selectSingleItem = (id) => {
    if (selectData.includes(id)) {
      const items = selectData.filter((item) => item != id);
      setSelectData([items]);
    } else {
      setSelectData([id, ...selectData]);
    }
  };

  const deleteMultiple = async () => {
    const response = await fetch(
      "https://taskvault-backend-lznz.onrender.com/delete-multiple",
      {
        method: "delete",
        body: JSON.stringify(selectData),
        credentials: "include",
        headers: {
          "Content-Type": "Application/Json",
        },
      },
    );
    const data = await response.json();
    if (data.success) {
      getListData();
    } else {
      alert("Try after sometimes");
    }
  };
  return (
    <div className="list-container">
      <h1>Todo List</h1>
      <button onClick={deleteMultiple} className="delete-item delete-multiple">
        Delete
      </button>
      <ul className="task-list">
        <li className="list-header">
          <input onChange={selectAll} type="checkbox" />
        </li>
        <li className="list-header">S.No</li>
        <li className="list-header">Title</li>
        <li className="list-header">Description</li>
        <li className="list-header">Action</li>
        {taskData &&
          taskData.map((item, index) => {
            return (
              <Fragment key={item._id}>
                <li className="list-item">
                  <input
                    onChange={() => {
                      selectSingleItem(item._id);
                    }}
                    checked={selectData.includes(item._id)}
                    type="checkbox"
                  />
                </li>
                <li className="list-item">{index + 1}</li>
                <li className="list-item">{item.title}</li>
                <li className="list-item">{item.description}</li>
                <li className="list-item">
                  <button
                    onClick={() => {
                      deleteTask(item._id);
                    }}
                    className="delete-item">
                    Delete
                  </button>
                  <Link to={"update/" + item._id} className="update-item">
                    Update
                  </Link>
                </li>
              </Fragment>
            );
          })}
      </ul>
    </div>
  );
}

export default List;
