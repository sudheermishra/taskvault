import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "../style/addtask.css";
function UpdateTask() {
  const [taskData, setTaskData] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getTask(id);
  }, []);

  const getTask = async (id) => {
    const response = await fetch(
      "https://taskvault-backend-lznz.onrender.com/task/" + id,
      {
        credentials: "include",
      },
    );
    const data = await response.json();
    if (data.result) {
      setTaskData(data.result);
    }
  };

  const update = async () => {
    const response = await fetch(
      "https://taskvault-backend-lznz.onrender.com/update-task",
      {
        credentials: "include",
        method: "put",
        body: JSON.stringify(taskData),
        headers: {
          "Content-Type": "Application/Json",
        },
      },
    );
    const data = await response.json();
    if (data) {
      navigate("/");
    }
  };

  return (
    <div className="container">
      <h1>Update Task</h1>
      <label htmlFor=""> Title</label>
      <input
        value={taskData?.title}
        onChange={(e) => {
          setTaskData({ ...taskData, title: e.target.value });
        }}
        type="text"
        name="title"
        placeholder="Enter Task Title"></input>
      <label htmlFor="">Description </label>
      <textarea
        value={taskData?.description}
        onChange={(e) => {
          setTaskData({ ...taskData, description: e.target.value });
        }}
        rows={4}
        name="description"
        placeholder="Enter task description"
        id=""></textarea>
      <button onClick={update} className="submit">
        Update Task
      </button>
    </div>
  );
}

export default UpdateTask;
