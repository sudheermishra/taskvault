import "./style/App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router";
import AddTask from "./components/AddTask";
import List from "./components/List";
import UpdateTask from "./components/UpdateTask";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Protected from "./components/Protected";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <List />
            </Protected>
          }
        />
        <Route
          path="/add"
          element={
            <Protected>
              <AddTask />
            </Protected>
          }
        />
        <Route path="/update/:id" element={<UpdateTask />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </>
  );
}

export default App;
