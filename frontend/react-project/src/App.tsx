import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { Home } from "./pages/home/home";
import { Wrap } from "./components/wrap";
import { Tasks } from "./pages/tasks/tasks";
import { Signup } from "./pages/registration/registration/registration";
import { Login } from "./pages/registration/login/login";
import { Task } from "./pages/task/task";
import { CreateTask } from "./pages/createTask/createTask";
import { Profile } from "./pages/profile/profile";
import { AdminRegistration } from "./pages/adminRegistration/adminRegistration";
import { UncommitedTasks } from "./pages/uncommitedTasks/uncommitedTasks";

function App() {
  return (
    <Wrap>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/registration" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/task/:id" element={<Task />} />
          <Route path="/profile" element={<Profile />} />
          {/* FOR ADMIIN */}
          <Route path="/create-task" element={<CreateTask />} />
          <Route
            path="/registration-with-role"
            element={<AdminRegistration />}
          />
          <Route path="/uncommited-tasks" element={<UncommitedTasks />} />
        </Routes>
      </BrowserRouter>
    </Wrap>
  );
}

export default App;
