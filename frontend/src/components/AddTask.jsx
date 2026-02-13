import { useState } from "react";
import "../style/addtask.css";
import { useNavigate } from "react-router";
function AddTask() {
  const [taskData, setTaskData] = useState();
  const navigate = useNavigate();

  async function handleSubmit() {
    let result = await fetch(
      "https://taskvault-backend-lznz.onrender.com/add-task",
      {
        method: "post",
        body: JSON.stringify(taskData),
        credentials: "include",
        headers: {
          "Content-Type": "Application/Json",
        },
      },
    );
    result = await result.json();
    if (result.success) {
      navigate("/");
      console.log(result);
    } else {
      alert("try after sometimes");
    }
  }
  return (
    <div className="container">
      <h1>Add New Task</h1>
      <label htmlFor=""> Title</label>
      <input
        onChange={(e) => {
          setTaskData({ ...taskData, title: e.target.value });
        }}
        type="text"
        name="title"
        placeholder="Enter Task Title"></input>
      <label htmlFor="">Description </label>
      <textarea
        onChange={(e) => {
          setTaskData({ ...taskData, description: e.target.value });
        }}
        rows={4}
        name="description"
        placeholder="Enter task description"
        id=""></textarea>
      <button onClick={handleSubmit} className="submit">
        Add New Task
      </button>
    </div>
  );
}

export default AddTask;
